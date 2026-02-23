import { NextResponse } from "next/server";
import { z } from "zod";
import * as argon2 from "argon2";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const registerSchema = z
  .object({
    email: z.string().email().max(255),
    password: z.string().min(8).max(72),
    name: z.string().min(1).max(80).optional(),
  })
  .strict();

export async function GET() {
  return NextResponse.json({ ok: "Oops, this is not defined" }, { status: 405 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name } = registerSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 });
    }

    const hash = await argon2.hash(password, { type: argon2.argon2id });

    await prisma.user.create({
      data: {
        name: name?.trim() ?? null,
        email: email.trim().toLowerCase(),
        passwordHash: hash,
      },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return NextResponse.json({ error: "User with this email already exists" }, { status: 409 });
      }
    }

    if (err instanceof z.ZodError) {
      const formatted = err.issues.map((issue) => ({
        field: issue.path[0],
        message: issue.message,
      }));

      return NextResponse.json({ error: "Validation failed", details: formatted }, { status: 400 });
    }
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
