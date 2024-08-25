import { z } from "zod";

export const newTaskSchema = z.object({
  title: z.string().min(3, 'A valid title is required').max(50, 'Title can\'t be longer than 50 characters'),
  categoryId: z.string(),
  tableId: z.string(),
})