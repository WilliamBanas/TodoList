import { lucia } from '$lib/server/auth';
import { fail, redirect, error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { getTableData, getTags } from '$lib/server/tableData';
import { changeTaskCategory } from '$lib/server/tasks';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		const tableId = event.params.tableId;
		const categories = await getTableData(tableId);
    const tags = await getTags(tableId);
		if (!categories) {
			error(404, 'No category found');
		}
		return {
      tags,
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

	updateTaskCategory: async ({ request }) => {
		const data = await request.json();

		const { id, categoryId } = data;

		const changetaskCategory = await changeTaskCategory(id, categoryId);

		if (!changetaskCategory) {
			error(404, 'Changes not applied');
		}
	}
};