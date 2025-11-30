"use client"

import {Task} from "@/app/generated/prisma/client";
import {Button, Label, Spinner, TextInput} from "flowbite-react";
import {addTask, TaskState, updateTask} from "@/app/lib/task/actions";
import {useActionState, useEffect} from "react";

type EditTaskProps = {
    task: Task;
    onCancelAction: () => void;
}

export default function EditTask({task, onCancelAction}: EditTaskProps) {
    const initialTaskState: TaskState = {message: null, errors: {}, success: false};
    const updateTaskWithId = updateTask.bind(null, task.id);
    const [taskState, formAction, isPending] = useActionState(updateTaskWithId, initialTaskState);

    useEffect(() => {
        if (taskState.success) {
            onCancelAction();
        }
    }, [taskState])

    return (
        <form
            action={formAction}
            className="flex max-w-md flex-row shrink-0 gap-4">
            <TextInput
                id="edit-task-name"
                type="text"
                name="text"
                aria-describedby="edit-task-error"
                placeholder="name@flowbite.com"
                defaultValue={task.text}
                />
            <Button
                className="cursor-pointer"
                type="submit"
                disabled={isPending}
            >
                <span>{isPending ? <Spinner size="sm" aria-label="Info spinner example" className="me-3" light /> : ''}</span>
                <span>{ isPending ? "Сохраняю изменения..." : "Изменить задачу" }</span>
            </Button>
            <Button color="alternative" className="cursor-pointer" onClick={onCancelAction}>Отмена</Button>
        </form>
    )
}



/**/

// <form className="max-w-sm flex-row mb-5">
//     <input
//         type="text"
//         id="task-name"
//         name="text"
//         aria-describedby="task-name-error"
//         className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body mb-10"
//         placeholder="Введите название задачи"
//     />
//
//     <button type="submit"
//             className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 reading-5 rounded-2xl cursor-pointer">
//         Изменить задачу
//         {/*{ isPending ? "Изменияю задачу..." : "Изменить задачу" }*/}
//     </button>
// </form>