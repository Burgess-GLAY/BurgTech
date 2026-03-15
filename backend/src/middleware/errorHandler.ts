import { Request, Response, NextFunction } from 'express'

export class AppError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message)
    this.name = 'AppError'
  }
}

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err.name === 'AppError') return res.status(err.statusCode).json({ error: err.message })
  if (err.code === 'P2002') return res.status(409).json({ error: 'A record with this value already exists.' })
  if (err.code === 'P2025') return res.status(404).json({ error: 'Record not found.' })
  console.error('[Error]', err)
  res.status(500).json({ error: 'Internal server error' })
}
