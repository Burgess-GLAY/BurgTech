/**
 * Property-based tests for OTP Service
 * Feature: admin-ui-fixes
 *
 * Property 6: OTP single-use — Validates: Requirements 10.7
 * Property 7: OTP expiry — Validates: Requirements 10.7
 */

import { describe, it, expect, vi } from 'vitest';
import * as fc from 'fast-check';
import { generateOtp, verifyOtp } from '../otpService.js';

describe('OTP Service — Property 6: OTP single-use', () => {
    /**
     * **Property 6: OTP single-use**
     * **Validates: Requirements 10.7**
     *
     * For any generated OTP, verifying it once SHALL return true,
     * and verifying the same OTP a second time SHALL return false.
     */
    it('Property 6: verifying a generated OTP once returns true, second verify returns false', () => {
        fc.assert(
            fc.property(
                // Generate unique userId per run using a counter suffix
                fc.string({ minLength: 1, maxLength: 32 }).filter(s => s.trim().length > 0),
                fc.integer({ min: 0, max: 999999 }),
                (baseId, suffix) => {
                    // Make userId unique per iteration to avoid cache collisions
                    const userId = `p6-${baseId}-${suffix}-${Date.now()}-${Math.random()}`;

                    const code = generateOtp(userId);

                    // First verification must succeed
                    const firstResult = verifyOtp(userId, code);
                    expect(firstResult).toBe(true);

                    // Second verification with the same code must fail (single-use)
                    const secondResult = verifyOtp(userId, code);
                    expect(secondResult).toBe(false);
                }
            ),
            { numRuns: 100 }
        );
    });
});

describe('OTP Service — Property 7: OTP expiry', () => {
    /**
     * **Property 7: OTP expiry**
     * **Validates: Requirements 10.7**
     *
     * For any OTP generated more than 10 minutes ago, verifying it SHALL return false.
     *
     * Strategy: NodeCache uses Date.now() for TTL checks. We use vi.useFakeTimers()
     * to advance time past the 10-minute TTL, then verify the OTP returns false.
     * We run a smaller number of iterations since each requires a module reload.
     */
    it('Property 7: OTP generated more than 10 minutes ago returns false on verify', async () => {
        await fc.assert(
            fc.asyncProperty(
                fc.string({ minLength: 1, maxLength: 32 }).filter(s => s.trim().length > 0),
                fc.integer({ min: 0, max: 999999 }),
                async (baseId, suffix) => {
                    // Each iteration gets a fresh module instance with fake timers
                    vi.useFakeTimers();
                    vi.resetModules();

                    const { generateOtp: gen, verifyOtp: verify } = await import('../otpService.js');

                    const userId = `p7-${baseId}-${suffix}`;
                    const code = gen(userId);

                    // Advance time by 11 minutes (beyond the 10-minute TTL)
                    vi.advanceTimersByTime(11 * 60 * 1000);

                    // Verification after expiry must return false
                    const result = verify(userId, code);
                    expect(result).toBe(false);

                    vi.useRealTimers();
                }
            ),
            { numRuns: 20 }
        );
    }, 30000); // 30 second timeout for 20 iterations with module reloads
});
