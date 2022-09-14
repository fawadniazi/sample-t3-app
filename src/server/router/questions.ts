import { createRouter } from "./context";
import { z } from "zod";

export const questionRouter = createRouter()
	.query("get-all-my-questions", {
		async resolve({ ctx }) {
			return await ctx.prisma.pollQuestion.findMany({
				where: {
					ownerToken: {
						equals: ctx.token,
					},
				},
			});
		},
	})
	.query("get-by-id", {
		input: z.object({ id: z.string() }),
		async resolve({ input, ctx }) {
			console.log("Do we have a token here", ctx.token);
			const question = await ctx.prisma.pollQuestion.findFirst({
				where: {
					id: input.id,
				},
			});
			return { question, isOwner: question?.ownerToken === ctx.token };
		},
	})
	.mutation("create", {
		input: z.object({
			question: z.string().min(5).max(600),
			ownerToken: z.string().min(5).max(255),
			options: z.object({}),
		}),
		async resolve({ input, ctx }) {
			if (!ctx.token) return { error: "Unauthorized" };
			const newQuestion = await ctx.prisma.pollQuestion.create({
				data: {
					question: input.question,
					ownerToken: ctx.token,
					options: [],
				},
			});
		},
	});
