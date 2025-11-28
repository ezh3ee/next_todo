import {Task} from "@/app/generated/prisma/client";
import clsx from "clsx";

export default function TaskItem({task}: {task: Task}) {
    return (
        <li className="flex items-center">
            <svg
                className={clsx({"text-green-700" : task.done}, "w-4 h-4  me-1.5 shrink-0")}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
            </svg>
            {task.text}
        </li>

    )
}