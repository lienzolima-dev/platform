import { db } from "../../../db/db";
import { tasks } from "../../../db/schema";
import { desc, eq } from "drizzle-orm";
import type { Task } from "./types";

// {
//     id: "3",
//     date: "20/8",
//     creationTime: "15:40",
//     description: "Lorem ipsum dolor sit amet, consecteturh",
// }

export function formatTasksData(task: {
  id: string;
  date: string;
  description: string;
}): Task {
  const date = task.date
    ? new Date(task.date).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
      })
    : "";

  const creationTime = task.date
    ? new Date(task.date).toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return {
    id: task.id,
    date,
    creationTime,
    description: task.description,
  };
}

export async function getTasks(): Promise<Task[]> {
  const tasksList = await db
    .select({
      id: tasks.id,
      date: tasks.createdAt,
      description: tasks.description,
    })
    .from(tasks)
    .where(eq(tasks.status, "pending"))
    .orderBy(desc(tasks.createdAt));

  return tasksList.map(formatTasksData);
}
