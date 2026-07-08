'use client'

import { useState, useMemo, useEffect, ReactNode } from 'react'
import { Search, List, LayoutGrid } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FilterConfig {
    key: string
    label: string
    options: { label: string; value: string }[]
}

export interface ColumnDef {
    key: string
    label: string
    className?: string
}

export interface ListTableProps<T extends Record<string, unknown>> {
    items: T[]
    searchKeys: (keyof T)[]
    filters?: FilterConfig[]
    renderRow: (item: T) => ReactNode
    renderCard: (item: T) => ReactNode
    columns: ColumnDef[]
    storageKey: string
    emptyState: ReactNode
    actions?: ReactNode
}

export function ListTable<T extends Record<string, unknown>>({
    items,
    searchKeys,
    filters = [],
    renderRow,
    renderCard,
    columns,
    storageKey,
    emptyState,
    actions,
}: ListTableProps<T>) {
    const [search, setSearch] = useState('')
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
    const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})

    // Restore persisted view mode from localStorage
    useEffect(() => {
        if (typeof window === 'undefined') return
        const saved = localStorage.getItem(storageKey)
        if (saved === 'list' || saved === 'grid') {
            setViewMode(saved)
        }
    }, [storageKey])

    const handleViewMode = (mode: 'list' | 'grid') => {
        setViewMode(mode)
        if (typeof window !== 'undefined') {
            localStorage.setItem(storageKey, mode)
        }
    }

    const handleFilterChange = (key: string, value: string) => {
        setActiveFilters(prev => ({ ...prev, [key]: value }))
    }

    const filteredItems = useMemo(() => {
        let result = items

        // Search across searchKeys (case-insensitive)
        const trimmed = search.trim()
        if (trimmed) {
            const lower = trimmed.toLowerCase()
            result = result.filter(item =>
                searchKeys.some(key => {
                    const val = item[key]
                    return typeof val === 'string' && val.toLowerCase().includes(lower)
                })
            )
        }

        // Apply active filter values
        for (const [key, value] of Object.entries(activeFilters)) {
            if (!value) continue
            result = result.filter(item => {
                const val = item[key]
                return String(val) === value
            })
        }

        return result
    }, [items, search, searchKeys, activeFilters])

    return (
        <div className="space-y-4">
            {/* Top bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                {/* Search input */}
                <div className="relative flex-1 min-w-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-bt-cyan/50 transition-colors"
                    />
                </div>

                {/* Filter dropdowns */}
                {filters.map(filter => (
                    <select
                        key={filter.key}
                        value={activeFilters[filter.key] ?? ''}
                        onChange={e => handleFilterChange(filter.key, e.target.value)}
                        className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white/70 focus:outline-none focus:border-bt-cyan/50 transition-colors shrink-0"
                    >
                        <option value="">{filter.label}: All</option>
                        {filter.options.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                ))}

                {/* View mode toggle */}
                <div className="flex items-center gap-1 bg-slate-900 border border-white/10 rounded-xl p-1 shrink-0">
                    <button
                        onClick={() => handleViewMode('list')}
                        className={cn(
                            'p-1.5 rounded-lg transition-colors',
                            viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'
                        )}
                        aria-label="List view"
                    >
                        <List className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleViewMode('grid')}
                        className={cn(
                            'p-1.5 rounded-lg transition-colors',
                            viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'
                        )}
                        aria-label="Grid view"
                    >
                        <LayoutGrid className="w-4 h-4" />
                    </button>
                </div>

                {/* Actions slot */}
                {actions && <div className="shrink-0">{actions}</div>}
            </div>

            {/* Content */}
            {filteredItems.length === 0 ? (
                emptyState
            ) : viewMode === 'list' ? (
                /* Desktop table */
                <div className="glass-card overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 text-xs uppercase tracking-widest text-white/40">
                                {columns.map(col => (
                                    <th key={col.key} className={cn('px-6 py-4 font-medium', col.className)}>
                                        {col.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredItems.map((item, i) => (
                                <tr key={(item.id as string) ?? i} className="hover:bg-white/[0.02] transition-colors group">
                                    {renderRow(item)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                /* Card grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map((item, i) => (
                        <div key={(item.id as string) ?? i}>
                            {renderCard(item)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
