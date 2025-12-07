import TaskList from "@/app/ui/Task/TaskList";
import Loader from "@/app/ui/Loader";
import {Suspense} from "react";
import AddTask from "@/app/ui/Task/AddTask";
import { Button } from "flowbite-react";

export default async function Home() {
    return (

        <>
            <h1 className="mb-2 text-5xl font-medium text-heading">Симпл Туду</h1>
            <AddTask />
            <Suspense fallback={<Loader />}>
                <TaskList />
            </Suspense>
        </>
    );
}
