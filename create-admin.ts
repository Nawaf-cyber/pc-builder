import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcrypt';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = 'admin@pcbuilder.com';
  const plainPassword = 'admin12345';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      name: 'Nawaf Admin',
      email,
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('تم إنشاء حساب المدير بنجاح.');
  console.log(`البريد الإلكتروني: ${admin.email}`);
  console.log(`كلمة المرور: ${plainPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });