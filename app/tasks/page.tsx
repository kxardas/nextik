import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createTask } from "@/app/lib/actions";
import { redirect } from "next/navigation";
import { Figtree } from "next/font/google";

import styles from "./page.module.css";
import { TaskForm } from "./task-form";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default async function TasksPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const tasks = await prisma.task.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className={figtree.className}>
      <div className={styles.container}>
        <h1>My Tasks</h1>
        
        <TaskForm />
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <span>{task.title}</span>
              <input type='checkbox' checked={task.completed} readOnly />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
