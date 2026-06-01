import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { clerk_id: "admin_seed" },
    update: {},
    create: {
      clerk_id: "admin_seed",
      name: "Admin",
      email: "admin@taxitrio.com",
      role: "admin",
    },
  });
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
