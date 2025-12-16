import type {NextAuthConfig, User} from 'next-auth';
import {redirect} from "next/navigation";
import Credentials from "next-auth/providers/credentials";
import { v4 as uuidv4 } from 'uuid';
import { v4 as uuid } from "uuid";
import {PrismaAdapter} from "@auth/prisma-adapter";
import prisma from "@/app/lib/prisma";
import { encode as defaultEncode } from "next-auth/jwt";

export const authConfig = {
    pages: {
        signIn: '/signin',
    },
    session: { strategy: "jwt" },
    callbacks: {
        // async authorized({ auth, request: { nextUrl } }) {
        //     const isOnSignupPage = nextUrl.pathname.startsWith('/signup');
        //
        //     if (isOnSignupPage) {
        //         return true;
        //     }
        //
        //     const isLoggedIn = !!auth?.user;
        //
        //     const isOnDashboard = nextUrl.pathname.startsWith('/');
        //     if (isOnDashboard) {
        //         return isLoggedIn;
        //     } else if (isLoggedIn) {
        //         return Response.redirect(new URL('/', nextUrl));
        //     }
        //     return true;
        // },
        async jwt({ account, user, token }) {
            if (account?.provider === 'credentials') {
                const sessionToken = uuidv4()
                const expires = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000)

                const session = await PrismaAdapter(prisma).createSession!({
                    userId: user.id!,
                    sessionToken,
                    expires,
                })
                token.sessionId = session.sessionToken
            }

            const session = await prisma.session.findUnique({
                where: { sessionToken: token.sessionId as string }
            })

            if (!session) return null

            return token
        },
        session({ session  }) {

            if (!session.user) return session
            const user = {
                id: session.user.id,
                name: session.user.name,
                email: session.user.email,
                emailVerified: session.user.emailVerified,
                image: session.user.image,
                // role: session.user.role,
            }
            session.user = user
            return session
        },
    },
    providers: [Credentials],
} satisfies NextAuthConfig;