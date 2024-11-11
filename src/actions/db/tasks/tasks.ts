import { z } from "astro/zod";
import { defineAction, ActionError } from "astro:actions";
import { db } from "../../../db/db";
import { tasks } from "../../../db/schema";
import { eq } from "drizzle-orm";

export const add = defineAction({
  accept: "form",
  input: z.object({
    description: z
      .string()
      .min(3, "La descripción debe tener al menos 3 caracteres"),
  }),
  handler: async (input, _ctx) => {
    try {
      await db.insert(tasks).values({
        description: input.description,
      });
    } catch (_e) {
      throw new ActionError({
        code: "CONFLICT",
        message: "Error al agregar tarea",
      });
    }
  },
});

export const complete = defineAction({
  input: z.object({
    id: z.string(),
  }),
  handler: async (input, _ctx) => {
    try {
      await db
        .update(tasks)
        .set({
          status: "completed",
        })
        .where(eq(tasks.id, input.id));
    } catch (_e) {
      throw new ActionError({
        code: "CONFLICT",
        message: "Error al eliminar tarea",
      });
    }
  },
});

export const remove = defineAction({
  input: z.object({
    id: z.string(),
  }),
  handler: async (input, _ctx) => {
    try {
      await db
        .update(tasks)
        .set({ status: "removed" })
        .where(eq(tasks.id, input.id));
    } catch (_e) {
      throw new ActionError({
        code: "CONFLICT",
        message: "Error al eliminar tarea",
      });
    }
  },
});
