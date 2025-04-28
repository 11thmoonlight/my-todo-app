// import { getFilteredTasks } from "@/services/taskService";
// import { Task } from "@/types";
// import TasksList from "@/components/TasksList";

// interface ListPageProps {
//   params: { listTitle: string };
// }

// export default async function ListPage({ params }: ListPageProps) {
//   const userId = "yourUserId";
//   const tasksData = await getFilteredTasks(userId);

//   const filteredTasks = tasksData.allTasks.filter(
//     (task) =>
//       task.list.title.toLowerCase() ===
//       decodeURIComponent(params.listTitle).toLowerCase()
//   );

//   return <TasksList tasks={filteredTasks} />;
// }
