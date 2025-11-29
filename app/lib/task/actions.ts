"use server"

import {z} from "zod";
import prisma from "@/app/lib/prisma";

const TaskSchema = z.object({
    id: z.uuid(),
    text: z.string({
        error: "Поле обязательно для заполнения",
    }),
    done: z.boolean(),
});

// const CreateTask = TaskSchema.omit({id: true, done: true});

export type TaskState = {
    errors?: {
        text?: string[];
    };
    message: string | null;
};

export async function addTask(prevState: TaskState, formData: FormData): Promise<TaskState> {
    const rawFormData = Object.fromEntries(formData.entries());
    const validatedFields = TaskSchema.safeParse(rawFormData);

    if (!validatedFields.success) {
        return {
            errors: z.treeifyError(validatedFields.error) as TaskState['errors'],
            message: 'Missing Fields. Failed to add task.',
        };
    }

    const { text } = validatedFields.data;

    console.log(text)

    try {
        await prisma.task.create({ data: { text: text }});
        return {
            errors: {},
            message: 'Task created'
        };
    } catch (error) {
        return {
            errors: {},
            message: 'Database error'
        };
    }
}