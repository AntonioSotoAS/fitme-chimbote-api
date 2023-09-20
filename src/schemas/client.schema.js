import { z } from "zod";

export const clientSchema = z.object({
  dni: z.string({
    required_error: "Dni is required",
  }),
  firstName: z.string({
    required_error: "FirstName is required",
  }),
  secondName: z.string({
    required_error: "SecondName is required",
  }),
  surName: z.string({
    required_error: "SurName is required",
  }),
  secondSurName: z.string({
    required_error: "SecondSurName is required",
  }),
  photo: z.string({
    required_error: "Photo is required",
  }),
});
