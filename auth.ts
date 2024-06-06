import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { prisma } from "./lib/db";
import { findUserbyEmail } from "./services";
import { isTwoFactorAutenticationEnabled } from "./services/auth";
import { findOrgByOwnerId } from "./services/onboarding/org";
export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
	unstable_update: update,
} = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/auth/login",
	},
	callbacks: {
		async signIn({ user, email, account, profile }) {
			if (account && (account.provider === "google" || account.provider === "github")) {
				return true;
			}
			if (user.email) {
				const registeredUser = await findUserbyEmail(user?.email);
				if (!registeredUser?.emailVerified) return false;
			}
			return true;
		},
		async jwt({ token, user, trigger, session }) {
			if (trigger && trigger === "update" && session) {
				token.orgId = session.user.orgId;
				return token;
			}
			if (user) {
				// User is available during sign-in
				if (user.id) {
					const isTwoFactorEnabled = await isTwoFactorAutenticationEnabled(user?.id || "");
					token.isTwoFactorEnabled = isTwoFactorEnabled;
					const org = await findOrgByOwnerId(user.id);
					token.orgId = org?.id || "";
					if (org?.id) {
						token.role = UserRole.ADMIN;
					}
				}
			}
			return token;
		},
		async session({ session, token }) {
			// `session.user.role` is now a valid property, and will be type-checked
			// in places like `useSession().data.user` or `auth().user`
			if (session.user && token.sub) {
				session.user.id = token.sub;
				session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
				session.user.orgId = token.orgId;
			}
			return {
				...session,
				user: {
					...session.user,
					role: token.role,
				},
			};
		},
	},
	...authConfig,
});
