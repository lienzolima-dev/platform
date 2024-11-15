import { z } from "astro/zod";
import { defineAction, ActionError } from "astro:actions";
import { db } from "../../db/db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import { hash } from "@node-rs/argon2";
import { ulid } from "ulid";
import { baseUrl } from "../../utils/global";
import { resend } from "../../resend/client";

export const signup = defineAction({
  accept: "form",
  input: z.object({
    email: z.string().email("Email inválido"),
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
    password: z
      .string()
      .min(3, "La contraseña debe tener al menos 3 caracteres")
      .max(40, "La contraseña no puede exceder los 40 caracteres"),
    passwordConfirm: z
      .string()
      .min(3, "La contraseña debe tener al menos 3 caracteres")
      .max(40, "La contraseña no puede exceder los 40 caracteres"),
  }),
  handler: async (input, _ctx) => {
    if (input.password !== input.passwordConfirm) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "Las contraseñas no coinciden",
      });
    }

    try {
      // Get existing user with email
      const [existingUser] = await db
        .select()
        .from(users)
        .where(eq(users.email, input.email));

      // Check if user with that email already exists
      if (existingUser && existingUser.status !== "deleted") {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "El email ingresado ya está registrado",
        });
      }

      // Hash password
      const passwordHash = await hash(input.password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      });

      // Generate varification code
      const verificationCode = ulid();
      const verificationURL = `${baseUrl}/verify-email?code=${verificationCode}`;

      const userData: typeof users.$inferInsert = {
        email: input.email,
        username: input.username,
        passwordHash,
        emailVerified: false,
        verificationCode,
      };

      // Add user to database
      if (!existingUser) {
        await db.insert(users).values({
          id: ulid(),
          avatarURL: null,
          ...userData,
        });
      } else {
        await db
          .update(users)
          .set({
            status: "active",
            avatarURL: null,
            ...userData,
          })
          .where(eq(users.id, existingUser.id));
      }

      // Send email verification
      await resend.emails.send({
        from: "noreply@lienzolima.com",
        to: [input.email],
        subject: "Lienzo Lima - Verifica tu email",
        html: `<p>Hola ${input.username}, verifica tu email accediendo al siguiente link:</p>
               <a href="${verificationURL}">${verificationURL}</a>`,
      });
    } catch (e) {
      console.error(e);
      if (e instanceof ActionError) throw e;

      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ups algo salió mal, intentalo más tarde",
      });
    }
  },
});
