import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from '#/components/ui/badge'

describe('Badge', () => {
    it('renders children', () => {
        render(<Badge>Active</Badge>)
        expect(screen.getByText('Active')).toBeInTheDocument()
    })

    it('applies default variant classes', () => {
        render(<Badge>Default</Badge>)
        expect(screen.getByText('Default').className).toContain('bg-slate-700')
    })

    it('applies success variant', () => {
        render(<Badge variant="success">OK</Badge>)
        expect(screen.getByText('OK').className).toContain('text-emerald-400')
    })

    it('applies warning variant', () => {
        render(<Badge variant="warning">Warn</Badge>)
        expect(screen.getByText('Warn').className).toContain('text-amber-400')
    })

    it('applies danger variant', () => {
        render(<Badge variant="danger">Error</Badge>)
        expect(screen.getByText('Error').className).toContain('text-red-400')
    })

    it('applies info variant', () => {
        render(<Badge variant="info">Info</Badge>)
        expect(screen.getByText('Info').className).toContain('text-cyan-400')
    })

    it('applies outline variant', () => {
        render(<Badge variant="outline">Outline</Badge>)
        expect(screen.getByText('Outline').className).toContain('bg-transparent')
    })

    it('merges custom className', () => {
        render(<Badge className="extra">Custom</Badge>)
        expect(screen.getByText('Custom').className).toContain('extra')
    })

    it('renders as a span element', () => {
        render(<Badge data-testid="badge">Tag</Badge>)
        expect(screen.getByTestId('badge').tagName).toBe('SPAN')
    })
})
