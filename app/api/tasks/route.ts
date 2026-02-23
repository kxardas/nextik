import { prisma } from "../../../lib/prisma";

export async function GET() {
  const tasks = await prisma.task.findMany({ orderBy: { id: "desc" } });
  return Response.json(tasks);
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.title || typeof body.title !== "string") {
    return Response.json({ error: "Title is required and must be a string." }, { status: 400 });
  }

  const task = await prisma.task.create({
    data: {
      title: body.title,
      completed: body.done,
      user: body.user
    },
  });

  return Response.json(task, { status: 201 });
}

export async function DELETE(req: Request) {
  const body = await req.json();

  if (!body.id || typeof body.id !== "number") {
    return Response.json({ error: "ID is required and must be a number." }, { status: 400 });
  }

  if (!(await prisma.task.findUnique({ where: { id: body.id } }))) {
    return Response.json({ error: "Task with the given ID does not exist." }, { status: 404 });
  }

  await prisma.task.delete({
    where: { id: body.id },
  });

  return new Response(null, { status: 204 });
}
