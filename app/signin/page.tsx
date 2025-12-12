
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { signup } from '@/app/lib/auth/actions'
// import {useActionState} from "react";
import {TaskState} from "@/app/lib/task/actions";
import {SignupFormState} from "@/app/lib/auth/definitions";
import {signIn} from "@/auth";

export default function page() {
    // const initialSignupState: SignupFormState = {message: null, errors: {}, success: false};
    // const [signupState, formAction, pending] = useActionState(signup, initialSignupState)
    // console.log(signupState)
    return (

        <div className="flex items-center justify-center h-screen bg-gray-200">
            <form  action={async (formData) => {
                "use server"
                await signIn("credentials", formData)
            }} className="flex max-w-md flex-col gap-4 m-auto">
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
                <Button type="submit">Signin</Button>
            </form>
        </div>
    )
}
