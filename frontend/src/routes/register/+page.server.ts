import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { newUserSchema } from '../../schemas/createUser';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { lucia } from '$lib/lucia';

export const load = async (request: Request) => {
	const form = await superValidate(request, zod(newUserSchema));
	return { form };
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(newUserSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const existingUser = await prisma.user.findFirst({
				where: {
					nickname: form.data.nickname
				}
			});

			if (existingUser) {
				return fail(409, {
					form,
					error: 'User already exists'
				});
			}

			const userId = generateId(15);
			const hashedPassword = await new Argon2id().hash(form.data.password);
			const user = await prisma.user.create({
				data: {
					id: userId,
					nickname: form.data.nickname,
					password: hashedPassword
				}
			});

			const session = await lucia.createSession(user.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
			throw redirect(302, '/login');
		} catch (error: any) {
			return fail(500, { error: error.message });
		}
	}
};
