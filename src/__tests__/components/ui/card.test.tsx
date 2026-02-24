import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '#/components/ui/card'

describe('Card', () => {
    it('renders Card with children', () => {
        render(<Card data-testid="card">Content</Card>)
        expect(screen.getByTestId('card')).toHaveTextContent('Content')
    })

    it('Card is a div', () => {
        render(<Card data-testid="card">Hi</Card>)
        expect(screen.getByTestId('card').tagName).toBe('DIV')
    })

    it('Card merges className', () => {
        render(<Card data-testid="card" className="extra">Hi</Card>)
        expect(screen.getByTestId('card').className).toContain('extra')
    })

    it('Card forwards ref', () => {
        const ref = createRef<HTMLDivElement>()
        render(<Card ref={ref}>Hi</Card>)
        expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
})

describe('CardHeader', () => {
    it('renders with children', () => {
        render(<CardHeader data-testid="hdr">Header</CardHeader>)
        expect(screen.getByTestId('hdr')).toHaveTextContent('Header')
    })
})

describe('CardTitle', () => {
    it('renders as h3', () => {
        render(<CardTitle>Title</CardTitle>)
        expect(screen.getByText('Title').tagName).toBe('H3')
    })
})

describe('CardDescription', () => {
    it('renders as p', () => {
        render(<CardDescription>Desc</CardDescription>)
        expect(screen.getByText('Desc').tagName).toBe('P')
    })
})

describe('CardContent', () => {
    it('renders children', () => {
        render(<CardContent data-testid="content">Body</CardContent>)
        expect(screen.getByTestId('content')).toHaveTextContent('Body')
    })
})

describe('CardFooter', () => {
    it('renders children', () => {
        render(<CardFooter data-testid="footer">Foot</CardFooter>)
        expect(screen.getByTestId('footer')).toHaveTextContent('Foot')
    })
})
