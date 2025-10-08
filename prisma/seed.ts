import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: {
      email: "admin@testando.com",
    },
    update: {},
    create: {
      email: "admin@testando.com",
      password: "senha_teste",
      roles: "admin",
    },
  });
}

main()
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
