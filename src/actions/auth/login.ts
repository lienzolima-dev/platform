import { z } from "astro/zod";
import { defineAction, ActionError } from "astro:actions";

export const login = defineAction({
  accept: "form",
  input: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
  handler: (input, _ctx) => {
    console.log(input);
    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: "This is a test error",
    });
  },
});
