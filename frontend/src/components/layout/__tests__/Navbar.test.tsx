import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Navbar } from '../Navbar'

// Mock next/navigation
vi.mock('next/navigation', () => ({
    usePathname: () => '/',
}))

// Mock next/link to render a plain anchor
vi.mock('next/link', () => ({
    default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
        <a href={href} {...props}>{children}</a>
    ),
}))

// Mock framer-motion to render children directly (no animation delays in tests)
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe('ServicesMegaMenu positioning', () => {
    it('renders the mega-menu with left-1/2 and -translate-x-1/2 classes on hover', async () => {
        const user = userEvent.setup()
        render(<Navbar />)

        const servicesButton = screen.getByRole('button', { name: /services/i })

        // Hover over the Services button (triggers onMouseEnter on the parent <li>)
        await user.hover(servicesButton)

        // The mega-menu container should be in the DOM
        // It renders a motion.div with the positioning classes
        const megaMenu = document.querySelector('.left-1\\/2.-translate-x-1\\/2') ??
            document.querySelector('[class*="left-1/2"]')

        expect(megaMenu).not.toBeNull()
        expect(megaMenu!.className).toContain('left-1/2')
        expect(megaMenu!.className).toContain('-translate-x-1/2')
    })

    it('mega-menu is not visible before hover', () => {
        render(<Navbar />)

        // Before hover, the mega-menu content should not be in the DOM
        expect(screen.queryByText('Services across 4 specialisations')).not.toBeInTheDocument()
    })

    it('mega-menu appears after hovering the Services nav item', async () => {
        const user = userEvent.setup()
        render(<Navbar />)

        const servicesButton = screen.getByRole('button', { name: /services/i })
        await user.hover(servicesButton)

        // The footer text inside the mega-menu confirms it rendered
        expect(screen.getByText('Services across 4 specialisations')).toBeInTheDocument()
    })
})
