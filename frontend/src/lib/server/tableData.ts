import prisma  from "./prisma";

export const getTableData = async (tableId: string) => {
  return await prisma.taskCategory.findMany({
    where: {
      tableId,
    },
    include: {
      task: {
        include: {
          tag_Task: true
        }
      }
    }
  });
}

export const getTags = async (tableId: string) => {
  return await prisma.tag.findMany({
    where: {
      tableId
    }
  })
}
