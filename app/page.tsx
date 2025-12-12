import TaskList from "@/app/ui/Task/TaskList";
import Loader from "@/app/ui/Loader";
import {Suspense} from "react";
import AddTask from "@/app/ui/Task/AddTask";
import { Button } from "flowbite-react";
import { auth } from "@/auth";

export default async function Home() {
    // const session = await auth()
    // if (!session?.user) return 'penis'
    return (

        <>
            <h1 className="mb-2 text-5xl font-medium text-heading">Симпл Туду</h1>
            {/*{session?.user.name}*/}
            <AddTask />
            <Suspense fallback={<Loader />}>
                <TaskList />
            </Suspense>
        </>
    );
}
