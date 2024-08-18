import prisma from "./prisma";

export const deleteTask = async (id: string) => {
  return await prisma.task.delete({ where: { id } });
};

export const changeTaskCategory = async (id: string, categoryId: string) => {
  return await prisma.task.update({ where: { id }, data: { categoryId } });
};