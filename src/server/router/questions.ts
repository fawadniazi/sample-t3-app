import { createRouter } from "./context";
import { z } from "zod";
import { createQuestionValidator } from "../../shared/create-question-validator";

export const questionRouter = createRouter()
	.query("get-all-my-questions", {
		async resolve({ ctx }) {
			if (!ctx.token) return [];
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
			// console.log("Do we have a token here", ctx.token);
			const question = await ctx.prisma.pollQuestion.findFirst({
				where: {
					id: input.id,
				},
			});

			const myVote = await ctx.prisma.vote.findFirst({
				where: {
					questionId: input.id,
					voterToken: ctx.token,
				},
			});

			return {
				question,
				vote: myVote,
				isOwner: question?.ownerToken === ctx.token,
			};
		},
	})
	.mutation("vote-on-question", {
		input: z.object({questionId: z.string(), option:z.number().min(0).max(10)}),
		async resolve({ input, ctx }) {
			if (!ctx.token) throw new Error("Unauthorized");
			return await ctx.prisma.vote.create({
				data: {
					questionId: input.questionId,
					choice: input.option,
					voterToken: ctx.token,
					
				},
			});
			// return { newQuestion };
		},
	})
	.mutation("create", {
		input: createQuestionValidator,
		async resolve({ input, ctx }) {
			if (!ctx.token) throw new Error("Unauthorized");
			return await ctx.prisma.pollQuestion.create({
				data: {
					question: input.question,
					ownerToken: ctx.token,
					options: input.options,
				},
			});
			// return { newQuestion };
		},
	});
