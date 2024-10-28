import { z } from "astro/zod";
import { defineAction, ActionError } from "astro:actions";
import { db } from "../../db/db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import { hash } from "@node-rs/argon2";
import { ulid } from "ulid";
import { Resend } from "resend";
import { getResendApiKey } from "../../utils/env";

const resend = new Resend(getResendApiKey());

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
      .min(3, "Password must be at least 3 characters")
      .max(40, "Password cannot exceed 40 characters"),
    passwordConfirm: z
      .string()
      .min(3, "Password must be at least 3 characters")
      .max(40, "Password cannot exceed 40 characters"),
  }),
  handler: async (input, _ctx) => {
    console.log("signup", input);
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
      if (existingUser) {
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

      // Add user to database
      await db.insert(users).values({
        id: ulid(),
        email: input.email,
        username: input.username,
        avatarURL: null,
        passwordHash,
        emailVerified: false,
      });

      // Send email verification
      await resend.emails.send({
        from: "noreplay@lienzolima.com",
        to: ["vegasfernando2003@gmail.com"],
        subject: "Verifica tu email",
        html: `<p>Hola ${input.username}</p>`,
      });
    } catch (e) {
      console.error(e);

      if (e instanceof ActionError) {
        throw e;
      }

      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to add admin",
      });
    }
  },
});
