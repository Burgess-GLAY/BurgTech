import NodeCache from 'node-cache';

// TTL of 600 seconds (10 minutes)
const otpCache = new NodeCache({ stdTTL: 600, checkperiod: 60 });

/**
 * Generates a 6-digit numeric OTP for the given userId,
 * stores it in cache with a 10-minute TTL, and returns the code.
 */
export function generateOtp(userId: string): string {
    const code = String(Math.floor(Math.random() * 1_000_000)).padStart(6, '0');
    otpCache.set(userId, code);
    return code;
}

/**
 * Verifies the OTP for the given userId.
 * Returns true if the code matches; deletes the entry on a successful match (single-use).
 * Returns false if the code is wrong or the entry has expired / doesn't exist.
 */
export function verifyOtp(userId: string, code: string): boolean {
    const stored = otpCache.get<string>(userId);
    if (stored === undefined) return false;

    if (stored === code) {
        otpCache.del(userId);
        return true;
    }

    return false;
}
