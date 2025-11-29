"use server"

import {z} from "zod";
import prisma from "@/app/lib/prisma";
import {revalidatePath} from "next/cache";

const TaskSchema = z.object({
    id: z.uuid(),
    text: z.string({
        error: "Поле обязательно для заполнения",
    }),
    done: z.boolean(),
});

const CreateTask = TaskSchema.omit({id: true, done: true});

export type TaskState = {
    errors: {
        text?: string[];
        // id?: string[];
        // done?: string[];
    };
    message: string | null;
};

export async function addTask(prevState: TaskState, formData: FormData): Promise<TaskState> {
    const rawFormData = Object.fromEntries(formData.entries());
    const validatedFields = CreateTask.safeParse(rawFormData);

    if (!validatedFields.success) {
        return {
            // errors: z.flattenError(validatedFields.error).fieldErrors as TaskState['errors'],
            errors: z.flattenError(validatedFields.error).fieldErrors,
            message: 'Missing Fields. Failed to add task.',
        };
    }

    const { text } = validatedFields.data;

    try {
        const res = await prisma.task.create({ data: { text: text }});
        console.log('Task created ', res);
        revalidatePath('/dashboard/invoices');
        return {
            errors: {},
            message: 'Task created'
        };
    } catch (error) {
        console.error('Error creating task ', error);
        return {
            errors: {},
            message: 'Database error'
        };
    }
}