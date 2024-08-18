import { lucia } from '$lib/server/auth';
import { fail, redirect, error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { getCategories } from '$lib/server/categories';
import { deleteTask, changeTaskCategory } from '$lib/server/tasks';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		const userId = event.locals.user.id;
		const categories = await getCategories(userId);

		if (!categories) {
			error(404, 'No category found');
		}

		return {
			categories,
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

	// deleteTask: async (event) => {
	// 	return await prisma.task.delete({ where: { id } });
	// },

	changeTaskCategory: async (event) => {
    const formData = await event.request.json();
    const { id, categoryId } = formData;
		return await prisma.task.update({ where: { id }, data: { categoryId } });
	}
};
