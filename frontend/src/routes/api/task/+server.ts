import { json } from '@sveltejs/kit'
import type { RequestEvent } from './$types';
import { changeTaskCategory } from '$lib/server/tasks';

// CHANGE TASK CATEGORY ID
export async function PATCH(event: RequestEvent) {
  const { id , categoryId } = await event.request.json()
  const changedCategoryId = await changeTaskCategory(id, categoryId)

  return json({ changedCategoryId })
}