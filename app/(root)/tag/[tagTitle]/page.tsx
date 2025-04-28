// import { getFilteredTasks } from "@/services/taskService";
// import { Task } from "@/types";
// import TasksList from "@/components/TasksList";

// interface TagPageProps {
//   params: { tagTitle: string };
// }

// export default async function TagPage({ params }: TagPageProps) {
//   const userId = "yourUserId";
//   const tasksData = await getFilteredTasks(userId);

//   const filteredTasks = tasksData.allTasks.filter(
//     (task) =>
//       task.tag.title.toLowerCase() ===
//       decodeURIComponent(params.tagTitle).toLowerCase()
//   );

//   return <TasksList tasks={filteredTasks} />;
// }
