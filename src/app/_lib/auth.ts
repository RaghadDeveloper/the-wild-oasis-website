import NextAuth, { Account, Profile, Session, User } from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    authorized({ auth, request }: { auth: Session | null; request: Request }) {
      return !!auth?.user;
    },
    async signIn({
      user,
      account,
      profile,
    }: {
      user: User;
      account?: Account | null;
      profile?: Profile;
    }) {
      try {
        const existingGuest = await getGuest(user.email as string);

        if (!existingGuest)
          await createGuest({
            email: user.email as string,
            fullName: user?.name as string,
          });

        return true;
      } catch {
        return false;
      }
    },
    async session({ session, user }: { session: Session; user: User }) {
      const guest = await getGuest(session.user?.email as string);
      session.user.guestId = guest?.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
