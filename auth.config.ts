import type { NextAuthConfig } from 'next-auth';
import {redirect} from "next/navigation";

export const authConfig = {
    pages: {
        signIn: '/signin',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {

            const isOnSignupPage = nextUrl.pathname.startsWith('/signup');

            if (isOnSignupPage) {
                return true;
            }

            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/');
            if (isOnDashboard) {
                return isLoggedIn;
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/', nextUrl));
            }
            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;