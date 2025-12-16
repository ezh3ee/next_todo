import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import {SigninFormSchema} from "@/app/lib/auth/definitions";
import prisma from "@/app/lib/prisma";
import {authConfig} from "@/auth.config";
import {PrismaAdapter} from "@auth/prisma-adapter";

export const {handlers, signIn, signOut, auth} = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
                credentials: {
                        email: {},
                        password: {},
                        name: {}
                },
                authorize: async (credentials) => {
                    const { email, password } = await SigninFormSchema.parseAsync(credentials);

                    const user = await prisma.user.findFirst({where: {email: email}});

                    if (!user) throw new Error('Invalid credentials');

                    return user;
                },
        })
    ],
});