import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Invalid email address"
    }),
    password: z.string().min(6, { message: "password must be at least 6 characters" })
        // .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).+$/, { message: "Password must contain at least one uppercase letter, one special character, and one or more numbers" })
})

export const registerSchema = z.object({
    email: z.string().email({
        message: "Invalid email address"
    }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" })
        .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).+$/, { message: "Password must contain at least one uppercase letter, one special character, and one or more numbers" }),
    role: z.enum(["team-member", "admin"], {
        message: "Role must be either 'team-member' or 'admin'"
    })
});

export const productSchema = z.object({
    id: z.string(),
    _id: z.string(),
    image: z.string().url("Please provide a valid image URL"),
    productName: z.string().min(1, "Product name is required"),
    productDescription: z.string().min(1, "Product description is required"),
    department: z.string().min(1, "Department is required"),
    price: z.string()
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
            message: "Enter a valid number greater than 0 for the product price",
        }),
});
