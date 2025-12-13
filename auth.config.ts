import type { NextAuthConfig } from 'next-auth';
import {redirect} from "next/navigation";

export const authConfig = {
    pages: {
        signIn: '/signin',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            // return true;
            if (auth && nextUrl.host) redirect(nextUrl.host)
            return !!auth;
        },
    },
    providers: [],
} satisfies NextAuthConfig;