"use server"

import {SignupFormState, SignupFormSchema} from "@/app/lib/auth/definitions";
import {z} from "zod";
import bcrypt from "bcrypt";
import prisma from "@/app/lib/prisma";
import {Prisma, User} from "@/app/generated/prisma/client";
import {redirect} from "next/navigation";

export async function signup(state: SignupFormState, formData: FormData): Promise<SignupFormState> {
    const rawFormData = Object.fromEntries(formData.entries());
    const validatedFields = SignupFormSchema.safeParse(rawFormData);

    if (!validatedFields.success) {
        return {
            // errors: z.flattenError(validatedFields.error).fieldErrors as TaskState['errors'],
            errors: z.flattenError(validatedFields.error).fieldErrors,
            message: 'Missing Fields. Failed to add task.',
            success: false
        };
    }

    const { name, email, password } = validatedFields.data;
    // e.g. Hash the user's password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user: User = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        });

        return {
            errors: {},
            message: 'User successfully added!',
            success: true
        };

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') { // Unique constraint violation
                console.error('Error: Email already exists.');
                return {
                    errors: {},
                    message: 'Email already exists.',
                    success: false
                };
            } else {
                console.error('Prisma Client Known Request Error:', error.message);
                return {
                    errors: {},
                    message: 'Error creating user: ' + error.message,
                    success: false
                };

            }
        } else if (error instanceof Prisma.PrismaClientValidationError) {
            console.error('Prisma Client Validation Error:', error.message);
            return {
                errors: {},
                message: 'Prisma Client Validation Error:' + error.message,
                success: false
            };
        } else {
            console.error('An unexpected error occurred:', error);
            return {
                errors: {},
                message: 'An unexpected error occurred: ' + error,
                success: false
            };
        }
    }

}