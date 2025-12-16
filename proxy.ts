import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import {auth} from "@/auth";
import {NextRequest, NextResponse} from "next/server";

export const config = {
    matcher: ['/'],
};


export default NextAuth(authConfig).auth;




//
// export const config = {
//     // https://nextjs.org/docs/app/api-reference/file-conventions/proxy#matcher
//     matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// };




// const PUBLIC_URLS = new Set(['/signin', '/signup', 'signout']);
//
// export default async function proxy(req: NextRequest) {
//     console.log('proxy beginnig')
//     const pathname = req.nextUrl.pathname;
//     const session = await auth();
//
//     if (PUBLIC_URLS.has(pathname) && session) {
//         console.log('yes session')
//         return NextResponse.redirect(new URL('/', req.nextUrl));
//     }
//
//     if (!PUBLIC_URLS.has(pathname) && !session) {
//         console.log('no session session')
//         return NextResponse.redirect(new URL('/signin', req.nextUrl));
//     }
//
//
//     console.log('session from PROXY ', session, ' and pathname is ', pathname);
// }