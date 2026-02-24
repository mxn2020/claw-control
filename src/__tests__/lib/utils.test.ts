import { describe, it, expect } from 'vitest'
import { cn } from '#/lib/utils'

describe('cn()', () => {
    it('merges multiple class strings', () => {
        expect(cn('foo', 'bar')).toBe('foo bar')
    })

    it('handles conditional classes via clsx-style objects', () => {
        expect(cn('base', { active: true, hidden: false })).toBe('base active')
    })

    it('handles arrays of classes', () => {
        expect(cn(['a', 'b'], 'c')).toBe('a b c')
    })

    it('resolves Tailwind conflicts (twMerge)', () => {
        // Later class wins for conflicting utilities
        expect(cn('px-4', 'px-6')).toBe('px-6')
        expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500')
        expect(cn('text-sm', 'text-lg')).toBe('text-lg')
    })

    it('handles empty / falsy inputs gracefully', () => {
        expect(cn()).toBe('')
        expect(cn('', null, undefined, false)).toBe('')
    })

    it('deduplicates identical classes', () => {
        expect(cn('foo', 'foo')).toBe('foo')
    })
})
