import { z } from "zod";

export const signInSchema  = z.object({
   identifier: z.string(),
   passward : z.string()

})