import { useQuery, useMutation } from 'convex/react'
import type { FunctionReference, FunctionArgs, FunctionReturnType } from 'convex/server'

/**
 * Wraps Convex useQuery with fallback data when Convex isn't connected.
 * Returns mock data if the query throws or returns undefined.
 */
export function useConvexQuery<Query extends FunctionReference<'query'>>(
  query: Query,
  args: FunctionArgs<Query>,
  fallback: FunctionReturnType<Query>,
): FunctionReturnType<Query> {
  try {
    const result = useQuery(query, args)
    return result ?? fallback
  } catch {
    return fallback
  }
}

/**
 * Wraps Convex useMutation with error handling.
 * Returns a no-op function if the mutation can't be initialized.
 */
export function useConvexMutation<Mutation extends FunctionReference<'mutation'>>(
  mutation: Mutation,
): (...args: [FunctionArgs<Mutation>]) => Promise<FunctionReturnType<Mutation> | null> {
  try {
    const mutate = useMutation(mutation)
    return async (...args: [FunctionArgs<Mutation>]) => {
      try {
        return await mutate(...args)
      } catch (error) {
        console.error('Convex mutation failed:', error)
        return null
      }
    }
  } catch {
    return async () => {
      console.warn('Convex not connected, mutation skipped')
      return null
    }
  }
}
