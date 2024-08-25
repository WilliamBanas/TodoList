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

export const createTask = async (tableId: string, title: string, id: string, categoryId: string) => {
  return await prisma.task.create({ 
    data: {
      id: id,
      title: title,
      tableId: tableId,
      categoryId: categoryId
    }
  });
}
