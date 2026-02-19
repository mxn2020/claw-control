/* eslint-disable */
/**
 * Generated API types for Convex functions.
 *
 * THIS FILE IS MANUALLY MAINTAINED based on the defined Convex functions.
 * To connect to a live Convex project, run `npx convex dev` and commit the
 * generated output.
 * @module
 */

import {
  anyApi,
  type ApiFromModules,
  type FilterApi,
  type FunctionReference,
} from "convex/server";

import type * as agents from "../agents";
import type * as approvals from "../approvals";
import type * as blueprints from "../blueprints";
import type * as browserSessions from "../browserSessions";
import type * as canvases from "../canvases";
import type * as cronJobs from "../cronJobs";
import type * as discover from "../discover";
import type * as instances from "../instances";
import type * as memoryFiles from "../memoryFiles";
import type * as nodes from "../nodes";
import type * as organizations from "../organizations";
import type * as sessions from "../sessions";
import type * as swarms from "../swarms";
import type * as tasks from "../tasks";
import type * as usage from "../usage";
import type * as voiceSettings from "../voiceSettings";

/**
 * A type describing your app's public Convex API.
 */
type PublicApiFromModules = ApiFromModules<{
  agents: typeof agents;
  approvals: typeof approvals;
  blueprints: typeof blueprints;
  browserSessions: typeof browserSessions;
  canvases: typeof canvases;
  cronJobs: typeof cronJobs;
  discover: typeof discover;
  instances: typeof instances;
  memoryFiles: typeof memoryFiles;
  nodes: typeof nodes;
  organizations: typeof organizations;
  sessions: typeof sessions;
  swarms: typeof swarms;
  tasks: typeof tasks;
  usage: typeof usage;
  voiceSettings: typeof voiceSettings;
}>;

// Runtime value: uses anyApi Proxy to generate function references dynamically.
// Types are fully inferred from the module imports above.
export const api: FilterApi<
  PublicApiFromModules,
  FunctionReference<any, "public">
> = anyApi as any;

export const internal: FilterApi<
  PublicApiFromModules,
  FunctionReference<any, "internal">
> = anyApi as any;
