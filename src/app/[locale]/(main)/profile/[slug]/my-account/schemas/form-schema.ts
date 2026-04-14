import { z } from "zod"

export const schema = z.object({
    name: z.string().min(1),
    email: z.string().email().optional().or(z.literal("")),
    birthDate: z.string().optional(),
    gender: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    avatar: z.string().optional(),
})

export type FormValues = z.infer<typeof schema>
