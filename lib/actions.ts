"use server";

import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const TaskSchema = z.object({
  title: z.string().min(3, "Title has to be at least 3 characters long."),
});

export async function createTask(prevState: any, formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("You have to be authorized.");
  }

  const title = formData.get("title") as string;

  const validated = TaskSchema.safeParse({ title });
  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: "Validation error.",
    };
  }

  try {
    await prisma.task.create({
      data: {
        title: validated.data.title,
        userId: session.user.id,
      },
    });
  } catch (e) {
    return { message: "Database error", errors: {} };
  }

  revalidatePath("/tasks");
}
