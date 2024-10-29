import { z } from "astro/zod";
import { eq } from "drizzle-orm";
import { defineAction, ActionError } from "astro:actions";
import { db } from "../../db/db";
import { users } from "../../db/schema";
import { verify } from "@node-rs/argon2";
import { lucia } from "../../auth/auth";

export const login = defineAction({
  accept: "form",
  input: z.object({
    email: z.string().email("Email inválido"),
    password: z
      .string()
      .min(3, "La contraseña debe tener al menos 3 caracteres")
      .max(40, "La contraseña no puede exceder los 40 caracteres"),
  }),
  handler: async (input, ctx) => {
    try {
      const [existingUser] = await db
        .select()
        .from(users)
        .where(eq(users.email, input.email));

      if (!existingUser) {
        throw new Error("Email o contraseña inválidos");
      }

      const passwordMatch = await verify(
        existingUser.passwordHash || "",
        input.password,
      );

      if (!passwordMatch) {
        throw new Error("Email o contraseña inválidos");
      }

      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);

      // Set session cookie
      ctx.cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    } catch (_e) {
      throw new ActionError({
        code: "CONFLICT",
        message: "Email o contraseña inválidos",
      });
    }
  },
});
