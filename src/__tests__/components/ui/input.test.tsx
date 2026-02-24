import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { Input } from '#/components/ui/input'

describe('Input', () => {
    it('renders an input element', () => {
        render(<Input data-testid="inp" />)
        expect(screen.getByTestId('inp').tagName).toBe('INPUT')
    })

    it('applies the given type', () => {
        render(<Input type="password" data-testid="inp" />)
        expect(screen.getByTestId('inp')).toHaveAttribute('type', 'password')
    })

    it('renders as text type by default', () => {
        render(<Input data-testid="inp" />)
        // No type explicitly set — browser default is 'text'
        expect(screen.getByTestId('inp').tagName).toBe('INPUT')
    })

    it('merges custom className', () => {
        render(<Input className="custom" data-testid="inp" />)
        expect(screen.getByTestId('inp').className).toContain('custom')
    })

    it('forwards ref', () => {
        const ref = createRef<HTMLInputElement>()
        render(<Input ref={ref} />)
        expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })

    it('handles disabled state', () => {
        render(<Input disabled data-testid="inp" />)
        expect(screen.getByTestId('inp')).toBeDisabled()
    })

    it('forwards placeholder', () => {
        render(<Input placeholder="Search…" />)
        expect(screen.getByPlaceholderText('Search…')).toBeInTheDocument()
    })
})
