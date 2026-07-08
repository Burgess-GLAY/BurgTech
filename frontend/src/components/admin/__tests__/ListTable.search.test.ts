/**
 * Property 4: ListTable search filters correctly
 * Validates: Requirements 7.2
 *
 * For any list of items and any non-empty search string, the filtered result
 * SHALL contain only items where at least one searchKey field value contains
 * the search string (case-insensitive), and SHALL contain all such items.
 */

import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'

// ---------------------------------------------------------------------------
// Pure filtering logic extracted from ListTable.tsx useMemo
// ---------------------------------------------------------------------------

type Item = Record<string, unknown>

function filterBySearch<T extends Item>(
    items: T[],
    searchKeys: (keyof T)[],
    search: string
): T[] {
    const trimmed = search.trim()
    if (!trimmed) return items
    const lower = trimmed.toLowerCase()
    return items.filter(item =>
        searchKeys.some(key => {
            const val = item[key]
            return typeof val === 'string' && val.toLowerCase().includes(lower)
        })
    )
}

// ---------------------------------------------------------------------------
// Arbitraries
// ---------------------------------------------------------------------------

/** Generate a simple record with string fields a, b, c and a numeric id */
const itemArb = fc.record({
    id: fc.nat(),
    a: fc.string(),
    b: fc.string(),
    c: fc.string(),
})

type TestItem = { id: number; a: string; b: string; c: string }

const searchKeys: (keyof TestItem)[] = ['a', 'b', 'c']

// ---------------------------------------------------------------------------
// Unit / example tests
// ---------------------------------------------------------------------------

describe('filterBySearch — unit tests', () => {
    it('returns all items when search is empty', () => {
        const items = [{ id: 1, a: 'hello', b: 'world', c: 'foo' }]
        expect(filterBySearch(items, ['a', 'b', 'c'], '')).toEqual(items)
    })

    it('returns all items when search is whitespace only', () => {
        const items = [{ id: 1, a: 'hello', b: 'world', c: 'foo' }]
        expect(filterBySearch(items, ['a', 'b', 'c'], '   ')).toEqual(items)
    })

    it('filters case-insensitively', () => {
        const items = [
            { id: 1, a: 'Hello World', b: '', c: '' },
            { id: 2, a: 'goodbye', b: '', c: '' },
        ]
        const result = filterBySearch(items, ['a', 'b', 'c'], 'HELLO')
        expect(result).toHaveLength(1)
        expect(result[0].id).toBe(1)
    })

    it('matches on any searchKey field', () => {
        const items = [
            { id: 1, a: 'alpha', b: 'beta', c: 'gamma' },
            { id: 2, a: 'nope', b: 'nope', c: 'nope' },
        ]
        // match via field b
        expect(filterBySearch(items, ['a', 'b', 'c'], 'bet')).toEqual([items[0]])
        // match via field c
        expect(filterBySearch(items, ['a', 'b', 'c'], 'gam')).toEqual([items[0]])
    })

    it('returns empty array when nothing matches', () => {
        const items = [{ id: 1, a: 'hello', b: 'world', c: 'foo' }]
        expect(filterBySearch(items, ['a', 'b', 'c'], 'zzz')).toHaveLength(0)
    })

    it('does not match on keys not in searchKeys', () => {
        const items = [{ id: 1, a: 'hello', b: 'world', c: 'foo' }]
        // 'c' is not in searchKeys here
        expect(filterBySearch(items, ['a', 'b'], 'foo')).toHaveLength(0)
    })
})

// ---------------------------------------------------------------------------
// Property-based tests
// ---------------------------------------------------------------------------

describe('Property 4: ListTable search filters correctly', () => {
    /**
     * Soundness: every item in the result matches the search string on at
     * least one searchKey field (case-insensitive).
     */
    it('property: result contains only matching items (soundness)', () => {
        fc.assert(
            fc.property(
                fc.array(itemArb, { minLength: 0, maxLength: 30 }),
                fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
                (items, search) => {
                    const result = filterBySearch(items, searchKeys, search)
                    const lower = search.trim().toLowerCase()

                    return result.every(item =>
                        searchKeys.some(key => {
                            const val = item[key]
                            return typeof val === 'string' && val.toLowerCase().includes(lower)
                        })
                    )
                }
            ),
            { numRuns: 100 }
        )
    })

    /**
     * Completeness: every item that matches the search string on at least one
     * searchKey field IS included in the result.
     */
    it('property: result contains all matching items (completeness)', () => {
        fc.assert(
            fc.property(
                fc.array(itemArb, { minLength: 0, maxLength: 30 }),
                fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
                (items, search) => {
                    const result = filterBySearch(items, searchKeys, search)
                    const lower = search.trim().toLowerCase()

                    const expected = items.filter(item =>
                        searchKeys.some(key => {
                            const val = item[key]
                            return typeof val === 'string' && val.toLowerCase().includes(lower)
                        })
                    )

                    return result.length === expected.length
                }
            ),
            { numRuns: 100 }
        )
    })

    /**
     * Empty search returns all items unchanged.
     */
    it('property: empty search returns all items', () => {
        fc.assert(
            fc.property(
                fc.array(itemArb, { minLength: 0, maxLength: 30 }),
                fc.constantFrom('', '   ', '\t'),
                (items, search) => {
                    const result = filterBySearch(items, searchKeys, search)
                    return result.length === items.length
                }
            ),
            { numRuns: 100 }
        )
    })

    /**
     * Result is always a subset of the original items (no new items introduced).
     */
    it('property: result is always a subset of the original items', () => {
        fc.assert(
            fc.property(
                fc.array(itemArb, { minLength: 0, maxLength: 30 }),
                fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
                (items, search) => {
                    const result = filterBySearch(items, searchKeys, search)
                    return result.every(r => items.includes(r))
                }
            ),
            { numRuns: 100 }
        )
    })

    /**
     * Case-insensitivity: searching with uppercase and lowercase versions of
     * the same string produces the same result.
     */
    it('property: search is case-insensitive (upper vs lower yields same result)', () => {
        fc.assert(
            fc.property(
                fc.array(itemArb, { minLength: 0, maxLength: 30 }),
                fc.stringMatching(/^[a-z]{1,10}$/),
                (items, search) => {
                    const lower = filterBySearch(items, searchKeys, search.toLowerCase())
                    const upper = filterBySearch(items, searchKeys, search.toUpperCase())
                    return lower.length === upper.length
                }
            ),
            { numRuns: 100 }
        )
    })
})
