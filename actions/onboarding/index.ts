"use server";
import { auth, update } from "@/auth";
import { prisma } from "@/lib/db";
import { OrgSchema } from "@/schemas/onboarding";
import type { z } from "zod";

/**
 * This method creates the org for the user
 * @param {z.infer<typeof OrgSchema>} org - The new org data.
 * @returns {Promise<{error?: string, success?: string}>} The result of the password change request.
 */
export const createOrg = async (org: z.infer<typeof OrgSchema>) => {
	const session = await auth();
	const valid = await OrgSchema.safeParse(org);

	if (!valid.success) {
		return {
			error: "Dados inválidos",
		};
	}

	if (!session || !session.user || !session.user.id) {
		return {
			error: "Usuário deve estar autenticado para executar esta operação",
		};
	}
	try {
		const { name, image } = valid.data;
		//TODO: Define the place to save the image
		const org = await prisma.org.create({
			data: {
				name,
				owner: session?.user.id,
			},
		});
		await update({
			user: {
				...session.user,
				orgId: org.id,
			},
		});
		return {
			success: "Org criada com sucesso",
		};
	} catch (error) {
		return {
			error: "Não foi possível criar a org",
		};
		// if (error instanceof PrismaClientKnownRequestError) {
		// 	if (error.code === "P2002") {
		// 		return {
		// 			error: "Já existe uma conta relacionada a este e-mail.",
		// 		};
		// 	}
		// }
		// return { error };
		// throw error;
	}
};
