"use client"

import {useActionState} from "react";
import {addTask, TaskState} from "@/app/lib/task/actions";
import {Button, Spinner} from "flowbite-react";

export default function AddTask() {
    const initialTaskState: TaskState = {message: null, errors: {}, success: false};
    const [task, formAction, isPending] = useActionState(addTask, initialTaskState);

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

            <Button
                type="submit"
                disabled={isPending}
            >
                <span>{isPending ? <Spinner size="sm" aria-label="Info spinner example" className="me-3" light /> : ''}</span>
                {/*<Spinner size="sm" aria-label="Info spinner example" className="me-3" light />*/}
                { isPending ? "Добавляю задачу..." : "Добавить задачу" }
            </Button>

            <div id="any-errors" aria-live="polite" aria-atomic="true">
                {Object.keys(task.errors).length > 0 && (<p className="mt-2 text-sm text-red-500">
                    Missing fields.
                </p>)}
            </div>
        </form>

    )
}