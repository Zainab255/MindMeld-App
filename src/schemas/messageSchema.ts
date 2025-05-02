import { z } from "zod";

export const messageSchema  = z.object({
  content: z.string()
  .min(10,{message: "content must be at least of 10 characters"})
  .max(300,{message:"content must not be longer than 300 character"})

})