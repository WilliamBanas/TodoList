import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	console.log(`Start seeding ...`);

	const user1 = await prisma.user.upsert({
    where: { nickname: 'John' },
    update: {},
		create: {
			id: 1,
			nickname: 'John',
			password: 'password'
		}
	});
	const user2 = await prisma.user.upsert({
    where: { nickname: 'Jane' },
    update: {},
		create: {
			id: 2,
			nickname: 'Jane',
			password: 'password'
		}
	});

	const category1 = await prisma.taskCategory.upsert({
    where: { id: 1 },
    update: {},
		create: {
			id: 1,
			name: 'Todo',
			userId: 1
		}
	});
	const category2 = await prisma.taskCategory.upsert({
    where: { id: 2 },
    update: {},
		create: {
			id: 2,
			name: 'Doing',
			userId: 1
		}
	});
	const category3 = await prisma.taskCategory.upsert({
    where: { id: 3 },
    update: {},
		create: {
			id: 3,
			name: 'Done',
			userId: 1
		}
	});

	const category4 = await prisma.taskCategory.upsert({
    where: { id: 4 },
    update: {},
		create: {
			id: 4,
			name: 'Todo',
			userId: 2
		}
	});
	const category5 = await prisma.taskCategory.upsert({
    where: { id: 5 },
    update: {},
		create: {
			id: 5,
			name: 'Doing',
			userId: 2
		}
	});
	const category6 = await prisma.taskCategory.upsert({
    where: { id: 6 },
    update: {},
		create: {
			id: 6,
			name: 'Done',
			userId: 2
		}
	});

	const task1 = await prisma.task.upsert({
    where: { id: 1 },
    update: {},
		create: {
			id: 1,
			title: 'Getting a job',
			description: 'The goal is to get a job.',
			userId: 1,
			categoryId: 1
		}
	});
	const task2 = await prisma.task.upsert({
    where: { id: 2 },
    update: {},
		create: {
			id: 2,
			title: 'Get some sleep',
			description: 'The goal is to get some sleep.',
			userId: 1,
			categoryId: 1
		}
	});
	const task3 = await prisma.task.upsert({
    where: { id: 3 },
    update: {},
		create: {
			id: 3,
			title: 'Go to Walmart',
			description: 'The goal is to go to Walmart.',
			userId: 1,
			categoryId: 1
		}
	});

	const task4 = await prisma.task.upsert({
    where: { id: 4 },
    update: {},
		create: {
			id: 4,
			title: 'Go to work',
			description: 'The goal is to go to work.',
			userId: 2,
			categoryId: 1
		}
	});
	const task5 = await prisma.task.upsert({
    where: { id: 5 },
    update: {},
		create: {
			id: 5,
			title: 'Go to school',
			description: 'The goal is to go to school.',
			userId: 2,
			categoryId: 1
		}
	});
	const task6 = await prisma.task.upsert({
    where: { id: 6 },
    update: {},
		create: {
			id: 6,
			title: 'Go to sleep',
			description: 'The goal is to go to sleep.',
			userId: 2,
			categoryId: 1
		}
	});

	console.log(`Seeding finished.`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
