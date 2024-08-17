import { z } from 'zod';

export const loginSchema = z.object({
  nickname: z
    .string({ required_error: 'Nickname is required' })
    .trim(),
  password: z
    .string({ required_error: 'Password is required' })
    .trim()
})