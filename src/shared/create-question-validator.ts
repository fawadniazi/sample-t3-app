import { z } from "zod";

export const createQuestionValidator = z.object({
	question: z.string().min(5).max(600),
	// ownerToken: z.string().min(5).max(255),
	// options: z.object({}),
});

export type CreateQuestionInputType = z.infer<typeof createQuestionValidator>;
