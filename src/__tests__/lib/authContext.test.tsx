import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { useAuth, MockAuthProvider } from '#/lib/authContext'

describe('useAuth', () => {
    it('throws when used outside any AuthProvider', () => {
        const spy = vi.spyOn(console, 'error').mockImplementation(() => { })
        expect(() => renderHook(() => useAuth())).toThrow(
            'useAuth must be used inside AuthProvider or MockAuthProvider',
        )
        spy.mockRestore()
    })
})

describe('MockAuthProvider', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
        <MockAuthProvider>{children}</MockAuthProvider>
    )

    it('provides a demo user', () => {
        const { result } = renderHook(() => useAuth(), { wrapper })
        expect(result.current.user).not.toBeNull()
        expect(result.current.user!.email).toBe('demo@clawcontrol.dev')
        expect(result.current.user!.name).toBe('Demo User')
    })

    it('isLoading is false', () => {
        const { result } = renderHook(() => useAuth(), { wrapper })
        expect(result.current.isLoading).toBe(false)
    })

    it('provides a mock token', () => {
        const { result } = renderHook(() => useAuth(), { wrapper })
        expect(result.current.token).toBe('mock_token')
    })

    it('has orgId on demo user', () => {
        const { result } = renderHook(() => useAuth(), { wrapper })
        expect(result.current.user!.orgId).toBe('org_demo')
    })

    it('has organizations array', () => {
        const { result } = renderHook(() => useAuth(), { wrapper })
        expect(result.current.user!.organizations).toHaveLength(1)
        expect(result.current.user!.organizations![0].slug).toBe('demo')
    })

    it('login / register / logout are callable without error', async () => {
        const { result } = renderHook(() => useAuth(), { wrapper })
        await expect(result.current.login('a@b.com', '123')).resolves.not.toThrow()
        await expect(result.current.register('A', 'a@b.com', '123')).resolves.not.toThrow()
        await expect(result.current.logout()).resolves.not.toThrow()
    })
})
