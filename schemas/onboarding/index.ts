import { z } from "zod";

export const OrgSchema = z.object({
	name: z.string().min(5),
	image: z.optional(z.string()),
	owner: z.optional(z.string()),
});

export const OnboardingSchema = z.object({
	name: z.string().min(5),
	image: z.optional(z.string()),
	owner: z.optional(z.string()),
});
