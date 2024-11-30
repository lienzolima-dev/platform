import { z } from "astro/zod";
import { defineAction, ActionError } from "astro:actions";
import { db } from "../../../db/db";
import { extras } from "../../../db/schema";
import { eq } from "drizzle-orm";

export const addExtra = defineAction({
  accept: "form",
  input: z.object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    price: z.number().positive("El precio debe ser positivo"),
    description: z.string().nullable(),
  }),
  handler: async (input, _ctx) => {
    const { name, price, description } = input;
    const extraToUpdate: typeof extras.$inferInsert = {
      name: name,
      price: price,
    };

    if (description) {
      extraToUpdate.description = description;
    }

    try {
      await db.insert(extras).values(extraToUpdate);
    } catch (e) {
      console.error("[ERROR]: ", e);
      if (e instanceof ActionError) throw e;

      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ups algo salió mal, intentalo más tarde",
      });
    }
  },
});

export const editExtra = defineAction({
  accept: "form",
  input: z.object({
    extraId: z.string({ message: "El id del adicional es requerido" }).min(1),
    nameExtra: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    price: z.number().positive("El precio debe ser positivo"),
    description: z.string().nullable(),
  }),
  handler: async (input, _ctx) => {
    const { extraId, nameExtra, price, description } = input;
    const extraToUpdate: typeof extras.$inferInsert = {
      name: nameExtra,
      price: price,
      description: description || null,
    };

    try {
      await db.update(extras).set(extraToUpdate).where(eq(extras.id, extraId));
    } catch (e) {
      console.error("[ERROR]: ", e);

      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ocurrió un error al actualizar el adicional",
      });
    }
  },
});

export const deleteExtra = defineAction({
  accept: "form",
  input: z.object({
    extraId: z.string({ message: "El id del adicional es requerido" }).min(1),
  }),
  handler: async (input, _ctx) => {
    const { extraId } = input;

    try {
      await db
        .update(extras)
        .set({ status: "deleted" })
        .where(eq(extras.id, extraId));
    } catch (e) {
      console.error("[ERROR]: ", e);

      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ocurrió un error al eliminar el adicional",
      });
    }
  },
});
