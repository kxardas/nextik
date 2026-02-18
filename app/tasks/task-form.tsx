"use client";

import { useActionState } from "react";
import { createTask } from "@/lib/actions";

export function TaskForm() {
  const [state, formAction, isPending] = useActionState(createTask, {
    message: "",
    errors: {},
  });

  return (
    <form action={formAction} style={{ marginBottom: "2rem" }}>
      <div>
        <input
          type='text'
          name='title'
          placeholder='What to do?'
          disabled={isPending}
          style={{ padding: "8px", flex: 1, color: "black" }}
        />
        <button type='submit' disabled={isPending}>
          {isPending ? "Adding..." : "Add"}
        </button>
      </div>

      {state?.errors?.title && (
        <p style={{ color: "red", fontSize: "14px" }}>{state.errors.title[0]}</p>
      )}
    </form>
  );
}