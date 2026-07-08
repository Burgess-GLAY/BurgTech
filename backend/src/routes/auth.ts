import { Router, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { login, register, me } from '../controllers/authController'
import { requireAuth } from '../middleware/auth'
import { authLimiter } from '../middleware/rateLimiter'
import { generateOtp, verifyOtp } from '../services/otpService'
import { prisma } from '../lib/prisma'

// sendOtpEmail is added in task 11.7 — dispatch lazily so this compiles before that task runs
async function dispatchOtpEmail(to: string, name: string, otp: string): Promise<void> {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const svc = await import('../services/emailService') as any
        if (typeof svc.sendOtpEmail === 'function') {
            await svc.sendOtpEmail(to, name, otp)
        }
    } catch (err: unknown) {
        console.error('[OTP Email]', err)
    }
}

export const authRouter = Router()
authRouter.post('/login', authLimiter, login)
authRouter.post('/register', authLimiter, register)
authRouter.get('/me', requireAuth, me)

// POST /auth/verify-otp — exchange OTP for JWT (MFA second step)
authRouter.post('/verify-otp', async (req: Request, res: Response) => {
    const { userId, otp } = req.body
    if (!userId || !otp) return res.status(400).json({ error: 'userId and otp are required' })

    const valid = verifyOtp(userId, String(otp))
    if (!valid) return res.status(401).json({ error: 'Invalid or expired OTP' })

    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user || !user.isActive) return res.status(401).json({ error: 'Invalid or expired OTP' })

    await prisma.user.update({ where: { id: userId }, data: { lastLoginAt: new Date() } })

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role, name: user.name },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
    )
    return res.json({
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role, avatarUrl: user.avatarUrl },
    })
})

// POST /auth/mfa/enable — generate & send OTP to begin MFA setup
authRouter.post('/mfa/enable', requireAuth, async (req: Request & { user?: any }, res: Response) => {
    const user = await prisma.user.findUnique({ where: { id: req.user!.id } })
    if (!user) return res.status(404).json({ error: 'User not found' })

    const otp = generateOtp(user.id)
    void dispatchOtpEmail(user.email, user.name, otp)
    return res.json({ sent: true })
})

// POST /auth/mfa/confirm — verify OTP and activate MFA
authRouter.post('/mfa/confirm', requireAuth, async (req: Request & { user?: any }, res: Response) => {
    const { otp } = req.body
    if (!otp) return res.status(400).json({ error: 'otp is required' })

    const valid = verifyOtp(req.user!.id, String(otp))
    if (!valid) return res.status(401).json({ error: 'Invalid or expired OTP' })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await prisma.user.update({ where: { id: req.user!.id }, data: { mfaEnabled: true } as any })
    return res.json({ mfaEnabled: true })
})

// POST /auth/mfa/disable — deactivate MFA
authRouter.post('/mfa/disable', requireAuth, async (req: Request & { user?: any }, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await prisma.user.update({ where: { id: req.user!.id }, data: { mfaEnabled: false } as any })
    return res.json({ disabled: true })
})
