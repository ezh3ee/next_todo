import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import {SigninFormSchema} from "@/app/lib/auth/definitions";
import prisma from "@/app/lib/prisma";
import {authConfig} from "@/auth.config";

export const {handlers, signIn, signOut, auth} = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
                credentials: {
                        email: {},
                        password: {},
                        name: {}
                },
                authorize: async (credentials) => {
                    const { email, password } = await SigninFormSchema.parseAsync(credentials);

                    try {
                        const user = await prisma.user.findFirst({where: {email: email}});

                        if (!user) return null;

                        return user;
                    } catch (e) {
                        console.error('Failed to signin ', e);
                        throw new Error('Failed to signin');
                    }






                    // return {
                    //     id: "user_123",
                    //     email: '2',
                    //     name: '1',
                    // }
                },
        })
    ],
});