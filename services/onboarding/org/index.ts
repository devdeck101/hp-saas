import { prisma } from "@/lib/db";

export const findOrgByOwnerId = async (owner: string) => {
	const org = await prisma.org.findUnique({
		where: {
			id: owner,
		},
		select: {
			id: true,
		},
	});
	return org;
};
