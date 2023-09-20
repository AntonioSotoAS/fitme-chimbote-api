import { z } from "zod";

export const roleSchema = z.object({
  typeRole: z.string({
    required_error: "typeRole is required",
  }),
});
