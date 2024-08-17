import { PrismaClient } from '@prisma/client';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';

const prisma = new PrismaClient();

const user1Id = generateId(15);
const user2Id = generateId(15);

const category1Id = generateId(15);
const category2Id = generateId(15);
const category3Id = generateId(15); 
const category4Id = generateId(15);
const category5Id = generateId(15);
const category6Id = generateId(15);

const task1Id = generateId(15);
const task2Id = generateId(15);
const task3Id = generateId(15);
const task4Id = generateId(15);
const task5Id = generateId(15);
const task6Id = generateId(15);

const user1Password = await new Argon2id().hash('password');
const user2Password = await new Argon2id().hash('password');

async function main() {
	console.log(`Start seeding ...`);
console.log(user1Id);

	const user1 = await prisma.user.create({
   data: {
			id: user1Id,
			nickname: 'John',
			password: user1Password
		}
	});
	const user2 = await prisma.user.create({
    data: {
			id: user2Id,
			nickname: 'Jane',
			password: user2Password
		}
	});

	const category1 = await prisma.taskCategory.create({
    data: {
			id: category1Id,
			name: 'Todo',
			userId: user1Id
		}
	});
	const category2 = await prisma.taskCategory.create({
    data: {
			id: category2Id,
			name: 'Doing',
			userId: user1Id
		}
	});
	const category3 = await prisma.taskCategory.create({
    data: {
			id: category3Id,
			name: 'Done',
			userId: user1Id
		}
	});

	const category4 = await prisma.taskCategory.create({
    data: {
			id: category4Id,
			name: 'Todo',
			userId: user2Id
		}
	});
	const category5 = await prisma.taskCategory.create({
    data: {
			id: category5Id,
			name: 'Doing',
			userId: user2Id
		}
	});
	const category6 = await prisma.taskCategory.create({
   data: {
			id: category6Id,
			name: 'Done',
			userId: user2Id
		}
	});

	const task1 = await prisma.task.create({
    data: {
			id: task1Id,
			title: 'Getting a job',
			description: 'The goal is to get a job.',
			userId: user1Id,
			categoryId: category1Id
		}
	});
	const task2 = await prisma.task.create({
    data: {
			id: task2Id,
			title: 'Get some sleep',
			description: 'The goal is to get some sleep.',
			userId: user1Id,
			categoryId: category1Id
		}
	});
	const task3 = await prisma.task.create({
    data: {
			id: task3Id,
			title: 'Go to Walmart',
			description: 'The goal is to go to Walmart.',
			userId: user1Id,
			categoryId: category1Id
		}
	});

	const task4 = await prisma.task.create({
    data: {
			id: task4Id,
			title: 'Go to work',
			description: 'The goal is to go to work.',
			userId: user2Id,
			categoryId: category1Id
		}
	});
	const task5 = await prisma.task.create({
    data: {
			id: task5Id,
			title: 'Go to school',
			description: 'The goal is to go to school.',
			userId: user2Id,
			categoryId: category1Id
		}
	});
	const task6 = await prisma.task.create({
    data: {
			id: task6Id,
			title: 'Go to sleep',
			description: 'The goal is to go to sleep.',
			userId: user2Id,
			categoryId: category1Id
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
