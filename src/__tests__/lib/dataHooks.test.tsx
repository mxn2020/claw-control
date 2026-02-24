import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { DataContext, type AppData } from '#/lib/dataContext'
import {
    useInstances,
    useAgents,
    useTasks,
    useCanvases,
    useCronJobs,
    useApprovals,
    useUsageRecords,
    useDiscoverItems,
    useBrowserSessions,
    useSessions,
    useNodes,
    useMemoryFiles,
    useVoiceSettings,
} from '#/lib/dataHooks'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const mockData: AppData = {
    instances: [
        { _id: 'i1' as any, name: 'Alpha', status: 'online' },
        { _id: 'i2' as any, name: 'Beta', status: 'offline' },
    ] as any,
    agents: [
        { _id: 'a1' as any, instanceId: 'i1', name: 'Agent A' },
        { _id: 'a2' as any, instanceId: 'i2', name: 'Agent B' },
        { _id: 'a3' as any, instanceId: 'i1', name: 'Agent C' },
    ] as any,
    tasks: [
        { _id: 't1' as any, status: 'running', userId: 'u1' },
        { _id: 't2' as any, status: 'completed', userId: 'u2' },
        { _id: 't3' as any, status: 'running', userId: 'u2' },
    ] as any,
    canvases: [
        { _id: 'c1' as any, type: 'dashboard', userId: 'u1' },
        { _id: 'c2' as any, type: 'form', userId: 'u2' },
        { _id: 'c3' as any, type: 'dashboard', userId: 'u2' },
    ] as any,
    cronJobs: [
        { _id: 'cj1' as any, enabled: true, userId: 'u1' },
        { _id: 'cj2' as any, enabled: false, userId: 'u2' },
    ] as any,
    approvals: [
        { _id: 'ap1' as any, status: 'pending', userId: 'u1' },
        { _id: 'ap2' as any, status: 'approved', userId: 'u2' },
    ] as any,
    usageRecords: [
        { _id: 'ur1' as any, userId: 'u1', agentId: 'a1', date: '2024-01-01' },
        { _id: 'ur2' as any, userId: 'u2', agentId: 'a2', date: '2024-01-02' },
    ] as any,
    discoverItems: [
        { _id: 'd1' as any, type: 'skill', category: 'ai' },
        { _id: 'd2' as any, type: 'blueprint', category: 'ops' },
        { _id: 'd3' as any, type: 'skill', category: 'ops' },
    ] as any,
    browserSessions: [
        { _id: 'bs1' as any, status: 'active', userId: 'u1' },
        { _id: 'bs2' as any, status: 'closed', userId: 'u2' },
    ] as any,
    sessions: [
        { _id: 's1' as any, status: 'active', agentId: 'a1' },
        { _id: 's2' as any, status: 'closed', agentId: 'a2' },
    ] as any,
    nodes: [
        { _id: 'n1' as any, status: 'running', userId: 'u1' },
        { _id: 'n2' as any, status: 'stopped', userId: 'u2' },
    ] as any,
    memoryFiles: [
        { _id: 'mf1' as any, userId: 'u1', agentId: 'a1' },
        { _id: 'mf2' as any, userId: 'u2', agentId: 'a2' },
    ] as any,
    voiceSettings: { userId: 'u1', voice: 'alloy' } as any,
}

function wrapper(data: AppData | null) {
    return function Wrapper({ children }: { children: ReactNode }) {
        return <DataContext.Provider value={data}>{children}</DataContext.Provider>
    }
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('dataHooks — with data', () => {
    it('useInstances returns all instances', () => {
        const { result } = renderHook(() => useInstances(), { wrapper: wrapper(mockData) })
        expect(result.current).toHaveLength(2)
    })

    // useAgents
    it('useAgents returns all agents when no filter', () => {
        const { result } = renderHook(() => useAgents(), { wrapper: wrapper(mockData) })
        expect(result.current).toHaveLength(3)
    })

    it('useAgents filters by instanceId', () => {
        const { result } = renderHook(() => useAgents('i1'), { wrapper: wrapper(mockData) })
        expect(result.current).toHaveLength(2)
        expect(result.current![0].name).toBe('Agent A')
    })

    // useTasks
    it('useTasks returns all tasks when no options', () => {
        const { result } = renderHook(() => useTasks(), { wrapper: wrapper(mockData) })
        expect(result.current).toHaveLength(3)
    })

    it('useTasks filters by status', () => {
        const { result } = renderHook(() => useTasks({ status: 'running' }), { wrapper: wrapper(mockData) })
        expect(result.current).toHaveLength(2)
    })

    it('useTasks filters by userId', () => {
        const { result } = renderHook(() => useTasks({ userId: 'u2' }), { wrapper: wrapper(mockData) })
        expect(result.current).toHaveLength(2)
    })

    // useCanvases
    it('useCanvases filters by type', () => {
        const { result } = renderHook(() => useCanvases({ type: 'dashboard' }), { wrapper: wrapper(mockData) })
        expect(result.current).toHaveLength(2)
    })

    it('useCanvases filters by userId', () => {
        const { result } = renderHook(() => useCanvases({ userId: 'u1' }), { wrapper: wrapper(mockData) })
        expect(result.current).toHaveLength(1)
    })

    // useCronJobs
    it('useCronJobs filters by enabled', () => {
        const { result } = renderHook(() => useCronJobs({ enabled: true }), { wrapper: wrapper(mockData) })
        expect(result.current).toHaveLength(1)
    })

    it('useCronJobs filters by userId', () => {
        const { result } = renderHook(() => useCronJobs({ userId: 'u2' }), { wrapper: wrapper(mockData) })
        expect(result.current).toHaveLength(1)
    })

    // useApprovals
    it('useApprovals filters by status', () => {
        const { result } = renderHook(() => useApprovals({ status: 'pending' }), { wrapper: wrapper(mockData) })
        expect(result.current).toHaveLength(1)
    })

    // useUsageRecords
    it('useUsageRecords filters by agentId', () => {
        const { result } = renderHook(() => useUsageRecords({ agentId: 'a1' }), { wrapper: wrapper(mockData) })
        expect(result.current).toHaveLength(1)
    })

    it('useUsageRecords filters by date', () => {
        const { result } = renderHook(() => useUsageRecords({ date: '2024-01-01' }), { wrapper: wrapper(mockData) })
        expect(result.current).toHaveLength(1)
    })

    // useDiscoverItems
    it('useDiscoverItems filters by type', () => {
        const { result } = renderHook(() => useDiscoverItems({ type: 'skill' }), { wrapper: wrapper(mockData) })
        expect(result.current).toHaveLength(2)
    })

    it('useDiscoverItems filters by category', () => {
        const { result } = renderHook(() => useDiscoverItems({ category: 'ops' }), { wrapper: wrapper(mockData) })
        expect(result.current).toHaveLength(2)
    })

    // useBrowserSessions
    it('useBrowserSessions filters by status', () => {
        const { result } = renderHook(() => useBrowserSessions({ status: 'active' }), { wrapper: wrapper(mockData) })
        expect(result.current).toHaveLength(1)
    })

    // useSessions
    it('useSessions filters by agentId', () => {
        const { result } = renderHook(() => useSessions({ agentId: 'a1' }), { wrapper: wrapper(mockData) })
        expect(result.current).toHaveLength(1)
    })

    // useNodes
    it('useNodes filters by status', () => {
        const { result } = renderHook(() => useNodes({ status: 'running' }), { wrapper: wrapper(mockData) })
        expect(result.current).toHaveLength(1)
    })

    // useMemoryFiles
    it('useMemoryFiles filters by userId', () => {
        const { result } = renderHook(() => useMemoryFiles({ userId: 'u1' }), { wrapper: wrapper(mockData) })
        expect(result.current).toHaveLength(1)
    })

    it('useMemoryFiles filters by agentId', () => {
        const { result } = renderHook(() => useMemoryFiles({ agentId: 'a2' }), { wrapper: wrapper(mockData) })
        expect(result.current).toHaveLength(1)
    })

    // useVoiceSettings
    it('useVoiceSettings returns settings object', () => {
        const { result } = renderHook(() => useVoiceSettings(), { wrapper: wrapper(mockData) })
        expect(result.current).toEqual({ userId: 'u1', voice: 'alloy' })
    })

    it('useVoiceSettings returns null for wrong userId', () => {
        const { result } = renderHook(() => useVoiceSettings('u999'), { wrapper: wrapper(mockData) })
        expect(result.current).toBeNull()
    })

    it('useVoiceSettings returns settings for matching userId', () => {
        const { result } = renderHook(() => useVoiceSettings('u1'), { wrapper: wrapper(mockData) })
        expect(result.current).toEqual({ userId: 'u1', voice: 'alloy' })
    })
})

describe('dataHooks — without context (null)', () => {
    it('useInstances returns undefined', () => {
        const { result } = renderHook(() => useInstances(), { wrapper: wrapper(null) })
        expect(result.current).toBeUndefined()
    })

    it('useAgents returns undefined', () => {
        const { result } = renderHook(() => useAgents(), { wrapper: wrapper(null) })
        expect(result.current).toBeUndefined()
    })

    it('useTasks returns undefined', () => {
        const { result } = renderHook(() => useTasks(), { wrapper: wrapper(null) })
        expect(result.current).toBeUndefined()
    })

    it('useCanvases returns undefined', () => {
        const { result } = renderHook(() => useCanvases(), { wrapper: wrapper(null) })
        expect(result.current).toBeUndefined()
    })

    it('useCronJobs returns undefined', () => {
        const { result } = renderHook(() => useCronJobs(), { wrapper: wrapper(null) })
        expect(result.current).toBeUndefined()
    })

    it('useApprovals returns undefined', () => {
        const { result } = renderHook(() => useApprovals(), { wrapper: wrapper(null) })
        expect(result.current).toBeUndefined()
    })

    it('useUsageRecords returns undefined', () => {
        const { result } = renderHook(() => useUsageRecords(), { wrapper: wrapper(null) })
        expect(result.current).toBeUndefined()
    })

    it('useDiscoverItems returns undefined', () => {
        const { result } = renderHook(() => useDiscoverItems(), { wrapper: wrapper(null) })
        expect(result.current).toBeUndefined()
    })

    it('useBrowserSessions returns undefined', () => {
        const { result } = renderHook(() => useBrowserSessions(), { wrapper: wrapper(null) })
        expect(result.current).toBeUndefined()
    })

    it('useSessions returns undefined', () => {
        const { result } = renderHook(() => useSessions(), { wrapper: wrapper(null) })
        expect(result.current).toBeUndefined()
    })

    it('useNodes returns undefined', () => {
        const { result } = renderHook(() => useNodes(), { wrapper: wrapper(null) })
        expect(result.current).toBeUndefined()
    })

    it('useMemoryFiles returns undefined', () => {
        const { result } = renderHook(() => useMemoryFiles(), { wrapper: wrapper(null) })
        expect(result.current).toBeUndefined()
    })

    it('useVoiceSettings returns undefined', () => {
        const { result } = renderHook(() => useVoiceSettings(), { wrapper: wrapper(null) })
        expect(result.current).toBeUndefined()
    })
})
