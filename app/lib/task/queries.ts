import prisma from "@/app/lib/prisma";
import {Task} from "@/app/generated/prisma/client";
import {TaskState} from "@/app/lib/task/actions";

export async function fetchTasks(): Promise<Task[]> {
    try {
        return await prisma.task.findMany({ orderBy: {
                id: 'asc'
        }});
    } catch (e) {
        console.error(e);
        throw new Error('There was an error fetching tasks');
    }
}

