import prisma from './prisma';

export const getCategories = async (tableId: string) => {
	return await prisma.taskCategory.findMany({
		where: {
			tableId
		},
	});
};

export const getTags = async (tableId: string) => {
	return await prisma.tag.findMany({
		where: {
			tableId
		}
	});
};

export const getTasks = async (tableId: string) => {
  return await prisma.task.findMany({
    where: {
      tableId
    },
    include: {
      tag_Task: true
    }
  });
};
