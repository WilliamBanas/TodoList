import { lucia } from '$lib/server/auth';
import { fail, redirect, error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { getCategories, getTags, getTasks } from '$lib/server/tableData';
import { changeTaskCategory, createTask } from '$lib/server/tasks';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { newTaskSchema } from '../../../schemas/createTask';
import { generateId } from 'lucia';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		const tableId = event.params.tableId;
		const categories = await getCategories(tableId);
    const tags = await getTags(tableId);
    const tasks = await getTasks(tableId);
    const form = await superValidate(event, zod(newTaskSchema))
		if (!categories) {
			error(404, 'No category found');
		}
		return {
      form,
      tableId,
      tasks,
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
	},

  createTask: async ({request}) => {
    const form = await superValidate(request, zod(newTaskSchema));

    if (!form.valid) {
			return fail(400, { form });
		}

    const tableId = form.data.tableId;
    const title = form.data.title;
    const categoryId = form.data.categoryId;
    const id = generateId(15);

    const createNewTask = await createTask(tableId, title, id, categoryId);

    if (!createNewTask) {
      error(404, 'Task not created');
    }
  }
};