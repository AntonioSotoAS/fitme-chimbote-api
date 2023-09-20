import { z } from "zod";

export const shiftSchema = z.object({
  capacity: z.number({
    required_error: "Capacity is required",
  }),
  shift: z.string({
    required_error: "Shift is required",
  }),
});
