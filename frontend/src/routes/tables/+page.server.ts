import { lucia } from '$lib/server/auth';
import { fail, redirect, error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { getTables } from '$lib/server/tables';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
    const userId = event.locals.user.id;
    const tables = await getTables(userId);
		return { 
      tables,
      nickname: event.locals.user.nickname 
    };
	} else {
		redirect(302, '/login');
	}
};

export const actions: Actions = {
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await lucia.invalidateSession(event.locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		throw redirect(302, '/login');
	},
};

