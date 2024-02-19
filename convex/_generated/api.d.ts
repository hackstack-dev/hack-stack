/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@1.8.0.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as blocks from "../blocks.js";
import type * as categories from "../categories.js";
import type * as clerk from "../clerk.js";
import type * as http from "../http.js";
import type * as imageKit from "../imageKit.js";
import type * as likes from "../likes.js";
import type * as notifications from "../notifications.js";
import type * as stack from "../stack.js";
import type * as stats from "../stats.js";
import type * as suggestions from "../suggestions.js";
import type * as tech from "../tech.js";
import type * as templates from "../templates.js";
import type * as types from "../types.js";
import type * as users from "../users.js";
import type * as utils from "../utils.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  blocks: typeof blocks;
  categories: typeof categories;
  clerk: typeof clerk;
  http: typeof http;
  imageKit: typeof imageKit;
  likes: typeof likes;
  notifications: typeof notifications;
  stack: typeof stack;
  stats: typeof stats;
  suggestions: typeof suggestions;
  tech: typeof tech;
  templates: typeof templates;
  types: typeof types;
  users: typeof users;
  utils: typeof utils;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
