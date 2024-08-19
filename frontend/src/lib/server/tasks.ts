import prisma from './prisma';

export const changeTaskCategory = async (id: string, categoryId: string) => {
	return await prisma.task.update({
		where: {
			id
		},
		data: {
			categoryId
		}
	});
};
