// src/server/router/context.ts
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { prisma } from "../db/client";

/**
 * Replace this with an object if you want to pass things to createContextInner
 */
//type CreateContextOptions = Record<string, never>;
type CreateContextOptions = {}

/** Use this helper for:
 * - testing, where we dont have to Mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 **/
export const createContextInner = async (
	opts: trpcNext.CreateNextContextOptions
) => {
	//console.log("Opts ", opts?.req?.cookies["poll-token"]);
	return {
		prisma,
		token: opts?.req.cookies["poll-token"],
	};
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: trpcNext.CreateNextContextOptions) => {
	const pollToken = opts.req.cookies["poll-token"];
	//console.log("outer opts", opts.req.cookies["poll-token"]);
	return await createContextInner(opts);
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
