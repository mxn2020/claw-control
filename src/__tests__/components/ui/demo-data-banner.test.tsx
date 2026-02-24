import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DemoDataBanner } from '#/components/ui/demo-data-banner'

describe('DemoDataBanner', () => {
    it('renders default text when no feature prop', () => {
        render(<DemoDataBanner />)
        expect(screen.getByText(/this page shows sample data/i)).toBeInTheDocument()
    })

    it('renders feature-specific text', () => {
        render(<DemoDataBanner feature="Agents" />)
        expect(screen.getByText(/Agents shows sample data/)).toBeInTheDocument()
    })

    it('always shows "Preview" label', () => {
        render(<DemoDataBanner />)
        expect(screen.getByText('Preview')).toBeInTheDocument()
    })

    it('shows connect instruction text', () => {
        render(<DemoDataBanner />)
        expect(screen.getByText(/Connect a running instance to see real data/i)).toBeInTheDocument()
    })
})
