/**
 * Feature: admin-ui-fixes, Property 8: Audit log completeness
 *
 * For any create, update, or delete operation on a tracked entity, exactly one
 * AuditLog record SHALL be created with the correct action, entity, and entityId fields.
 *
 * Validates: Requirements 11.2
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as fc from 'fast-check'
import { EventEmitter } from 'events'

// --- Mock prisma BEFORE importing the middleware ---
// Use vi.hoisted so the variable is available when vi.mock factory runs
const { mockAuditLogCreate } = vi.hoisted(() => ({
    mockAuditLogCreate: vi.fn().mockResolvedValue({}),
}))

vi.mock('../../lib/prisma', () => ({
    prisma: {
        auditLog: {
            create: mockAuditLogCreate,
        },
    },
}))

import { auditLog } from '../audit'
import type { Response, NextFunction } from 'express'
import type { AuthRequest } from '../auth'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Build a minimal mock AuthRequest */
function makeReq(method: string, entityId: string, userId: string): AuthRequest {
    return {
        method,
        params: { id: entityId },
        user: { id: userId, email: 'admin@test.com', role: 'ADMIN', name: 'Admin' },
    } as unknown as AuthRequest
}

/** Build a mock Response that supports res.on('finish', ...) */
function makeRes(statusCode: number): Response & EventEmitter {
    const emitter = new EventEmitter()
    const res = Object.assign(emitter, { statusCode }) as unknown as Response & EventEmitter
    return res
}

const noop: NextFunction = () => { }

/** Invoke the middleware and trigger the 'finish' event, then wait for async work */
async function runMiddleware(
    method: string,
    entityId: string,
    userId: string,
    entity: string,
    statusCode: number,
): Promise<void> {
    const req = makeReq(method, entityId, userId)
    const res = makeRes(statusCode)
    const middleware = auditLog(entity)

    middleware(req, res, noop)
    res.emit('finish')

    // Allow the async callback inside 'finish' to settle
    await new Promise(resolve => setImmediate(resolve))
}

// ---------------------------------------------------------------------------
// Unit tests — specific examples
// ---------------------------------------------------------------------------

describe('auditLog middleware — unit tests', () => {
    beforeEach(() => {
        mockAuditLogCreate.mockClear()
    })

    it('POST → CREATE: creates one audit log with correct fields', async () => {
        await runMiddleware('POST', 'entity-1', 'user-1', 'BlogPost', 200)

        expect(mockAuditLogCreate).toHaveBeenCalledTimes(1)
        expect(mockAuditLogCreate).toHaveBeenCalledWith({
            data: { userId: 'user-1', action: 'CREATE', entity: 'BlogPost', entityId: 'entity-1' },
        })
    })

    it('PUT → UPDATE: creates one audit log with correct fields', async () => {
        await runMiddleware('PUT', 'entity-2', 'user-2', 'Project', 200)

        expect(mockAuditLogCreate).toHaveBeenCalledTimes(1)
        expect(mockAuditLogCreate).toHaveBeenCalledWith({
            data: { userId: 'user-2', action: 'UPDATE', entity: 'Project', entityId: 'entity-2' },
        })
    })

    it('PATCH → UPDATE: creates one audit log with correct fields', async () => {
        await runMiddleware('PATCH', 'entity-3', 'user-3', 'Service', 204)

        expect(mockAuditLogCreate).toHaveBeenCalledTimes(1)
        expect(mockAuditLogCreate).toHaveBeenCalledWith({
            data: { userId: 'user-3', action: 'UPDATE', entity: 'Service', entityId: 'entity-3' },
        })
    })

    it('DELETE → DELETE: creates one audit log with correct fields', async () => {
        await runMiddleware('DELETE', 'entity-4', 'user-4', 'TeamMember', 200)

        expect(mockAuditLogCreate).toHaveBeenCalledTimes(1)
        expect(mockAuditLogCreate).toHaveBeenCalledWith({
            data: { userId: 'user-4', action: 'DELETE', entity: 'TeamMember', entityId: 'entity-4' },
        })
    })

    it('400 response: does NOT create an audit log', async () => {
        await runMiddleware('POST', 'entity-5', 'user-5', 'BlogPost', 400)
        expect(mockAuditLogCreate).not.toHaveBeenCalled()
    })

    it('500 response: does NOT create an audit log', async () => {
        await runMiddleware('DELETE', 'entity-6', 'user-6', 'User', 500)
        expect(mockAuditLogCreate).not.toHaveBeenCalled()
    })

    it('GET method: does NOT create an audit log', async () => {
        await runMiddleware('GET', 'entity-7', 'user-7', 'BlogPost', 200)
        expect(mockAuditLogCreate).not.toHaveBeenCalled()
    })
})

// ---------------------------------------------------------------------------
// Property-based tests
// ---------------------------------------------------------------------------

const MUTATING_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE'] as const
const METHOD_ACTION: Record<string, string> = {
    POST: 'CREATE',
    PUT: 'UPDATE',
    PATCH: 'UPDATE',
    DELETE: 'DELETE',
}

/** Arbitrary for a non-empty alphanumeric string (entity names, IDs, user IDs) */
const alphanumArb = fc.stringMatching(/^[a-zA-Z0-9_-]{1,32}$/)

describe('Property 8: Audit log completeness', () => {
    beforeEach(() => {
        mockAuditLogCreate.mockClear()
    })

    it(
        'For any mutating HTTP method on a tracked entity with a 2xx response, ' +
        'exactly one AuditLog record is created with the correct action, entity, and entityId',
        async () => {
            await fc.assert(
                fc.asyncProperty(
                    fc.constantFrom(...MUTATING_METHODS),
                    alphanumArb,
                    alphanumArb,
                    alphanumArb,
                    fc.integer({ min: 200, max: 299 }),
                    async (method, entityId, userId, entity, statusCode) => {
                        mockAuditLogCreate.mockClear()

                        await runMiddleware(method, entityId, userId, entity, statusCode)

                        // Exactly one call
                        expect(mockAuditLogCreate).toHaveBeenCalledTimes(1)

                        // Correct fields
                        const [callArg] = mockAuditLogCreate.mock.calls[0]
                        expect(callArg).toEqual({
                            data: {
                                userId,
                                action: METHOD_ACTION[method],
                                entity,
                                entityId,
                            },
                        })
                    },
                ),
                { numRuns: 100 },
            )
        },
    )

    it(
        'For any non-2xx response, no AuditLog record is created regardless of method or entity',
        async () => {
            await fc.assert(
                fc.asyncProperty(
                    fc.constantFrom(...MUTATING_METHODS),
                    alphanumArb,
                    alphanumArb,
                    alphanumArb,
                    fc.oneof(
                        fc.integer({ min: 400, max: 499 }),
                        fc.integer({ min: 500, max: 599 }),
                    ),
                    async (method, entityId, userId, entity, statusCode) => {
                        mockAuditLogCreate.mockClear()

                        await runMiddleware(method, entityId, userId, entity, statusCode)

                        expect(mockAuditLogCreate).not.toHaveBeenCalled()
                    },
                ),
                { numRuns: 100 },
            )
        },
    )
})
