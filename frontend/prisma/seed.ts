import { PrismaClient } from '@prisma/client';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';

const prisma = new PrismaClient();

const user1Id = generateId(15);
const user2Id = generateId(15);

const table1Id = generateId(15);
const table2Id = generateId(15);

const tag1Id = generateId(15);
const tag2Id = generateId(15);
const tag3Id = generateId(15);
const tag4Id = generateId(15);
const tag5Id = generateId(15);
const tag6Id = generateId(15);
const tag7Id = generateId(15);
const tag8Id = generateId(15);
const tag9Id = generateId(15);
const tag10Id = generateId(15);

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

const tag_task1Id = generateId(15);
const tag_task2Id = generateId(15);
const tag_task3Id = generateId(15);
const tag_task4Id = generateId(15);
const tag_task5Id = generateId(15);
const tag_task6Id = generateId(15);


const user1Password = await new Argon2id().hash('password');
const user2Password = await new Argon2id().hash('password');

async function main() {
	console.log(`Start seeding ...`);
	console.log('Seeding users...');

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

	console.log('Seeding tables...');

	const table1 = await prisma.table.create({
		data: {
			id: table1Id,
			title: 'Table 1',
			favorite: false,
			userId: user1Id
		}
	});

	const table2 = await prisma.table.create({
		data: {
			id: table2Id,
			title: 'Table 2',
			favorite: false,
			userId: user2Id
		}
	});

	console.log('Seeding tags...');

	const tag1 = await prisma.tag.create({
		data: {
			id: tag1Id,
			name: 'Homework',
			color: 'sky-700',
			tableId: table1Id
		}
	});

	const tag2 = await prisma.tag.create({
		data: {
			id: tag2Id,
			name: 'Work',
			color: 'green-700',
			tableId: table1Id
		}
	});

	const tag3 = await prisma.tag.create({
		data: {
			id: tag3Id,
			name: 'Personal',
			color: 'purple-700',
			tableId: table1Id
		}
	});

	const tag4 = await prisma.tag.create({
		data: {
			id: tag4Id,
			name: 'Sport',
			color: 'teal-700',
			tableId: table1Id
		}
	});

	const tag5 = await prisma.tag.create({
		data: {
			id: tag5Id,
			name: 'Frontend',
			color: 'indigo-700',
			tableId: table1Id
		}
	});

	const tag6 = await prisma.tag.create({
		data: {
			id: tag6Id,
			name: 'Backend',
			color: 'red-700',
			tableId: table1Id
		}
	});

	const tag7 = await prisma.tag.create({
		data: {
			id: tag7Id,
			name: 'Testing',
			color: 'yellow-700',
			tableId: table1Id
		}
	});

	const tag8 = await prisma.tag.create({
		data: {
			id: tag8Id,
			name: 'Design',
			color: 'pink-700',
			tableId: table1Id
		}
	});

	const tag9 = await prisma.tag.create({
		data: {
			id: tag9Id,
			name: 'Management',
			color: 'orange-700',
			tableId: table1Id
		}
	});

	const tag10 = await prisma.tag.create({
		data: {
			id: tag10Id,
			name: 'Cooking',
			color: 'zinc-700 ',
			tableId: table1Id
		}
	});

	console.log('Seeding task categories...');

	const category1 = await prisma.taskCategory.create({
		data: {
			id: category1Id,
			name: 'Todo',
			userId: user1Id,
      tableId: table1Id
		}
	});
	const category2 = await prisma.taskCategory.create({
		data: {
			id: category2Id,
			name: 'Doing',
			userId: user1Id,
      tableId: table1Id
		}
	});
	const category3 = await prisma.taskCategory.create({
		data: {
			id: category3Id,
			name: 'Done',
			userId: user1Id,
      tableId: table1Id,
		}
	});

	const category4 = await prisma.taskCategory.create({
		data: {
			id: category4Id,
			name: 'Todo',
			userId: user2Id,
      tableId: table2Id
		}
	});
	const category5 = await prisma.taskCategory.create({
		data: {
			id: category5Id,
			name: 'Doing',
			userId: user2Id,
      tableId: table2Id
		}
	});
	const category6 = await prisma.taskCategory.create({
		data: {
			id: category6Id,
			name: 'Done',
			userId: user2Id,
      tableId: table2Id

		}
	});

	console.log('Seeding tasks...');

	const task1 = await prisma.task.create({
		data: {
			id: task1Id,
			title: 'Getting a job',
			description: 'The goal is to get a job.',
			endAt: '25/12/2024',
			links: ['https://github.com/', 'https://chatgpt.com/', 'https://developer.mozilla.org/fr/'],
			categoryId: category1Id,
      tableId: table1Id
		}
	});
	const task2 = await prisma.task.create({
		data: {
			id: task2Id,
			title: 'Get some sleep',
			description: 'The goal is to get some sleep.',
			endAt: '25/12/2024',
			links: ['https://github.com/', 'https://chatgpt.com/', 'https://developer.mozilla.org/fr/'],
			categoryId: category1Id,
      tableId: table1Id
		}
	});
	const task3 = await prisma.task.create({
		data: {
			id: task3Id,
			title: 'Go to Walmart',
			description: 'The goal is to go to Walmart.',
			endAt: '25/12/2024',
			links: ['https://github.com/', 'https://chatgpt.com/', 'https://developer.mozilla.org/fr/'],
			categoryId: category1Id,
      tableId: table1Id
		}
	});

	const task4 = await prisma.task.create({
		data: {
			id: task4Id,
			title: 'Go to work',
			description: 'The goal is to go to work.',
			endAt: '25/12/2024',
			links: ['https://github.com/', 'https://chatgpt.com/', 'https://developer.mozilla.org/fr/'],
			categoryId: category1Id,
      tableId: table1Id
		}
	});
	const task5 = await prisma.task.create({
		data: {
			id: task5Id,
			title: 'Go to school',
			description: 'The goal is to go to school.',
			endAt: '25/12/2024',
			links: ['https://github.com/', 'https://chatgpt.com/', 'https://developer.mozilla.org/fr/'],
			categoryId: category4Id,
      tableId: table2Id
		}
	});
	const task6 = await prisma.task.create({
		data: {
			id: task6Id,
			title: 'Go to sleep',
			description: 'The goal is to go to sleep.',
			endAt: '25/12/2024',
			links: ['https://github.com/', 'https://chatgpt.com/', 'https://developer.mozilla.org/fr/'],
			categoryId: category4Id,
      tableId: table2Id
		}
	});

  console.log('Seeding task_tags...');

	const taskTag1 = await prisma.tag_Task.create({
		data: {
			id: tag_task1Id,
			tagId: tag1Id,
			taskId: task1Id
		}
	});

	const taskTag2 = await prisma.tag_Task.create({
		data: {
			id: tag_task2Id,
			tagId: tag2Id,
			taskId: task1Id
		}
	});

	const taskTag3 = await prisma.tag_Task.create({
		data: {
			id: tag_task3Id,
			tagId: tag3Id,
			taskId: task2Id
		}
	});

	const taskTag4 = await prisma.tag_Task.create({
		data: {
			id: tag_task4Id,
			tagId: tag4Id,
			taskId: task2Id
		}
	});

	const taskTag5 = await prisma.tag_Task.create({
		data: {
			id: tag_task5Id,
			tagId: tag5Id,
			taskId: task3Id
		}
	});

	const taskTag6 = await prisma.tag_Task.create({
		data: {
			id: tag_task6Id,
			tagId: tag6Id,
			taskId: task4Id
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
