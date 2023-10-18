import z from "zod"

export const createAccountSchema = z
   .object({
      name: z.string().min(3, "Name is required").max(70, "Name is too long"),
      email: z.string().email("Email is required"),
      password: z
         .string()
         .min(6, "Password is required")
         .max(30, "Password can't be more the 30 characters"),
      confirmPassword: z.string().min(6).max(30),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
   })

export const loginSchema = z.object({
   email: z.string().email("Email is required"),
   password: z.string().min(6, "Password is required"),
})

export const createNotesSchema = z.object({
   title: z.string().min(3, "Title is required!").max(70, "Title is too long!"),
   description: z.string().min(10, "Description is required!"),
})
