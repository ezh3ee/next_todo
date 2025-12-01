"use server"

import {z} from "zod";
import prisma from "@/app/lib/prisma";
import {revalidatePath} from "next/cache";
import {Task} from "@/app/generated/prisma/client";

const TaskSchema = z.object({
    id: z.uuid(),
    text: z.string({
        error: "Должно быть строкой"
    }).min(1, {error: "Хотя бы 1 символ"}),
    done: z.boolean(),
});

const TaskFields = TaskSchema.omit({id: true, done: true});

export type TaskState = {
    errors: {
        text?: string[];
        // id?: string[];
        // done?: string[];
    };
    message: string | null;
    success: boolean;
};

export async function addTask(prevState: TaskState, formData: FormData): Promise<TaskState> {
    const rawFormData = Object.fromEntries(formData.entries());
    const validatedFields = TaskFields.safeParse(rawFormData);

    if (!validatedFields.success) {
        return {
            // errors: z.flattenError(validatedFields.error).fieldErrors as TaskState['errors'],
            errors: z.flattenError(validatedFields.error).fieldErrors,
            message: 'Missing Fields. Failed to add task.',
            success: false
        };
    }

    const { text } = validatedFields.data;

    try {
        const res = await prisma.task.create({ data: { text: text }});

        revalidatePath('/dashboard/invoices');
        return {
            errors: {},
            message: 'Task created',
            success: true
        };
    } catch (error) {
        console.error('Error creating task ', error);
        return {
            errors: {},
            message: 'Database error',
            success: false
        };
    }
}

export async function updateTask(id: string, prevState: TaskState, formData: FormData): Promise<TaskState> {
    const rawFormData = Object.fromEntries(formData.entries());
    const validatedFields = TaskFields.safeParse(rawFormData);

    if (!validatedFields.success) {
        return {
            errors: z.flattenError(validatedFields.error).fieldErrors,
            message: 'Missing Fields. Failed to update task.',
            success: false
        };
    }

    const { text } = validatedFields.data;

    try {
        await prisma.task.update({where: {id: id}, data: { text: text }});

        revalidatePath('/dashboard/invoices');
        return {
            errors: {},
            message: 'Task updated',
            success: true
        };
    } catch (error) {
        console.error('Error updating task ', error);
        return {
            errors: {},
            message: 'Database error',
            success: false
        };
    }
}

export async function deleteTask(id: string): Promise<boolean> {
    try {
        await prisma.task.delete({where: {id: id}});
        revalidatePath('/dashboard/invoices');
        return true;
    } catch (e) {
        console.error('Error updating task ', e);
        return false;
    }
}

export async function toggleDoneTask(task: Task): Promise<boolean> {
    task.done = !task.done;

    try {
        await prisma.task.update({
            where: {id: task.id},
            data: {...task}
        });
        revalidatePath('/dashboard/invoices');
        return true;
    } catch (e) {
        console.error('Error updating task ', e);
        return false;
    }
}