"use client"

import {Task} from "@/app/generated/prisma/client";
import TaskItem from "@/app/ui/Task/TaskItem";
import {useState} from "react";
import TaskDeletionModal from "@/app/ui/Task/TaskDeletionModal";

export default function TaskListWrapper({tasks}: { tasks: Task[] }) {

    const [editTaskId, setEditTaskId] = useState<string | null>(null);
    const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

    return (
        <>
            <ul className="max-w-md space-y-1 text-body list-inside">
                {tasks.map((task) => {
                    return (
                        <TaskItem
                            key={task.id}
                            task={task}
                            isEditing={task.id === editTaskId}
                            onEditAction={() => setEditTaskId(task.id)}
                            onCancelAction={() => setEditTaskId(null)}
                            onSetDeleteTaskAction={() => setTaskToDelete(task)}
                        />
                    )
                })}
            </ul>

            {taskToDelete && <TaskDeletionModal
                task={taskToDelete}
                onCancelDeletionAction={() => setTaskToDelete(null)}
                onConfirmDeletionAction={() => setTaskToDelete(null)}
            />}
        </>
    )
}