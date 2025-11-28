import Image from "next/image";
import prisma from "@/app/lib/prisma";
import TaskList from "@/app/ui/TaskList";

export default async function Home() {

    return (
        <TaskList />
    );
}
