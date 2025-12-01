// "use client"

import {Task} from "@/app/generated/prisma/client";
import clsx from "clsx";
import {PencilIcon, TrashIcon, CheckCircleIcon} from "@heroicons/react/24/outline"
import EditTask from "@/app/ui/Task/EditTask";
import {toggleDoneTask} from "@/app/lib/task/actions";

type TaskItemProps = {
    task: Task;
    isEditing: boolean;
    onEditAction: () => void;
    onCancelAction: () => void;
    onSetDeleteTaskAction: () => void;
}

export default function TaskItem({task, onEditAction, isEditing, onCancelAction, onSetDeleteTaskAction}: TaskItemProps) {

    return (
        <li className="flex items-center">
            <CheckCircleIcon
                width={24}
                height={24}
                fill={task.done ? "#046c4e" : 'none'}
                className={clsx({"text-green-700" : task.done}, "me-1.5 shrink-0 cursor-pointer")}
                onClick={() => toggleDoneTask(task)}
            />
            {task.text}
            <PencilIcon className="h-4 w-4 ml-5 cursor-pointer" onClick={onEditAction}/>
            <TrashIcon className="h-4 w-4 ml-5 cursor-pointer" onClick={onSetDeleteTaskAction}/>
            {isEditing && <EditTask task={task} key={task.id} onCancelAction={onCancelAction}/>}
        </li>
    )
}