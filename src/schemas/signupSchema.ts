import { z } from "zod";

export const usernameValidation = z.string()
.min(2,"usrname must be alteast 2 characters")
.max(20, " username must be no more than 20 characters")
.regex(/^[a-zA-Z0-9]+$/, "username must not contain special characters")


export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "invalid email address"}),
    passward: z.string().min(6,{message : "passward must be alteast 6 characters"})

})