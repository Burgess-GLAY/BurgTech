/**
 * Property 3: Modal size prop maps to correct CSS class
 * Validates: Requirements 6.1, 6.2
 *
 * For each of ['sm', 'md', 'lg'], render Modal and assert exactly the
 * corresponding max-width class is present and no other max-width class.
 *
 * SIZE_MAP: sm → max-w-sm, md → max-w-lg, lg → max-w-2xl
 */

import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import * as fc from 'fast-check'
import { Modal } from '../Modal'

// Mock framer-motion so AnimatePresence renders children immediately
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
            <div className={className} {...props}>{children}</div>
        ),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

type ModalSize = 'sm' | 'md' | 'lg'

const SIZE_MAP: Record<ModalSize, string> = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
}

// All max-width classes used by the SIZE_MAP
const ALL_MAX_W_CLASSES = Object.values(SIZE_MAP)

function renderModal(size: ModalSize) {
    const { container } = render(
        <Modal isOpen={true} onClose={() => { }} title="Test" size={size}>
            <p>content</p>
        </Modal>
    )
    return container
}

function getModalContainer(container: HTMLElement): HTMLElement {
    // The modal panel is the motion.div with the SIZE_MAP class applied
    // It has 'relative w-full glass-card rounded-3xl overflow-hidden' plus the size class
    const el = container.querySelector('[class*="max-w-"]') as HTMLElement | null
    if (!el) throw new Error('Modal container element not found')
    return el
}

describe('Property 3: Modal size prop maps to correct CSS class', () => {
    it('sm size renders max-w-sm and no other max-w class', () => {
        const container = renderModal('sm')
        const el = getModalContainer(container)
        expect(el.className).toContain('max-w-sm')
        // Must not contain the other size classes
        expect(el.className).not.toContain('max-w-lg')
        expect(el.className).not.toContain('max-w-2xl')
    })

    it('md size renders max-w-lg and no other max-w class', () => {
        const container = renderModal('md')
        const el = getModalContainer(container)
        expect(el.className).toContain('max-w-lg')
        expect(el.className).not.toContain('max-w-sm')
        expect(el.className).not.toContain('max-w-2xl')
    })

    it('lg size renders max-w-2xl and no other max-w class', () => {
        const container = renderModal('lg')
        const el = getModalContainer(container)
        expect(el.className).toContain('max-w-2xl')
        expect(el.className).not.toContain('max-w-sm')
        expect(el.className).not.toContain('max-w-lg')
    })

    it('default size (no prop) renders max-w-lg', () => {
        const { container } = render(
            <Modal isOpen={true} onClose={() => { }} title="Test">
                <p>content</p>
            </Modal>
        )
        const el = getModalContainer(container)
        expect(el.className).toContain('max-w-lg')
    })

    /**
     * Property-based test: for any size in ['sm', 'md', 'lg'],
     * the rendered modal container has exactly the corresponding max-width class
     * and none of the other max-width classes.
     *
     * Runs 100 iterations (fast-check default).
     */
    it('property: any valid size maps to exactly its max-width class', () => {
        fc.assert(
            fc.property(
                fc.constantFrom<ModalSize>('sm', 'md', 'lg'),
                (size) => {
                    const container = renderModal(size)
                    const el = getModalContainer(container)
                    const expectedClass = SIZE_MAP[size]
                    const otherClasses = ALL_MAX_W_CLASSES.filter((c) => c !== expectedClass)

                    // Must have the correct class
                    if (!el.className.includes(expectedClass)) return false

                    // Must NOT have any other max-w class from the SIZE_MAP
                    for (const other of otherClasses) {
                        if (el.className.includes(other)) return false
                    }

                    return true
                }
            ),
            { numRuns: 100 }
        )
    })
})
