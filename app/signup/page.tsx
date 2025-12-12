"use client"
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { signup } from '@/app/lib/auth/actions'
import {useActionState} from "react";
import {TaskState} from "@/app/lib/task/actions";
import {SignupFormState} from "@/app/lib/auth/definitions";

export default function page() {
    const initialSignupState: SignupFormState = {message: null, errors: {}, success: false};
    const [signupState, formAction, pending] = useActionState(signup, initialSignupState)
    console.log(signupState)
    return (

        <div className="flex items-center justify-center h-screen bg-gray-200">
            <form action={formAction} className="flex max-w-md flex-col gap-4 m-auto">
                {signupState.errors?.email && <p className="text-red-700">{signupState.errors.email}</p>}
                <div className="mb-2 block">
                    <Label htmlFor="email">Your email</Label>
                </div>
                <TextInput id="email" type="text" placeholder="name@flowbite.com" name="email"/>
                {signupState.errors?.name && <p className="text-red-700">{signupState.errors.name}</p>}
                <div className="mb-2 block">
                    <Label htmlFor="name">Your name</Label>
                </div>
                <TextInput id="name" type="text" placeholder="Vasya" name="name"/>
                {signupState.errors?.password && (
                    <div>
                        <p className="text-red-700">Password must:</p>
                        <ul>
                            {signupState.errors.password.map((error) => (
                                <li key={error} className="text-red-700">- {error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="mb-2 block">
                    <Label htmlFor="password">Your password</Label>
                </div>
                <TextInput id="password" type="password" placeholder="***" name="password"/>
                <div className="flex items-center gap-2">
                    <Checkbox id="remember"/>
                    <Label htmlFor="remember">Remember me</Label>
                </div>

                <div id="any-errors" aria-live="polite" aria-atomic="true">
                    {Object.keys(signupState.errors).length > 0 && (<p className="mt-2 text-sm text-red-500">
                        Ошибки при заполнении.
                    </p>)}

                    {(signupState.message && signupState.success ) && (<p className="mt-2 text-sm text-green-500">
                        {signupState.message}
                    </p>)}
                </div>


                <Button type="submit">Signup</Button>
            </form>
        </div>
    )
}
