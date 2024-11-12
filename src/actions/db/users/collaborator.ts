import { z } from "astro/zod";
import { defineAction, ActionError } from "astro:actions";
import { db } from "../../../db/db";
import { eq } from "drizzle-orm";
import { users } from "../../../db/schema";
import { userRoles } from "../../../db/schemas/users";
import { hash } from "@node-rs/argon2";

export const editCollaborator = defineAction({
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
    userRole: z.enum(userRoles).nullable(),
    changePassword: z.boolean(),
    password: z
      .string()
      .min(3, "La contraseña debe tener al menos 3 caracteres")
      .max(40, "La contraseña no puede exceder los 40 caracteres")
      .nullable(),
    confirmPassword: z
      .string()
      .min(3, "La contraseña debe tener al menos 3 caracteres")
      .max(40, "La contraseña no puede exceder los 40 caracteres")
      .nullable(),
  }),
  handler: async (input, ctx) => {
    const {
      userId,
      username,
      email,
      phone,
      userRole,
      changePassword,
      password,
      confirmPassword,
    } = input;

    if (ctx.locals.user?.role !== "admin") {
      throw new ActionError({
        code: "NOT_FOUND",
      });
    }

    // Check if current user is trying to edit it's own role
    if (userId === ctx.locals.user?.id && userRole !== ctx.locals.user?.role) {
      throw new ActionError({
        code: "FORBIDDEN",
        message: "No puedes editar tu propio rol",
      });
    }

    // If change password is true, password and confirmPassword are required
    if (changePassword) {
      if (!password || !confirmPassword) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Las contraseñas son requeridas",
        });
      }

      if (password !== confirmPassword) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Las contraseñas no coinciden",
        });
      }
    }

    // Create collaborator object to update
    const collaboratorToUpdate: typeof users.$inferInsert = {
      email,
      username,
    };

    // Add optional fields if they exist
    if (phone) collaboratorToUpdate.phone = phone;
    if (userRole) collaboratorToUpdate.role = userRole;
    if (changePassword && password && confirmPassword) {
      const passwordHash = await hash(password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      });

      collaboratorToUpdate.passwordHash = passwordHash;
    }

    try {
      // Update user in database
      await db
        .update(users)
        .set(collaboratorToUpdate)
        .where(eq(users.id, userId));
    } catch (e) {
      console.error("[Error]: ", e);

      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ocurrió un error al actualizar el colaborador",
      });
    }
  },
});

export const deleteCollaborator = defineAction({
  accept: "form",
  input: z.object({
    collaboratorId: z
      .string({ message: "El id del usuario es requerido" })
      .min(1, "El id del usuario es requerido"),
  }),
  handler: async (input, ctx) => {
    const { collaboratorId } = input;

    if (ctx.locals.user?.role !== "admin") {
      throw new ActionError({
        code: "NOT_FOUND",
      });
    }

    // Check if current user is trying to delete it's own account
    if (collaboratorId === ctx.locals.user?.id) {
      throw new ActionError({
        code: "FORBIDDEN",
        message: "No puedes eliminar tu propia cuenta",
      });
    }

    try {
      // Delete user from database
      await db
        .update(users)
        .set({ status: "deleted" })
        .where(eq(users.id, collaboratorId));
    } catch (e) {
      console.error("[Error]: ", e);

      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ocurrió un error al eliminar el colaborador",
      });
    }
  },
});

export const addCollaborator = defineAction({
  accept: "form",
  input: z.object({
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
    userRole: z.enum(userRoles).nullable(),
    password: z
      .string()
      .min(3, "La contraseña debe tener al menos 3 caracteres")
      .max(40, "La contraseña no puede exceder los 40 caracteres"),
    confirmPassword: z
      .string()
      .min(3, "La contraseña debe tener al menos 3 caracteres")
      .max(40, "La contraseña no puede exceder los 40 caracteres"),
  }),
  handler: async (input, ctx) => {
    const { username, email, phone, userRole, password, confirmPassword } =
      input;

    if (ctx.locals.user?.role !== "admin") {
      throw new ActionError({
        code: "NOT_FOUND",
      });
    }

    if (password !== confirmPassword) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "Las contraseñas no coinciden",
      });
    }

    // Create collaborator object to update
    const collaboratorToUpdate: typeof users.$inferInsert = {
      email,
      username,
    };

    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    collaboratorToUpdate.passwordHash = passwordHash;

    // Add optional fields if they exist
    if (phone) collaboratorToUpdate.phone = phone;
    if (userRole) collaboratorToUpdate.role = userRole;

    try {
      await db.insert(users).values(collaboratorToUpdate);

      // TODO: maybe send email to user with password
    } catch (e) {
      console.error("[Error]: ", e);

      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ocurrió un error al actualizar el colaborador",
      });
    }
  },
});
