import TaskList from "@/app/ui/Task/TaskList";
import Loader from "@/app/ui/Loader";
import {Suspense} from "react";
import AddTask from "@/app/ui/Task/AddTask";
import { Button } from "flowbite-react";
import { auth } from "@/auth";
import {redirect} from "next/navigation";
import {headers} from "next/headers";

export default async function Home() {
    const session = await auth()
    // if (!session?.user) return 'not logged in';

        if (!session?.user) {
            const headersList = await headers();
            const pathname = headersList.get("x-pathname") ?? "/";
            const search = headersList.get("x-search") ?? "";

            const callbackUrl = encodeURIComponent(pathname + search);

            redirect(`/signin?callbackUrl=${callbackUrl}`);
        }

        // redirect('/signin');

    return (

        <>
            <h1 className="mb-2 text-5xl font-medium text-heading">Симпл Туду</h1>
            <span>Hello, {session?.user.name}</span>
            <AddTask />
            <Suspense fallback={<Loader />}>
                <TaskList />
            </Suspense>
        </>
    );
}
