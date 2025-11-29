import TaskItem from "@/app/ui/Task/TaskItem";
import {fetchTasks} from "@/app/lib/task/queries";
import TaskListWrapper from "@/app/ui/Task/TaskListWrapper";

export default async function TaskList() {

    const tasks = await fetchTasks();

    return <TaskListWrapper tasks={tasks} />
}