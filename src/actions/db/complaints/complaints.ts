import { z } from "astro/zod";
import { defineAction, ActionError } from "astro:actions";
import { db } from "../../../db/db";
import { complaints } from "../../../db/schema";
import { serviceOptions } from "../../../db/schemas/complaints";
import { complaintOptions } from "../../../db/schemas/complaints";

export const addComplaint = defineAction({
  accept: "form",
  input: z.object({
    dni: z.string().regex(/^\d{8}$/, "El DNI debe ser un número de 8 dígitos"),
    fullName: z
      .string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .refine((fullName) => /^[a-zA-Z]+( [a-zA-Z]+)*$/.test(fullName), {
        message:
          "Los nombres y apellidos solo pueden contener letras minúsculas y espacios, y no puede comenzar ni terminar con un espacio.",
      }),
    email: z
      .string({ message: "El email es requerido" })
      .email("El email no es válido"),
    phone: z.string().refine((phone) => /^\d{9}$/.test(phone), {
      message: "El número de teléfono debe contener exactamente 9 dígitos.",
    }),
    date: z.string(),
    service: z.enum(serviceOptions),
    serviceDescription: z
      .string()
      .min(3, "La descripción del servicio debe tener al menos 3 caracteres"),
    complaintOption: z.enum(complaintOptions),
    complaintDescription: z
      .string()
      .min(3, "La descripción de reclamación debe tener al menos 3 caracteres"),
    adicionalInfo: z.string().nullable(),
  }),
  handler: async (input, _ctx) => {
    const {
      dni,
      fullName,
      email,
      phone,
      date,
      service,
      serviceDescription,
      complaintOption,
      complaintDescription,
      adicionalInfo,
    } = input;

    console.log("Datos recibidos:", input);

    const complaintToUpdate: typeof complaints.$inferInsert = {
      dni: dni,
      fullName: fullName,
      email: email,
      phone: phone,
      date: date,
      service: service,
      serviceDescription: serviceDescription,
      complaintOption: complaintOption,
      complaintDescription: complaintDescription,
    };

    if (adicionalInfo) complaintToUpdate.adicionalInfo = adicionalInfo;

    try {
      await db.insert(complaints).values(complaintToUpdate);
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
