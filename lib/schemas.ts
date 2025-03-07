import {z} from 'zod'

export const loginSchema = z.object({
    username: z.string().min(4, {
        message: "Username must be atleast 4 characters long"
    }).max(20, {
        message: "Username must be less than 20 characters long"
    }),
    email: z.string().email({
        message: "Invalid email format"
    }),
    password: z.string().min(6, {
        message: "Password must be atleast 6 characters long"
    }).max(12, {
        message: "Password must be less than 12 characters long"
    })
})