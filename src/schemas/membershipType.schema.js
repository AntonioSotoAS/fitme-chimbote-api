import { z } from "zod";

export const membershipTypeSchema = z.object({
  typeMembership: z.string({
    required_error: "TypeMembership is required",
  }),
});
