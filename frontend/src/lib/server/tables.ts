import prisma  from "./prisma";

export const getTables  = async (userId: string) => {
  return await prisma.table.findMany({
    where: {
      userId: userId
    }
  });
}