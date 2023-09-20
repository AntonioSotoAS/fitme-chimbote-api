import { z } from "zod";

export const registerSchema = z.object({
  dni: z.string({
    required_error: "Dni is required",
  }),
  username: z.string({
    required_error: "Username is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email",
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
  password: z
    .string({
      required_error: "SecondSurName is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
  photo: z.string({
    required_error: "Photo is required",
  }),
  Role: z.string({
    required_error: "Role is required",
  }),
});

export const loginSchema = z.object({
  email: z
  .string({
    required_error: "Email is required",
  })
  .email({
    message: "Email is not valid",
  }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
});
