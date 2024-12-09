import { z } from "astro/zod";
import { defineAction, ActionError } from "astro:actions";
import { db } from "../../../db/db";
import { complaints } from "../../../db/schema";
import { serviceOptions } from "../../../db/schemas/complaints";
import { complaintOptions } from "../../../db/schemas/complaints";
import { DateTime } from "luxon";
import { resend } from "../../../resend/client";
import { createRefillingTokenBucket } from "../../../utils/rate-limit";
import { ulid } from "ulid";

const ipBucket = createRefillingTokenBucket(3, 5 * 60);

const complaintOptionMap: Record<(typeof complaintOptions)[number], string> = {
  claim: "Reclamo",
  complaint: "Queja",
};

export const addComplaint = defineAction({
  accept: "form",
  input: z.object({
    dni: z.string().regex(/^\d{8}$/, "El DNI debe ser un número de 8 dígitos"),
    fullName: z
      .string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .refine(
        (fullName) =>
          /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/.test(fullName),
        {
          message:
            "Los nombres y apellidos solo pueden contener letras mayúsculas, minúsculas y espacios, y no puede comenzar ni terminar con un espacio.",
        },
      ),
    email: z
      .string({ message: "El email es requerido" })
      .email("El email no es válido"),
    phone: z.string().refine((phone) => /^\d{9}$/.test(phone), {
      message: "El número de teléfono debe contener exactamente 9 dígitos.",
    }),
    date: z.string().refine(
      (date) => {
        const todayDate = DateTime.now().setZone("America/Lima");
        const userDate = DateTime.fromISO(date);

        if (!userDate.isValid) {
          return false;
        }
        return userDate <= todayDate;
      },
      {
        message: "La fecha no puede ser posterior a la actual",
      },
    ),
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
  handler: async (input, ctx) => {
    const clientIP = ctx.request.headers.get("X-Forwarded-For");

    if (clientIP) {
      if (ipBucket.check(clientIP, 1)) {
        // If there are enough tokens, consume one and proceed
        ipBucket.consume(clientIP, 1);
      } else {
        throw new ActionError({
          code: "TOO_MANY_REQUESTS",
          message: "Demasiadas solicitudes, intente nuevamente más tarde",
        });
      }
    }

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

    const id = ulid();
    const complaintOptionName = complaintOptionMap[complaintOption] || "";

    const complaintToUpdate: typeof complaints.$inferInsert = {
      id,
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

      resend.emails.send({
        from: "noreply@lienzolima.com",
        to: [input.email],
        subject: "Lienzo Lima - Confirmación de registro de reclamo",
        html: `<p>Estimad@ ${input.fullName},</p>
               <p>Gracias por comunicarte con Lienzo Lima.</p>
               <p>Lamentamos el inconveniente. Valoramos tus comentarios, ya que nos ayudan a mejorar continuamente nuestros servicios.</p>
               <p>Hemos recibido tu reclamo con el número de seguimiento ${id} y ya se encuentra en proceso de revisión por nuestro equipo</p> `,
      });

      resend.emails.send({
        from: "noreply@lienzolima.com",
        to: "", // Add the admin email here
        subject: "Lienzo Lima - Nuevo reclamo recibido",
        html: `<p>Se ha registrado un nuevo reclamo:</p>
               <ul>
                <li><strong>Código:</strong> ${id}</li>
                <li><strong>Nombre completo:</strong> ${input.fullName}</li>
                <li><strong>DNI:</strong> ${input.dni}</li>
                <li><strong>Fecha:</strong> ${date}</li>
                <li><strong>Servicio:</strong> ${service}</li>
                <li><strong>Descripción del servicio:</strong> ${serviceDescription}</li>
                <li><strong>Opción de reclamo:</strong> ${complaintOptionName}</li>
               </ul>
               <p>Para más detalles, revise en la sección de Reclamos en el panel de administrador.</p>`,
      });
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
