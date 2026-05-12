import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // مسح البيانات القديمة لتجنب التكرار
  await prisma.component.deleteMany({});
  await prisma.category.deleteMany({});

  // 1. إنشاء الفئات
  const catCPU = await prisma.category.create({ data: { name: 'CPU' } });
  const catMobo = await prisma.category.create({ data: { name: 'Motherboard' } });
  const catPSU = await prisma.category.create({ data: { name: 'PSU' } });
  const catRAM = await prisma.category.create({ data: { name: 'RAM' } });
  const catGPU = await prisma.category.create({ data: { name: 'GPU' } });
  const catStorage = await prisma.category.create({ data: { name: 'Storage' } });
  const catCase = await prisma.category.create({ data: { name: 'Case' } });

  // 2. إدخال القطع
  await prisma.component.createMany({
    data: [
      // CPU
      { categoryId: catCPU.id, brand: 'AMD', name: 'Ryzen 7 9800X3D', price: 449, tdpWattage: 120, specs: { socket: 'AM5' } },
      { categoryId: catCPU.id, brand: 'Intel', name: 'Core i7-14700K', price: 409, tdpWattage: 253, specs: { socket: 'LGA1700' } },
      
      // Motherboard
      { categoryId: catMobo.id, brand: 'ASUS', name: 'ROG STRIX B650E-F', price: 259, tdpWattage: 40, specs: { socket: 'AM5', formFactor: 'ATX', ramType: 'DDR5' } },
      { categoryId: catMobo.id, brand: 'MSI', name: 'MAG Z790 TOMAHAWK', price: 239, tdpWattage: 50, specs: { socket: 'LGA1700', formFactor: 'ATX', ramType: 'DDR5' } },
      
      // PSU
      { categoryId: catPSU.id, brand: 'Corsair', name: 'RM850 (2021)', price: 129, tdpWattage: 0, specs: { wattage: 850, formFactor: 'ATX' } },
      
      // GPU
      { categoryId: catGPU.id, brand: 'AMD', name: 'Radeon RX 9070', price: 599, tdpWattage: 275, specs: { lengthMm: 320 } },
      { categoryId: catGPU.id, brand: 'NVIDIA', name: 'RTX 4070 Ti SUPER', price: 799, tdpWattage: 285, specs: { lengthMm: 310 } },
      
      // RAM
      { categoryId: catRAM.id, brand: 'G.Skill', name: 'Trident Z5 Neo 32GB', price: 115, tdpWattage: 10, specs: { type: 'DDR5', speed: 6000 } },
      
      // Storage
      { categoryId: catStorage.id, brand: 'Samsung', name: '990 PRO 2TB', price: 169, tdpWattage: 8, specs: { type: 'NVMe Gen4' } },
      
      // Case
      { categoryId: catCase.id, brand: 'Lian Li', name: 'LANCOOL 216', price: 99, tdpWattage: 0, specs: { formFactor: 'ATX', maxGpuLength: 392 } },
    ]
  });

  console.log('✅ تم تحديث قاعدة البيانات بجميع القطع بنجاح.');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });