import { z } from "astro/zod";
import { defineAction, ActionError } from "astro:actions";
import { db } from "../../../db/db";
import { eq } from "drizzle-orm";
import { users } from "../../../db/schema";

export const editUser = defineAction({
  accept: "form",
  input: z.object({
    userId: z.string({ message: "El id del usuario es requerido" }).min(1),
    username: z
      .string()
      .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
      .refine(
        (username) =>
          !username || /^[a-zA-Z0-9]+([ -][a-zA-Z0-9]+)*$/.test(username),
        {
          message:
            "El nombre de usuario solo puede contener letras minúsculas, números y guiones simples, y no puede comenzar ni terminar con un guión.",
        },
      ),
    email: z
      .string({ message: "El email es requerido" })
      .email({ message: "El email no es válido" }),
    phone: z.string().min(1).nullable(),
  }),
  handler: async (input, ctx) => {
    const { userId, username, email, phone } = input;

    if (ctx.locals.user?.role !== "admin") {
      throw new ActionError({
        code: "NOT_FOUND",
      });
    }

    // Create user object to update
    const userToUpdate: typeof users.$inferInsert = {
      email,
      username,
    };

    // Add optional fields if they exist
    if (phone) userToUpdate.phone = phone;

    try {
      // Update user in database
      await db.update(users).set(userToUpdate).where(eq(users.id, userId));
    } catch (e) {
      console.error("[Error]: ", e);

      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ocurrió un error al actualizar el usuario",
      });
    }
  },
});

export const deleteUser = defineAction({
  accept: "form",
  input: z.object({
    userId: z
      .string({ message: "El id del usuario es requerido" })
      .min(1, "El id del usuario es requerido"),
  }),
  handler: async (input, ctx) => {
    const { userId } = input;

    if (ctx.locals.user?.role !== "admin") {
      throw new ActionError({
        code: "NOT_FOUND",
      });
    }

    try {
      // Delete user from database
      await db
        .update(users)
        .set({ status: "deleted" })
        .where(eq(users.id, userId));
    } catch (e) {
      console.error("[Error]: ", e);

      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ocurrió un error al eliminar el usuario",
      });
    }
  },
});
