import prisma  from "./prisma";

export const getCategories = async (userId: string) => {
  return await prisma.taskCategory.findMany({
    where: {
      userId
    },
    include: {
      task: {
        where: {
          userId
        }
      }
    }  
  });
}