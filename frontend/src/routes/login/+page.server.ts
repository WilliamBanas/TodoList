import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import { Argon2id } from 'oslo/password';
import { lucia } from '$lib/server/auth';
import { loginSchema } from '../../schemas/login';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user) {
    const form = await superValidate(event, zod(loginSchema));
		return { form };
	} else {
		redirect(302, '/');
	}
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(loginSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

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

		throw redirect(303, '/');
	}
};
