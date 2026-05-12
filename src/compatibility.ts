// src/compatibility.ts
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

// 1. قراءة المتغيرات البيئية
dotenv.config();

// 2. إعداد الاتصال بقاعدة البيانات عبر Adapter
const connectionString = process.env.DATABASE_URL as string;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export class CompatibilityEngine {
  public static checkSocket(cpuSpecs: any, moboSpecs: any): void {
    if (!cpuSpecs?.socket || !moboSpecs?.socket) {
      throw new Error('بيانات المقبس (Socket) مفقودة في إحدى القطع.');
    }

    if (cpuSpecs.socket !== moboSpecs.socket) {
      throw new Error(`عدم توافق: المعالج يتطلب ${cpuSpecs.socket} واللوحة تدعم ${moboSpecs.socket}.`);
    }
  }

  public static async runTest() {
    try {
      const cpu = await prisma.component.findFirst({ where: { name: 'Ryzen 7 9800X3D' } });
      const mobo = await prisma.component.findFirst({ where: { name: 'B650 AORUS ELITE AX' } });

      if (!cpu || !mobo) {
        throw new Error('لم يتم العثور على القطع المحددة في قاعدة البيانات.');
      }

      this.checkSocket(cpu.specs, mobo.specs);

      console.log('✅ النتيجة: القطع متوافقة تماماً.');
      console.log(`⚡ استهلاك الطاقة المبدئي للقطعتين (TDP): ${cpu.tdpWattage + mobo.tdpWattage} واط`);

    } catch (error: any) {
      console.error('❌ فشل التحقق:', error.message);
    } finally {
      await prisma.$disconnect();
    }
  }
}

console.log("=== بدء الفحص ===");
CompatibilityEngine.runTest().finally(() => process.exit(0));