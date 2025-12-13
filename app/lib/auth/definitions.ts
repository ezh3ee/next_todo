import * as z from 'zod'

export const SigninFormSchema = z.object({
    email: z
        .string()
        .trim(),
    password: z
        .string()
        .trim(),
});


export const SignupFormSchema = z.object({
    name: z
        .string()
        .min(2, { error: 'Name must be at least 2 characters long.' })
        .trim(),
    email: z
        .string()
        // .email({ error: 'Please enter a valid email.' })
        .trim(),
    password: z
        .string()
        // .min(8, { error: 'Be at least 8 characters long' })
        // .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
        // .regex(/[0-9]/, { error: 'Contain at least one number.' })
        // .regex(/[^a-zA-Z0-9]/, {
        //     error: 'Contain at least one special character.',
        // })
        .trim(),
})

export type SignupFormState = {
    errors: {
        name?: string[]
        email?: string[]
        password?: string[]
    }
    message: string | null,
    success: boolean,
}
    // | undefined



export type SigninFormState = {
    errors: {
        id?: string[]
        email?: string[]
    }
    message: string | null,
    success: boolean,
}
// | undefined