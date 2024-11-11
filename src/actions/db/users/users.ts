import { z } from "astro/zod";
import { defineAction, ActionError } from "astro:actions";
import { db } from "../../../db/db";
import { tasks } from "../../../db/schema";
import { eq } from "drizzle-orm";

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
    userRole: z.string({
      message: "El rol del usuario debe estar seleccionado",
    }),
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
  handler: (input, _ctx) => {
    console.log(input);
  },
});
