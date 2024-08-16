import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { newUserSchema } from '../../../src/schemas/createUser';
import { fail } from '@sveltejs/kit';

export const load = async () => {
	const form = await superValidate(zod(newUserSchema));
	return { form };
};

export const actions = {
	createUser: async () => {
		const form = await superValidate(zod(newUserSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

    return { form }
	}
};
