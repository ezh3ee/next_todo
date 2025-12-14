"use client"
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import {signin, signup} from '@/app/lib/auth/actions'
// import {useActionState} from "react";
import {TaskState} from "@/app/lib/task/actions";
import {SignupFormState} from "@/app/lib/auth/definitions";
import {signIn} from "@/auth";
import {useActionState} from "react";
import { useSearchParams } from "next/navigation";

export default function page() {
    const initialSignupState: SignupFormState = {message: null, errors: {}, success: false};
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const [signinState, formAction, pending] = useActionState(signin, initialSignupState)
    return (

        <div className="flex items-center justify-center h-screen bg-gray-200">
            <form  action={formAction}
                   className="flex max-w-md flex-col gap-4 m-auto"
            >
                <div className="mb-2 block">
                    <Label htmlFor="email">Your email</Label>
                </div>
                <TextInput id="email" type="text" placeholder="name@flowbite.com" name="email"/>
                <div className="mb-2 block">
                    <Label htmlFor="name">Your name</Label>
                </div>
                <div className="mb-2 block">
                    <Label htmlFor="password">Your password</Label>
                </div>
                <TextInput id="password" type="password" placeholder="***" name="password"/>
                <div className="flex items-center gap-2">
                    <Checkbox id="remember"/>
                    <Label htmlFor="remember">Remember me</Label>
                </div>
                <input type="hidden" name="redirectTo" value={callbackUrl} />
                <Button type="submit">Signin</Button>
            </form>
        </div>
    )
}
