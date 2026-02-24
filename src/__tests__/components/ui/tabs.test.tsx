import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '#/components/ui/tabs'

function renderTabs(props?: { value?: string; onValueChange?: (v: string) => void }) {
    return render(
        <Tabs defaultValue="a" {...props}>
            <TabsList>
                <TabsTrigger value="a">Tab A</TabsTrigger>
                <TabsTrigger value="b">Tab B</TabsTrigger>
            </TabsList>
            <TabsContent value="a">Content A</TabsContent>
            <TabsContent value="b">Content B</TabsContent>
        </Tabs>,
    )
}

describe('Tabs', () => {
    it('renders the default tab content', () => {
        renderTabs()
        expect(screen.getByText('Content A')).toBeInTheDocument()
        expect(screen.queryByText('Content B')).not.toBeInTheDocument()
    })

    it('switches tabs on click', () => {
        renderTabs()
        fireEvent.click(screen.getByText('Tab B'))
        expect(screen.getByText('Content B')).toBeInTheDocument()
        expect(screen.queryByText('Content A')).not.toBeInTheDocument()
    })

    it('marks active trigger with aria-selected', () => {
        renderTabs()
        expect(screen.getByText('Tab A')).toHaveAttribute('aria-selected', 'true')
        expect(screen.getByText('Tab B')).toHaveAttribute('aria-selected', 'false')
    })

    it('calls onValueChange callback', () => {
        const onChange = vi.fn()
        renderTabs({ onValueChange: onChange })
        fireEvent.click(screen.getByText('Tab B'))
        expect(onChange).toHaveBeenCalledWith('b')
    })

    it('works in controlled mode', () => {
        const onChange = vi.fn()
        render(
            <Tabs defaultValue="a" value="b" onValueChange={onChange}>
                <TabsList>
                    <TabsTrigger value="a">Tab A</TabsTrigger>
                    <TabsTrigger value="b">Tab B</TabsTrigger>
                </TabsList>
                <TabsContent value="a">Content A</TabsContent>
                <TabsContent value="b">Content B</TabsContent>
            </Tabs>,
        )
        // Controlled value is "b", so Content B should be visible
        expect(screen.getByText('Content B')).toBeInTheDocument()
        expect(screen.queryByText('Content A')).not.toBeInTheDocument()
    })

    it('triggers have role="tab"', () => {
        renderTabs()
        const tabs = screen.getAllByRole('tab')
        expect(tabs).toHaveLength(2)
    })

    it('content has role="tabpanel"', () => {
        renderTabs()
        expect(screen.getByRole('tabpanel')).toBeInTheDocument()
    })
})
