"use client"

import {Task} from "@/app/generated/prisma/client";
import TaskItem from "@/app/ui/Task/TaskItem";
import {useState} from "react";

export default function TaskListWrapper({tasks}: { tasks: Task[] }) {

    const [editTaskId, setEditTaskId] = useState<string | null>(null);

    console.log(editTaskId)

    return (
        <ul className="max-w-md space-y-1 text-body list-inside">
            {tasks.map((task) => {
                return (
                    <TaskItem
                        key={task.id}
                        task={task}
                        isEditing={task.id === editTaskId}
                        onEditAction={() => setEditTaskId(task.id)}
                    />

                    // <TaskItem task={task} key={task.id} />
                )
            })}
        </ul>
    )
}