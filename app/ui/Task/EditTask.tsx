import {Task} from "@/app/generated/prisma/client";

export default function EditTask({task}: {task: Task}) {
    return (
        <form className="max-w-sm mb-5">
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
                Изменить задачу
                {/*{ isPending ? "Изменияю задачу..." : "Изменить задачу" }*/}
            </button>
        </form>
    )
}