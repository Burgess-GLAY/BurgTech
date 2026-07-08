import { Response, NextFunction } from 'express'
import { AuthRequest } from './auth'
import { prisma } from '../lib/prisma'

const METHOD_ACTION: Record<string, string> = {
    POST: 'CREATE',
    PUT: 'UPDATE',
    PATCH: 'UPDATE',
    DELETE: 'DELETE',
}

export function auditLog(entity: string) {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        res.on('finish', async () => {
            if (res.statusCode < 200 || res.statusCode >= 300) return

            const action = METHOD_ACTION[req.method?.toUpperCase()]
            if (!action) return

            const entityId = req.params?.id ?? req.params?.slug ?? 'unknown'
            const userId = req.user?.id

            if (!userId) return

            try {
                await prisma.auditLog.create({
                    data: { userId, action, entity, entityId },
                })
            } catch (err) {
                console.error('[auditLog] Failed to write audit log:', err)
            }
        })

        next()
    }
}
