import { createRouter } from "./context";
import { z } from "zod";

export const questionRouter = createRouter()
	.query("get-all", {
		async resolve({ ctx }) {
			return await ctx.prisma.pollQuestion.findMany();
		},
	})
	.query("get-by-id", {
		input: z.object({ id: z.string() }),
		async resolve({ input, ctx }) {
			return await ctx.prisma.pollQuestion.findFirst({
				where: {
					id: input.id,
				},
			});
		},
	})
	.mutation("create", {
		input: z.object({
			question: z.string().min(5).max(600),
			ownerToken: z.string().min(5).max(255),
			options: z.object({}),
		}),
		async resolve({ input, ctx }) {
			const newQuestion = await ctx.prisma.pollQuestion.create({
				data: {
					question: input.question,
					ownerToken: "dsdsds",
					options: [],
				},
			});
		},
	});
