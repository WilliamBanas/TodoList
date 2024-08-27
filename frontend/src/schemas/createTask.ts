import { z } from "zod";

export const newTaskSchema = z.object({
  title: z.string().max(50, 'Title can\'t be longer than 50 characters'),
  categoryId: z.string(),
  tableId: z.string(),
})