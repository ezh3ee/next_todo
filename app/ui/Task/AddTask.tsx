"use client"

import {useActionState} from "react";
import {Task} from "@/app/generated/prisma/client";
import {addTask, TaskState} from "@/app/lib/task/actions";

export default function AddTask() {
    const initialTaskState: TaskState = {message: null, errors: {}};
    const [task, formAction, isPending] = useActionState(addTask, initialTaskState);

    return (
        <form className="max-w-sm mb-5" action={formAction}>
            <label
                htmlFor="taskName"
                className="block mb-2.5 text-sm font-medium text-heading"
            >
                Название задачи
            </label>
            <input
                type="text"
                id="taskName"
                aria-describedby="helper-text-explanation"
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="Введите название задачи"
            />
            <button type="submit"
                    className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 reading-5 rounded-2xl cursor-pointer">
                { isPending ? "Добавляю задачу..." : "Добавить задачу" }
            </button>
        </form>

    )
}