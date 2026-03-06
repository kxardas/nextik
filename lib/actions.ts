"use server";

import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const TaskSchema = z.object({
  title: z.string().min(3, "Title has to be at least 3 characters long."),
});