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
import type * as alerts from "../alerts.js";
import type * as apiKeys from "../apiKeys.js";
import type * as approvals from "../approvals.js";
import type * as audit from "../audit.js";
import type * as auditLogs from "../auditLogs.js";
import type * as auth from "../auth.js";
import type * as blueprints from "../blueprints.js";
import type * as browserSessions from "../browserSessions.js";
import type * as canvases from "../canvases.js";
import type * as cronJobs from "../cronJobs.js";
import type * as custom_auth from "../custom_auth.js";
import type * as discover from "../discover.js";
import type * as http from "../http.js";
import type * as instances from "../instances.js";
import type * as invoices from "../invoices.js";
import type * as memoryFiles from "../memoryFiles.js";
import type * as nodes from "../nodes.js";
import type * as organizations from "../organizations.js";
import type * as orgs from "../orgs.js";
import type * as platform from "../platform.js";
import type * as secrets from "../secrets.js";
import type * as seed from "../seed.js";
import type * as sessions from "../sessions.js";
import type * as skills from "../skills.js";
import type * as sso from "../sso.js";
import type * as stripe from "../stripe.js";
import type * as stripe_webhooks from "../stripe_webhooks.js";
import type * as swarms from "../swarms.js";
import type * as tasks from "../tasks.js";
import type * as teams from "../teams.js";
import type * as usage from "../usage.js";
import type * as voiceSettings from "../voiceSettings.js";
import type * as webauthn from "../webauthn.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  agents: typeof agents;
  alerts: typeof alerts;
  apiKeys: typeof apiKeys;
  approvals: typeof approvals;
  audit: typeof audit;
  auditLogs: typeof auditLogs;
  auth: typeof auth;
  blueprints: typeof blueprints;
  browserSessions: typeof browserSessions;
  canvases: typeof canvases;
  cronJobs: typeof cronJobs;
  custom_auth: typeof custom_auth;
  discover: typeof discover;
  http: typeof http;
  instances: typeof instances;
  invoices: typeof invoices;
  memoryFiles: typeof memoryFiles;
  nodes: typeof nodes;
  organizations: typeof organizations;
  orgs: typeof orgs;
  platform: typeof platform;
  secrets: typeof secrets;
  seed: typeof seed;
  sessions: typeof sessions;
  skills: typeof skills;
  sso: typeof sso;
  stripe: typeof stripe;
  stripe_webhooks: typeof stripe_webhooks;
  swarms: typeof swarms;
  tasks: typeof tasks;
  teams: typeof teams;
  usage: typeof usage;
  voiceSettings: typeof voiceSettings;
  webauthn: typeof webauthn;
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
