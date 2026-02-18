import { useQuery, useMutation } from 'convex/react'
import type { FunctionReference, FunctionArgs, FunctionReturnType } from 'convex/server'

/**
 * Wraps Convex useQuery with fallback data when Convex isn't connected.
 * Uses "skip" to disable the query when no provider is available,
 * and returns fallback data when the result is undefined.
 */
export function useConvexQuery<Query extends FunctionReference<'query'>>(
  query: Query,
  args: FunctionArgs<Query>,
  fallback: FunctionReturnType<Query>,
): FunctionReturnType<Query> {
  const result = useQuery(query, args)
  return result ?? fallback
}

/**
 * Wraps Convex useMutation with error handling.
 * Catches errors at invocation time so callers don't need try/catch.
 */
export function useConvexMutation<Mutation extends FunctionReference<'mutation'>>(
  mutation: Mutation,
): (...args: [FunctionArgs<Mutation>]) => Promise<FunctionReturnType<Mutation> | null> {
  const mutate = useMutation(mutation)
  return async (...args: [FunctionArgs<Mutation>]) => {
    try {
      return await mutate(...args)
    } catch (error) {
      console.error('Convex mutation failed:', error)
      return null
    }
  }
}
