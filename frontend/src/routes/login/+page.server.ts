import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { lucia } from '$lib/lucia';
import { loginSchema } from '../../schemas/login';

export const load = async (request: Request) => {
	const form = await superValidate(request, zod(loginSchema));
	return { form };
};

export const actions: Actions = {
	default: async ({request, cookies}) => {
		const form = await superValidate(request, zod(loginSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const user = await prisma.user.findUnique({
				where: {
					nickname: form.data.nickname
				}
			});

			if (!user) {
				return fail(400, { form, error: 'Invalid credentials' });
			}

			const validPassword = await new Argon2id().verify(user.password, form.data.password);
			if (!validPassword) {
				return fail(400, { form, message: 'Incorrect username or password' });
			}

			const session = await lucia.createSession(user.id, []);
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
			redirect(302, '/');
		} catch (error) {
			return fail(500, { error });
		}
	}
};
