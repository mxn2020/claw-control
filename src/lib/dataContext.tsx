import { createContext, useContext } from 'react'
import type {
  mockInstances,
  mockAgents,
  mockTasks,
  mockCanvases,
  mockCronJobs,
  mockApprovals,
  mockUsageRecords,
  mockDiscoverItems,
  mockBrowserSessions,
  mockNodes,
  mockMemoryFiles,
  mockVoiceSettings,
} from './mockData'

// Types inferred from mock data arrays
export type MockInstance = (typeof mockInstances)[number]
export type MockAgent = (typeof mockAgents)[number]
export type MockTask = (typeof mockTasks)[number]
export type MockCanvas = (typeof mockCanvases)[number]
export type MockCronJob = (typeof mockCronJobs)[number]
export type MockApproval = (typeof mockApprovals)[number]
export type MockUsageRecord = (typeof mockUsageRecords)[number]
export type MockDiscoverItem = (typeof mockDiscoverItems)[number]
export type MockBrowserSession = (typeof mockBrowserSessions)[number]
export type MockNode = (typeof mockNodes)[number]
export type MockMemoryFile = (typeof mockMemoryFiles)[number]
export type MockVoiceSettings = typeof mockVoiceSettings

// The shape of all app data — fed by either Convex queries or mock data
export interface AppData {
  instances: MockInstance[]
  agents: MockAgent[]
  tasks: MockTask[]
  canvases: MockCanvas[]
  cronJobs: MockCronJob[]
  approvals: MockApproval[]
  usageRecords: MockUsageRecord[]
  discoverItems: MockDiscoverItem[]
  browserSessions: MockBrowserSession[]
  nodes: MockNode[]
  memoryFiles: MockMemoryFile[]
  voiceSettings: MockVoiceSettings | null
}

export const DataContext = createContext<AppData | null>(null)

export function useDataContext(): AppData | null {
  return useContext(DataContext)
}
