/**
 * Property 5: RichTextEditor round-trip
 * Validates: Requirements 8.6, 8.7
 *
 * For any valid HTML string, loading it into the TipTap editor and immediately
 * calling getHTML() SHALL produce a semantically equivalent HTML string
 * (content is preserved, though TipTap may normalise whitespace/structure).
 *
 * Strategy: use generateJSON (HTML → ProseMirror JSON) then generateHTML
 * (JSON → HTML) — the same parse/serialise pipeline the editor uses — without
 * needing a DOM or React component.
 */

import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { generateHTML, generateJSON } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'

// ---------------------------------------------------------------------------
// Shared extension list — mirrors RichTextEditor.tsx
// ---------------------------------------------------------------------------

const extensions = [StarterKit, Link.configure({ openOnClick: false }), Underline]

// ---------------------------------------------------------------------------
// Round-trip helper
// ---------------------------------------------------------------------------

/**
 * Parse `html` into a ProseMirror document then serialise back to HTML.
 * This is exactly what TipTap does internally when you call setContent(html)
 * followed by getHTML().
 */
function roundTrip(html: string): string {
    const json = generateJSON(html, extensions)
    return generateHTML(json, extensions)
}

// ---------------------------------------------------------------------------
// Arbitraries — constrained to HTML structures TipTap supports
// ---------------------------------------------------------------------------

/** Inline text that avoids characters that would confuse HTML parsing */
const safeText = fc.stringMatching(/^[A-Za-z0-9 ,.!?'-]{1,40}$/)

/** A single <p> paragraph */
const paragraphHtml = safeText.map(t => `<p>${t}</p>`)

/** A heading at level 1–3 */
const headingHtml = fc.tuple(fc.integer({ min: 1, max: 3 }), safeText).map(
    ([level, t]) => `<h${level}>${t}</h${level}>`
)

/** Bold / italic / underline inline marks */
const boldHtml = safeText.map(t => `<p><strong>${t}</strong></p>`)
const italicHtml = safeText.map(t => `<p><em>${t}</em></p>`)
const underlineHtml = safeText.map(t => `<p><u>${t}</u></p>`)

/** Unordered list with 1–4 items */
const bulletListHtml = fc
    .array(safeText, { minLength: 1, maxLength: 4 })
    .map(items => `<ul>${items.map(i => `<li><p>${i}</p></li>`).join('')}</ul>`)

/** Ordered list with 1–4 items */
const orderedListHtml = fc
    .array(safeText, { minLength: 1, maxLength: 4 })
    .map(items => `<ol>${items.map(i => `<li><p>${i}</p></li>`).join('')}</ol>`)

/** Blockquote */
const blockquoteHtml = safeText.map(t => `<blockquote><p>${t}</p></blockquote>`)

/** Inline code */
const inlineCodeHtml = fc
    .stringMatching(/^[A-Za-z0-9_]{1,20}$/)
    .map(t => `<p><code>${t}</code></p>`)

/** All supported block types combined */
const supportedBlockHtml = fc.oneof(
    paragraphHtml,
    headingHtml,
    boldHtml,
    italicHtml,
    underlineHtml,
    bulletListHtml,
    orderedListHtml,
    blockquoteHtml,
    inlineCodeHtml
)

/** A document made of 1–5 supported blocks */
const multiBlockHtml = fc
    .array(supportedBlockHtml, { minLength: 1, maxLength: 5 })
    .map(blocks => blocks.join(''))

// ---------------------------------------------------------------------------
// Unit / example tests
// ---------------------------------------------------------------------------

describe('RichTextEditor round-trip — unit tests', () => {
    it('empty string round-trips to an empty paragraph', () => {
        const result = roundTrip('')
        // TipTap normalises empty content to a single empty paragraph
        expect(result).toBe('<p></p>')
    })

    it('a plain paragraph is preserved', () => {
        const result = roundTrip('<p>Hello world</p>')
        expect(result).toBe('<p>Hello world</p>')
    })

    it('bold text is preserved', () => {
        const result = roundTrip('<p><strong>Bold</strong></p>')
        expect(result).toBe('<p><strong>Bold</strong></p>')
    })

    it('italic text is preserved', () => {
        const result = roundTrip('<p><em>Italic</em></p>')
        expect(result).toBe('<p><em>Italic</em></p>')
    })

    it('underline text is preserved', () => {
        const result = roundTrip('<p><u>Underline</u></p>')
        expect(result).toBe('<p><u>Underline</u></p>')
    })

    it('heading h1 is preserved', () => {
        const result = roundTrip('<h1>Title</h1>')
        expect(result).toBe('<h1>Title</h1>')
    })

    it('heading h2 is preserved', () => {
        const result = roundTrip('<h2>Subtitle</h2>')
        expect(result).toBe('<h2>Subtitle</h2>')
    })

    it('heading h3 is preserved', () => {
        const result = roundTrip('<h3>Section</h3>')
        expect(result).toBe('<h3>Section</h3>')
    })

    it('bullet list is preserved', () => {
        const result = roundTrip('<ul><li><p>Item 1</p></li><li><p>Item 2</p></li></ul>')
        expect(result).toBe('<ul><li><p>Item 1</p></li><li><p>Item 2</p></li></ul>')
    })

    it('ordered list is preserved', () => {
        const result = roundTrip('<ol><li><p>First</p></li><li><p>Second</p></li></ol>')
        expect(result).toBe('<ol><li><p>First</p></li><li><p>Second</p></li></ol>')
    })

    it('blockquote is preserved', () => {
        const result = roundTrip('<blockquote><p>Quote</p></blockquote>')
        expect(result).toBe('<blockquote><p>Quote</p></blockquote>')
    })

    it('inline code is preserved', () => {
        const result = roundTrip('<p><code>const x = 1</code></p>')
        expect(result).toBe('<p><code>const x = 1</code></p>')
    })

    it('round-trip is idempotent: applying twice gives the same result', () => {
        const html = '<p><strong>Hello</strong> <em>world</em></p>'
        const once = roundTrip(html)
        const twice = roundTrip(once)
        expect(twice).toBe(once)
    })
})

// ---------------------------------------------------------------------------
// Property-based tests
// ---------------------------------------------------------------------------

describe('Property 5: RichTextEditor round-trip', () => {
    /**
     * Idempotency: applying the round-trip twice produces the same result as
     * applying it once. This is the core semantic-equivalence property — once
     * TipTap has normalised the HTML, a second parse/serialise cycle must be
     * a no-op.
     *
     * Validates: Requirements 8.6, 8.7
     */
    it('property: round-trip is idempotent for supported HTML structures', () => {
        fc.assert(
            fc.property(multiBlockHtml, html => {
                const once = roundTrip(html)
                const twice = roundTrip(once)
                return once === twice
            }),
            { numRuns: 20 }
        )
    })

    /**
     * Content preservation: after a round-trip, the output is non-empty
     * whenever the input contained non-whitespace text.
     *
     * Validates: Requirements 8.6, 8.7
     */
    it('property: non-empty input produces non-empty output', () => {
        fc.assert(
            fc.property(
                // Use paragraphs with guaranteed non-empty text
                fc.array(safeText, { minLength: 1, maxLength: 5 }).map(
                    texts => texts.map(t => `<p>${t}</p>`).join('')
                ),
                html => {
                    const result = roundTrip(html)
                    // Result must contain at least some text content
                    const textContent = result.replace(/<[^>]+>/g, '').trim()
                    return textContent.length > 0
                }
            ),
            { numRuns: 20 }
        )
    })

    /**
     * Structural stability: the round-trip output is always valid HTML
     * (every opening tag has a matching closing tag at the top level).
     *
     * Validates: Requirements 8.6, 8.7
     */
    it('property: round-trip output has balanced top-level block tags', () => {
        fc.assert(
            fc.property(multiBlockHtml, html => {
                const result = roundTrip(html)
                // Count opening and closing tags for known block elements
                const blockTags = ['p', 'h1', 'h2', 'h3', 'ul', 'ol', 'blockquote', 'pre']
                for (const tag of blockTags) {
                    const opens = (result.match(new RegExp(`<${tag}[> ]`, 'g')) ?? []).length
                    const closes = (result.match(new RegExp(`</${tag}>`, 'g')) ?? []).length
                    if (opens !== closes) return false
                }
                return true
            }),
            { numRuns: 20 }
        )
    })

    /**
     * Mark preservation: text wrapped in a supported inline mark (<strong>,
     * <em>, <u>, <code>) survives the round-trip with the same mark.
     *
     * Validates: Requirements 8.6, 8.7
     */
    it('property: inline marks are preserved through round-trip', () => {
        const markArb = fc.record({
            tag: fc.constantFrom('strong', 'em', 'u', 'code'),
            text: fc.stringMatching(/^[A-Za-z0-9]{1,20}$/),
        })

        fc.assert(
            fc.property(markArb, ({ tag, text }) => {
                const html = `<p><${tag}>${text}</${tag}></p>`
                const result = roundTrip(html)
                // The mark tag and the text must both appear in the output
                return result.includes(`<${tag}>`) && result.includes(text)
            }),
            { numRuns: 20 }
        )
    })

    /**
     * Heading level preservation: headings at levels 1–3 keep their level
     * after a round-trip.
     *
     * Validates: Requirements 8.6, 8.7
     */
    it('property: heading levels are preserved through round-trip', () => {
        fc.assert(
            fc.property(
                fc.integer({ min: 1, max: 3 }),
                fc.stringMatching(/^[A-Za-z0-9 ]{1,30}$/),
                (level, text) => {
                    const html = `<h${level}>${text}</h${level}>`
                    const result = roundTrip(html)
                    return result.includes(`<h${level}>`) && result.includes(`</h${level}>`)
                }
            ),
            { numRuns: 20 }
        )
    })
})
