// https://github.com/prisma/prisma/issues/2584
import {PrismaClient} from '.prisma/client' // <-- import the dot generated folder, not @prisma/client
import {faker} from '@faker-js/faker';

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            name: faker.name.fullName(),
            email: faker.internet.email(),
            meta: {
                data1: faker.random.word(),
                data2: faker.random.word()
            },
        },
    })

    console.log(`inserted user with id: ${user.id}`);

    const users = await prisma.user.findMany()
    console.log(users);
}

main()
    .then(async () => {
        // await prisma.user.deleteMany();
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })