import prisma from "@/app/lib/prisma";
import {Task} from "@/app/generated/prisma/client";

export async function fetchTasks(): Promise<Task[]> {
    try {
        return await prisma.task.findMany();
    } catch (e) {
        console.error(e);
        throw new Error('There was an error fetching tasks');
    }
}

