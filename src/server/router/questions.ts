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
