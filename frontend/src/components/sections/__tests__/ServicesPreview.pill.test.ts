/**
 * Property-Based Tests: End2EndSection pill toggle is a true toggle
 *
 * Property 2: End2EndSection pill toggle is a true toggle
 * Validates: Requirements 2.1, 2.2, 2.3
 *
 * The toggle logic extracted from ServicesPreview:
 *   setOpenCategory(prev => prev === group.label ? null : group.label)
 *
 * Properties under test:
 *   - Clicking an open pill sets openCategory to null
 *   - Clicking a closed pill sets openCategory to that pill's label
 *   - The toggle is idempotent over two clicks (returns to original state)
 */

import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'

// The pure toggle function extracted from ServicesPreview's onClick handler
function pillToggle(currentOpenCategory: string | null, clickedLabel: string): string | null {
    return currentOpenCategory === clickedLabel ? null : clickedLabel
}

// Arbitrary for non-empty pill labels (simulating group.label values)
const pillLabelArb = fc.string({ minLength: 1, maxLength: 50 })

// Arbitrary for openCategory state: either null or a non-empty string
const openCategoryArb = fc.option(pillLabelArb, { nil: null })

describe('Property 2: End2EndSection pill toggle is a true toggle', () => {
    /**
     * Validates: Requirements 2.1, 2.2, 2.3
     *
     * Property: Clicking an open pill (openCategory === label) sets openCategory to null
     */
    it('clicking an open pill collapses it (sets openCategory to null)', () => {
        fc.assert(
            fc.property(pillLabelArb, (label) => {
                // The pill is currently open
                const result = pillToggle(label, label)
                expect(result).toBe(null)
            }),
            { numRuns: 100 }
        )
    })

    /**
     * Validates: Requirements 2.1, 2.2, 2.3
     *
     * Property: Clicking a closed pill (openCategory !== label) sets openCategory to that label
     */
    it('clicking a closed pill opens it (sets openCategory to that label)', () => {
        fc.assert(
            fc.property(
                openCategoryArb,
                pillLabelArb,
                (currentOpen, clickedLabel) => {
                    // Ensure the clicked pill is NOT currently open
                    fc.pre(currentOpen !== clickedLabel)

                    const result = pillToggle(currentOpen, clickedLabel)
                    expect(result).toBe(clickedLabel)
                }
            ),
            { numRuns: 100 }
        )
    })

    /**
     * Validates: Requirements 2.1, 2.2, 2.3
     *
     * Property: The toggle cycles between open and null for a given pill.
     * open → click → null → click → open (period-2 cycle)
     */
    it('toggle cycles: open pill closes to null, null pill opens to label', () => {
        fc.assert(
            fc.property(pillLabelArb, (label) => {
                // open → null
                const afterClose = pillToggle(label, label)
                expect(afterClose).toBe(null)
                // null → open
                const afterOpen = pillToggle(null, label)
                expect(afterOpen).toBe(label)
                // open → null again (period-2 cycle confirmed)
                const afterCloseAgain = pillToggle(afterOpen, label)
                expect(afterCloseAgain).toBe(null)
            }),
            { numRuns: 100 }
        )
    })

    /**
     * Validates: Requirements 2.2, 2.3
     *
     * Property: When openCategory is null, clicking any pill opens it (no pill is forced open)
     */
    it('when all pills are collapsed (null), clicking any pill opens exactly that pill', () => {
        fc.assert(
            fc.property(pillLabelArb, (label) => {
                const result = pillToggle(null, label)
                expect(result).toBe(label)
                expect(result).not.toBeNull()
            }),
            { numRuns: 100 }
        )
    })

    /**
     * Validates: Requirements 2.1, 2.2
     *
     * Property: At most one pill is open at any time — clicking a different pill
     * closes the previously open one and opens the new one
     */
    it('clicking a different pill switches the open pill (only one open at a time)', () => {
        fc.assert(
            fc.property(
                pillLabelArb,
                pillLabelArb,
                (openLabel, differentLabel) => {
                    fc.pre(openLabel !== differentLabel)

                    const result = pillToggle(openLabel, differentLabel)
                    // The new pill is open
                    expect(result).toBe(differentLabel)
                    // The previously open pill is now closed
                    expect(result).not.toBe(openLabel)
                }
            ),
            { numRuns: 100 }
        )
    })
})
