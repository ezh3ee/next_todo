"use client"

import {useActionState} from "react";
import {addTask, TaskState} from "@/app/lib/task/actions";

export default function AddTask() {
    const initialTaskState: TaskState = {message: null, errors: {}};
    const [task, formAction, isPending] = useActionState(addTask, initialTaskState);
    console.log('task ', task)

    return (
        <form className="max-w-sm mb-5" action={formAction}>

            {/*task.errors?.text*/}
            <div id="task-name-error" aria-live="polite" aria-atomic="true">
                {task.errors?.text && task.errors.text.map((e: string) => {
                    return (
                        <p className="mt-2 text-sm text-red-500" key={e}>
                            {e}
                        </p>
                    )
                })}
            </div>
            <label
                htmlFor="taskName"
                className="block mb-2.5 text-sm font-medium text-heading"
            >
                Название задачи
            </label>
            <input
                type="text"
                id="task-name"
                name="text"
                aria-describedby="task-name-error"
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body mb-10"
                placeholder="Введите название задачи"
            />

            <button type="submit"
                    className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 reading-5 rounded-2xl cursor-pointer">
                { isPending ? "Добавляю задачу..." : "Добавить задачу" }
            </button>

            <div id="any-errors" aria-live="polite" aria-atomic="true">
                {Object.keys(task.errors).length > 0 && (<p className="mt-2 text-sm text-red-500">
                    Missing fields.
                </p>)}
            </div>
        </form>

    )
}