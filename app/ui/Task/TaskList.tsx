import TaskItem from "@/app/ui/Task/TaskItem";
import {fetchTasks} from "@/app/lib/task/queries";

export default async function TaskList() {

    const tasks = await fetchTasks();

    return (
        <ul className="max-w-md space-y-1 text-body list-inside">
            {tasks.map((task) => {
                return (
                    <TaskItem task={task} key={task.id}/>
                )
            })}
        </ul>
    );
}