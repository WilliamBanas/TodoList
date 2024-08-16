import { z } from 'zod';

export const newUserSchema = z.object({
	nickName: z
		.string({ required_error: 'Nickname is required' })
		.min(3, 'Nickname must be at least 3 characters long')
		.max(24, 'Nickname must be at most 24 characters long')
		.trim(),
	password: z
		.string({ required_error: 'Password is required' })
		.min(6, 'Password must be at least 6 characters long')
		.max(32, 'Password must be at most 24 characters long')
		.trim(),
	confirmPassword: z
		.string({ required_error: 'You must confirm password' })
		.min(6, 'Confirm password must be at least 6 characters long')
		.max(32, 'Confirm password must be at most 24 characters long')
		.trim()
});
