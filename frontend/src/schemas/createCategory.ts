import { z } from "zod";

export const newCategorySchema = z.object({
  name: z.string().max(50, "Name can't be longer than 50 characters").trim(),
})