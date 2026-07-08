/**
 * Property-Based Tests: Footer social links are unique
 *
 * Property 1: Footer social links are unique
 * Validates: Requirements 3.1, 3.3
 *
 * The Footer renders social link anchors from the NEW_SOCIALS array.
 * Each anchor must have a unique href — no duplicate social links.
 */

import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import * as fc from 'fast-check'
import { Footer } from '../Footer'

// Mock next/link to render a plain anchor
vi.mock('next/link', () => ({
    default: ({
        href,
        children,
        ...props
    }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
        <a href={href} {...props}>
            {children}
        </a>
    ),
}))

// Mock apiClient so the newsletter form doesn't make real HTTP calls
vi.mock('@/lib/api', () => ({
    apiClient: {
        post: vi.fn().mockResolvedValue({}),
    },
}))

/**
 * Collect all href values from social link anchors rendered by the Footer.
 * Social links are external (target="_blank") anchors with an aria-label.
 */
function getSocialHrefs(): string[] {
    const { container } = render(<Footer />)
    const anchors = container.querySelectorAll<HTMLAnchorElement>(
        'a[target="_blank"][aria-label]'
    )
    return Array.from(anchors).map((a) => a.getAttribute('href') ?? '')
}

describe('Property 1: Footer social links are unique', () => {
    /**
     * Validates: Requirements 3.1, 3.3
     *
     * Property: Every href in the rendered social link row is unique —
     * no two anchors share the same href value.
     */
    it('all social link hrefs are unique (no duplicates)', () => {
        fc.assert(
            // We run the same render multiple times to confirm the property
            // holds across every execution (deterministic component).
            fc.property(fc.constant(null), () => {
                const hrefs = getSocialHrefs()

                // Must have at least one social link
                expect(hrefs.length).toBeGreaterThan(0)

                const unique = new Set(hrefs)
                expect(unique.size).toBe(hrefs.length)
            }),
            { numRuns: 10 }
        )
    })

    /**
     * Validates: Requirements 3.1, 3.3
     *
     * Property: The number of rendered social links equals the number of
     * unique hrefs — confirming the set contains no duplicates.
     */
    it('count of rendered social links equals count of unique hrefs', () => {
        fc.assert(
            fc.property(fc.constant(null), () => {
                const hrefs = getSocialHrefs()
                const uniqueHrefs = Array.from(new Set(hrefs))

                expect(hrefs.length).toBe(uniqueHrefs.length)
            }),
            { numRuns: 10 }
        )
    })

    /**
     * Validates: Requirements 3.3
     *
     * Property: The Footer renders exactly the expected set of social platforms
     * (Facebook, Instagram, LinkedIn, Twitter/X, YouTube, GitHub, WhatsApp) —
     * one link per platform, no extras, no missing.
     */
    it('renders exactly one link per expected social platform', () => {
        const EXPECTED_LABELS = [
            'Facebook',
            'Instagram',
            'LinkedIn',
            'Twitter / X',
            'YouTube',
            'GitHub',
            'WhatsApp',
        ]

        fc.assert(
            fc.property(fc.constant(null), () => {
                const { container } = render(<Footer />)
                const anchors = container.querySelectorAll<HTMLAnchorElement>(
                    'a[target="_blank"][aria-label]'
                )
                const labels = Array.from(anchors).map(
                    (a) => a.getAttribute('aria-label') ?? ''
                )

                // Each expected label appears exactly once
                for (const expected of EXPECTED_LABELS) {
                    const count = labels.filter((l) => l === expected).length
                    expect(count).toBe(1)
                }

                // No unexpected extra links
                expect(labels.length).toBe(EXPECTED_LABELS.length)
            }),
            { numRuns: 10 }
        )
    })
})
