import { z } from "zod";

export const membershipSchema = z.object({
  Client: z.string({
    required_error: "Client is required",
  }),
  Shift: z.string({
    required_error: "Shift is required",
  }),
  TypeMembership: z.string({
    required_error: "TypeMembership is required",
  }),
  amount: z.number({
    required_error: "Amount is required",
  }),
  attendance: z.number({
    required_error: "Attendance is required",
  }),
  startDate: z.string({
    required_error: "StartDate is required",
  }),
  endDate: z.string({
    required_error: "EndDate is required",
  }),
  state: z.boolean({
    required_error: "State is required",
  }),
});
