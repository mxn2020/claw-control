import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '#/components/ui/button'
import { createRef } from 'react'

describe('Button', () => {
    it('renders children', () => {
        render(<Button>Click me</Button>)
        expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
    })

    it('applies default variant classes', () => {
        render(<Button>Default</Button>)
        const btn = screen.getByRole('button')
        expect(btn.className).toContain('bg-cyan-600')
    })

    it('applies outline variant', () => {
        render(<Button variant="outline">Outline</Button>)
        const btn = screen.getByRole('button')
        expect(btn.className).toContain('bg-transparent')
    })

    it('applies ghost variant', () => {
        render(<Button variant="ghost">Ghost</Button>)
        const btn = screen.getByRole('button')
        expect(btn.className).toContain('bg-transparent')
    })

    it('applies destructive variant', () => {
        render(<Button variant="destructive">Delete</Button>)
        const btn = screen.getByRole('button')
        expect(btn.className).toContain('bg-red-600')
    })

    it('applies sm size', () => {
        render(<Button size="sm">Small</Button>)
        const btn = screen.getByRole('button')
        expect(btn.className).toContain('h-8')
    })

    it('applies lg size', () => {
        render(<Button size="lg">Large</Button>)
        const btn = screen.getByRole('button')
        expect(btn.className).toContain('h-12')
    })

    it('merges custom className', () => {
        render(<Button className="my-class">Custom</Button>)
        const btn = screen.getByRole('button')
        expect(btn.className).toContain('my-class')
    })

    it('forwards ref', () => {
        const ref = createRef<HTMLButtonElement>()
        render(<Button ref={ref}>Ref</Button>)
        expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })

    it('handles disabled state', () => {
        render(<Button disabled>Disabled</Button>)
        expect(screen.getByRole('button')).toBeDisabled()
    })

    it('forwards extra HTML attributes', () => {
        render(<Button data-testid="btn" type="submit">Submit</Button>)
        const btn = screen.getByTestId('btn')
        expect(btn).toHaveAttribute('type', 'submit')
    })
})
