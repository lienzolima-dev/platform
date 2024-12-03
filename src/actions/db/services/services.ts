import { z } from "astro/zod";
import { defineAction, ActionError } from "astro:actions";
import { db } from "../../../db/db";
import { services } from "../../../db/schema";
import { eq } from "drizzle-orm";

export const addService = defineAction({
  accept: "form",
  input: z.object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    price: z.number().positive("El precio debe ser positivo"),
    description: z.string().nullable(),
    durationHours: z
      .string()
      .regex(
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        "La duración debe estar en el formato HH:MM",
      )
      .refine(
        (value) => {
          const [hours, minutes] = value.split(":").map(Number);
          return hours > 0 || minutes > 0;
        },
        {
          message: "La duración debe ser mayor a 00:00",
        },
      ),
    category: z
      .string()
      .min(3, "La categoría debe tener al menos 3 caracteres"),
  }),
  handler: async (input, _ctx) => {
    const { name, price, description, durationHours, category } = input;
    const serviceToUpdate: typeof services.$inferInsert = {
      name: name,
      price: price,
      durationHours:
        Number(durationHours.split(":")[0]) +
        Number(durationHours.split(":")[1]) / 60,
      category: category,
    };

    if (description) {
      serviceToUpdate.description = description;
    }

    try {
      await db.insert(services).values(serviceToUpdate);
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

export const editService = defineAction({
  accept: "form",
  input: z.object({
    serviceId: z.string({ message: "El id del servicio es requerido" }).min(1),
    nameService: z
      .string()
      .min(3, "El nombre debe tener al menos 3 caracteres"),
    price: z.number().positive("El precio debe ser positivo"),
    description: z.string().nullable(),
    durationHours: z
      .string()
      .regex(
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        "La duración debe estar en el formato HH:MM",
      )
      .refine(
        (value) => {
          const [hours, minutes] = value.split(":").map(Number);
          return hours > 0 || minutes > 0;
        },
        {
          message: "La duración debe ser mayor a 00:00",
        },
      ),
    category: z
      .string()
      .min(3, "La categoría debe tener al menos 3 caracteres"),
  }),
  handler: async (input, _ctx) => {
    const {
      serviceId,
      nameService,
      price,
      description,
      durationHours,
      category,
    } = input;
    const serviceToUpdate: typeof services.$inferInsert = {
      name: nameService,
      price: price,
      description: description || null,
      durationHours:
        Number(durationHours.split(":")[0]) +
        Number(durationHours.split(":")[1]) / 60,
      category: category,
    };

    try {
      await db
        .update(services)
        .set(serviceToUpdate)
        .where(eq(services.id, serviceId));
    } catch (e) {
      console.error("[ERROR]: ", e);

      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ocurrió un error al actualizar el servicio",
      });
    }
  },
});

export const deleteService = defineAction({
  accept: "form",
  input: z.object({
    serviceId: z.string({ message: "El id del servicio es requerido" }).min(1),
  }),
  handler: async (input, _ctx) => {
    const { serviceId } = input;

    try {
      await db
        .update(services)
        .set({ status: "deleted" })
        .where(eq(services.id, serviceId));
    } catch (e) {
      console.error("[ERROR]: ", e);

      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ocurrió un error al eliminar el servicio",
      });
    }
  },
});
