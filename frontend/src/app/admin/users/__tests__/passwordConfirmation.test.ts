/**
 * Property 9: Password confirmation validation
 * Validates: Requirements 9.5, 9.6
 *
 * For any user edit form submission where the "New Password" field is
 * non-empty, the form SHALL only submit if "New Password" equals
 * "Confirm New Password"; otherwise it SHALL display a validation error
 * and not call the API.
 */

import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'

// ---------------------------------------------------------------------------
// Pure validation logic extracted from users/page.tsx handleSubmit
// ---------------------------------------------------------------------------

interface PasswordFormData {
    password: string
    confirmPassword: string
}

/**
 * Returns true when the form should proceed to API submission,
 * false when it should be blocked (passwords don't match).
 */
function validatePasswordConfirmation(formData: PasswordFormData): boolean {
    if (formData.password && formData.password !== formData.confirmPassword) {
        return false // blocked — passwords do not match
    }
    return true // allowed — either no password set, or passwords match
}

// ---------------------------------------------------------------------------
// Unit / example tests
// ---------------------------------------------------------------------------

describe('validatePasswordConfirmation — unit tests', () => {
    it('allows submission when password is empty (no change intended)', () => {
        expect(validatePasswordConfirmation({ password: '', confirmPassword: '' })).toBe(true)
    })

    it('allows submission when password is empty and confirmPassword has a value', () => {
        // confirmPassword is irrelevant when password is empty
        expect(validatePasswordConfirmation({ password: '', confirmPassword: 'anything' })).toBe(true)
    })

    it('allows submission when password and confirmPassword match', () => {
        expect(validatePasswordConfirmation({ password: 'Secret123!', confirmPassword: 'Secret123!' })).toBe(true)
    })

    it('blocks submission when password is set but confirmPassword is empty', () => {
        expect(validatePasswordConfirmation({ password: 'Secret123!', confirmPassword: '' })).toBe(false)
    })

    it('blocks submission when password and confirmPassword differ', () => {
        expect(validatePasswordConfirmation({ password: 'abc', confirmPassword: 'xyz' })).toBe(false)
    })

    it('blocks submission when passwords differ only in case', () => {
        expect(validatePasswordConfirmation({ password: 'Password', confirmPassword: 'password' })).toBe(false)
    })

    it('blocks submission when passwords differ by a single character', () => {
        expect(validatePasswordConfirmation({ password: 'pass1', confirmPassword: 'pass2' })).toBe(false)
    })
})

// ---------------------------------------------------------------------------
// Property-based tests
// ---------------------------------------------------------------------------

describe('Property 9: Password confirmation validation', () => {
    /**
     * Core property: when password is non-empty and matches confirmPassword,
     * the form MUST be allowed to submit.
     */
    it('property: matching non-empty passwords always allow submission', () => {
        fc.assert(
            fc.property(
                fc.string({ minLength: 1 }),
                (password) => {
                    return validatePasswordConfirmation({ password, confirmPassword: password }) === true
                }
            ),
            { numRuns: 100 }
        )
    })

    /**
     * Core property: when password is non-empty and differs from
     * confirmPassword, the form MUST be blocked.
     */
    it('property: non-empty mismatched passwords always block submission', () => {
        fc.assert(
            fc.property(
                fc.string({ minLength: 1 }),
                fc.string({ minLength: 1 }),
                (password, confirmPassword) => {
                    // Only test cases where they genuinely differ
                    fc.pre(password !== confirmPassword)
                    return validatePasswordConfirmation({ password, confirmPassword }) === false
                }
            ),
            { numRuns: 100 }
        )
    })

    /**
     * Empty password always allows submission regardless of confirmPassword,
     * because no password change is intended.
     */
    it('property: empty password always allows submission (no change intended)', () => {
        fc.assert(
            fc.property(
                fc.string(), // any confirmPassword value
                (confirmPassword) => {
                    return validatePasswordConfirmation({ password: '', confirmPassword }) === true
                }
            ),
            { numRuns: 100 }
        )
    })

    /**
     * Idempotency: calling the validator twice with the same inputs always
     * returns the same result (pure function, no side effects).
     */
    it('property: validation is deterministic (same inputs → same result)', () => {
        fc.assert(
            fc.property(
                fc.string(),
                fc.string(),
                (password, confirmPassword) => {
                    const first = validatePasswordConfirmation({ password, confirmPassword })
                    const second = validatePasswordConfirmation({ password, confirmPassword })
                    return first === second
                }
            ),
            { numRuns: 100 }
        )
    })

    /**
     * The only way a non-empty password is allowed is when it exactly equals
     * confirmPassword (strict equality, not just length or prefix match).
     */
    it('property: non-empty password is allowed iff it strictly equals confirmPassword', () => {
        fc.assert(
            fc.property(
                fc.string({ minLength: 1 }),
                fc.string(),
                (password, confirmPassword) => {
                    const allowed = validatePasswordConfirmation({ password, confirmPassword })
                    const shouldBeAllowed = password === confirmPassword
                    return allowed === shouldBeAllowed
                }
            ),
            { numRuns: 100 }
        )
    })
})
