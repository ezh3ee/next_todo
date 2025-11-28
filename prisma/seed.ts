import {Prisma, PrismaClient} from "../app/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'
// import prisma from "@/app/lib/prisma";

// const adapter = new PrismaPg({
//     connectionString: process.env.DATABASE_URL,
// })
//
// const prisma = new PrismaClient({
//     adapter,
// });

console.log('DATABASE_URL:', process.env.POSTGRES_URL?.slice(0, 30) + '...');

const adapter = new PrismaPg({
    connectionString: process.env.POSTGRES_URL,
});

const prisma = new PrismaClient({ adapter });

const tasksData: Prisma.TaskCreateInput[] = [
    {
        text: 'Задача из seed 1'
    },
    {
        text: 'Еще одна задача из сид 2'
    },
    {
        text: 'И третья'
    },
];

export async function main() {
    console.log('connectiong to db');

    for (const t of tasksData) {
        console.log(t);
        await prisma.task.create({ data: t });
    }
}

main().catch(e => {
    console.error('error:', e);
    process.exit(1);
})
    .finally(() => prisma.$disconnect());