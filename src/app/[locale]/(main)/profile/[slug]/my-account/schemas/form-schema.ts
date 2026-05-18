import { z } from "zod"

export const schema = z.object({
    fullName: z.string().min(1),
    email: z.string().email(),
    birthDate: z.string().optional(),
    gender: z.string().optional(),
    phone: z.string().optional(),
    avatar: z.union([z.string(), z.any()]).optional(),
})

export type FormValues = z.infer<typeof schema>
