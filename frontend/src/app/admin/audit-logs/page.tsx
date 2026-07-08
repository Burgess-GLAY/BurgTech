'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ChevronDown } from 'lucide-react'
import { apiClient } from '@/lib/api'
import { Pagination } from '@/components/ui/Pagination'
import { cn } from '@/lib/utils'

type AuditLog = {
    id: string
    createdAt: string
    user: { name: string; email: string }
    action: 'CREATE' | 'UPDATE' | 'DELETE'
    entity: string
    entityId: string
    changes: Record<string, unknown> | null
}

type AuditLogsResponse = {
    logs: AuditLog[]
    total: number
    page: number
    pages: number
}

const ACTION_BADGE: Record<string, string> = {
    CREATE: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    UPDATE: 'bg-bt-cyan/10 text-bt-cyan border border-bt-cyan/20',
    DELETE: 'bg-red-500/10 text-red-400 border border-red-500/20',
}

const ENTITY_OPTIONS = ['All', 'BlogPost', 'Project', 'Service', 'TeamMember', 'Testimonial', 'User']
const ACTION_OPTIONS = ['All', 'CREATE', 'UPDATE', 'DELETE']

export default function AuditLogsPage() {
    const [page, setPage] = useState(1)
    const [actionFilter, setActionFilter] = useState('All')
    const [entityFilter, setEntityFilter] = useState('All')
    const [expandedId, setExpandedId] = useState<string | null>(null)

    const { data, isLoading } = useQuery<AuditLogsResponse>({
        queryKey: ['admin-audit-logs', page, actionFilter, entityFilter],
        queryFn: () => {
            const params: Record<string, string | number> = { page }
            if (actionFilter !== 'All') params.action = actionFilter
            if (entityFilter !== 'All') params.entity = entityFilter
            return apiClient.get('/admin/audit-logs', { params }).then(r => r.data)
        },
        staleTime: 60_000,
    })

    const logs = data?.logs ?? []
    const totalPages = data?.pages ?? 1

    const handleRowClick = (id: string) => {
        setExpandedId(prev => (prev === id ? null : id))
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-white">Audit Logs</h2>
                <p className="text-sm text-white/40 mt-0.5">Track all admin actions across the system</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
                <div className="relative">
                    <select
                        value={actionFilter}
                        onChange={e => { setActionFilter(e.target.value); setPage(1) }}
                        className="appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-2 pr-8 text-sm text-white/70 focus:outline-none focus:border-bt-cyan/50 transition-colors cursor-pointer"
                    >
                        {ACTION_OPTIONS.map(opt => (
                            <option key={opt} value={opt} className="bg-slate-900">{opt === 'All' ? 'All Actions' : opt}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30 pointer-events-none" />
                </div>

                <div className="relative">
                    <select
                        value={entityFilter}
                        onChange={e => { setEntityFilter(e.target.value); setPage(1) }}
                        className="appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-2 pr-8 text-sm text-white/70 focus:outline-none focus:border-bt-cyan/50 transition-colors cursor-pointer"
                    >
                        {ENTITY_OPTIONS.map(opt => (
                            <option key={opt} value={opt} className="bg-slate-900">{opt === 'All' ? 'All Entities' : opt}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30 pointer-events-none" />
                </div>
            </div>

            {/* Table */}
            <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/[0.06]">
                                <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-white/30">Date</th>
                                <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-white/30">Admin</th>
                                <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-white/30">Action</th>
                                <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-white/30">Entity</th>
                                <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-white/30">Entity ID</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.04]">
                            {isLoading
                                ? Array(8).fill(0).map((_, i) => (
                                    <tr key={i}>
                                        {Array(5).fill(0).map((__, j) => (
                                            <td key={j} className="px-6 py-4">
                                                <div className="h-3 rounded bg-white/10 animate-pulse" style={{ width: `${60 + (j * 10) % 30}%` }} />
                                            </td>
                                        ))}
                                    </tr>
                                ))
                                : logs.length === 0
                                    ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-16 text-center text-white/30 text-sm">
                                                No audit logs found
                                            </td>
                                        </tr>
                                    )
                                    : logs.map(log => (
                                        <>
                                            <tr
                                                key={log.id}
                                                onClick={() => handleRowClick(log.id)}
                                                className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                                            >
                                                <td className="px-6 py-4 text-sm text-white/50 whitespace-nowrap">
                                                    {new Date(log.createdAt).toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-white/70">{log.user?.name ?? log.user?.email}</td>
                                                <td className="px-6 py-4">
                                                    <span className={cn('px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider', ACTION_BADGE[log.action])}>
                                                        {log.action}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-white/70">{log.entity}</td>
                                                <td className="px-6 py-4 text-xs text-white/40 font-mono truncate max-w-[160px]">{log.entityId}</td>
                                            </tr>
                                            {expandedId === log.id && (
                                                <tr key={`${log.id}-detail`} className="bg-white/[0.02]">
                                                    <td colSpan={5} className="px-6 py-4">
                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Changes</p>
                                                        <pre className="text-xs text-white/60 bg-slate-900/60 rounded-xl p-4 overflow-x-auto font-mono leading-relaxed">
                                                            {log.changes
                                                                ? JSON.stringify(log.changes, null, 2)
                                                                : 'No change data recorded'}
                                                        </pre>
                                                    </td>
                                                </tr>
                                            )}
                                        </>
                                    ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    )
}
