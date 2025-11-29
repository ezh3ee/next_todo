import TaskList from "@/app/ui/Task/TaskList";
import Loader from "@/app/ui/Loader";
import {Suspense} from "react";
import AddTask from "@/app/ui/Task/AddTask";

export default async function Home() {
    return (
        <>
            <AddTask />
            <Suspense fallback={<Loader />}>
                <TaskList />
            </Suspense>
        </>
    );
}
