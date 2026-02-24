import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { ToastProvider, useToast } from '#/components/ui/toast'

// Helper component that triggers a toast
function ToastTrigger({ message, variant }: { message: string; variant?: 'success' | 'error' | 'info' }) {
    const { toast } = useToast()
    return <button onClick={() => toast(message, variant)}>Show Toast</button>
}

describe('Toast', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('useToast throws outside ToastProvider', () => {
        // Suppress React error boundary noise
        const spy = vi.spyOn(console, 'error').mockImplementation(() => { })
        expect(() => render(<ToastTrigger message="fail" />)).toThrow(
            'useToast must be used inside ToastProvider',
        )
        spy.mockRestore()
    })

    it('shows a toast message', () => {
        render(
            <ToastProvider>
                <ToastTrigger message="Hello toast" />
            </ToastProvider>,
        )
        fireEvent.click(screen.getByText('Show Toast'))
        expect(screen.getByText('Hello toast')).toBeInTheDocument()
    })

    it('auto-dismisses toast after timeout', () => {
        render(
            <ToastProvider>
                <ToastTrigger message="Temporary" />
            </ToastProvider>,
        )
        fireEvent.click(screen.getByText('Show Toast'))
        expect(screen.getByText('Temporary')).toBeInTheDocument()

        act(() => {
            vi.advanceTimersByTime(4000) // 3500ms auto-dismiss + buffer
        })
        expect(screen.queryByText('Temporary')).not.toBeInTheDocument()
    })

    it('can show multiple toasts', () => {
        function MultiToast() {
            const { toast } = useToast()
            return (
                <>
                    <button onClick={() => toast('First')}>One</button>
                    <button onClick={() => toast('Second')}>Two</button>
                </>
            )
        }

        render(
            <ToastProvider>
                <MultiToast />
            </ToastProvider>,
        )
        fireEvent.click(screen.getByText('One'))
        fireEvent.click(screen.getByText('Two'))
        expect(screen.getByText('First')).toBeInTheDocument()
        expect(screen.getByText('Second')).toBeInTheDocument()
    })
})
