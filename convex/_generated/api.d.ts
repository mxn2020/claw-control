/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as agents from "../agents.js";
import type * as approvals from "../approvals.js";
import type * as auditLogs from "../auditLogs.js";
import type * as auth from "../auth.js";
import type * as blueprints from "../blueprints.js";
import type * as browserSessions from "../browserSessions.js";
import type * as canvases from "../canvases.js";
import type * as cronJobs from "../cronJobs.js";
import type * as discover from "../discover.js";
import type * as instances from "../instances.js";
import type * as memoryFiles from "../memoryFiles.js";
import type * as nodes from "../nodes.js";
import type * as organizations from "../organizations.js";
import type * as platform from "../platform.js";
import type * as seed from "../seed.js";
import type * as sessions from "../sessions.js";
import type * as swarms from "../swarms.js";
import type * as tasks from "../tasks.js";
import type * as usage from "../usage.js";
import type * as voiceSettings from "../voiceSettings.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  agents: typeof agents;
  approvals: typeof approvals;
  auditLogs: typeof auditLogs;
  auth: typeof auth;
  blueprints: typeof blueprints;
  browserSessions: typeof browserSessions;
  canvases: typeof canvases;
  cronJobs: typeof cronJobs;
  discover: typeof discover;
  instances: typeof instances;
  memoryFiles: typeof memoryFiles;
  nodes: typeof nodes;
  organizations: typeof organizations;
  platform: typeof platform;
  seed: typeof seed;
  sessions: typeof sessions;
  swarms: typeof swarms;
  tasks: typeof tasks;
  usage: typeof usage;
  voiceSettings: typeof voiceSettings;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
