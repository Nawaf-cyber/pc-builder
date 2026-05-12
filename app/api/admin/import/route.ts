import { NextResponse } from 'next/server';
import { prisma } from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    for (const item of data) {
      const category = await prisma.category.findFirst({
        where: { name: item.categoryName }
      });

      if (category) {
        let parsedSpecs = {};
        if (item.specs) {
          try { parsedSpecs = typeof item.specs === 'string' ? JSON.parse(item.specs) : item.specs; } 
          catch (e) { parsedSpecs = {}; }
        }

        await prisma.component.create({
          data: {
            categoryId: category.id,
            brand: item.brand || "غير محدد",
            name: item.name,
            price: parseFloat(item.price) || 0,
            tdpWattage: parseInt(item.tdpWattage) || 0,
            specs: parsedSpecs,
            imageUrl: item.imageUrl || null,
            amazonUrl: item.amazonUrl || null,
            cazasouqUrl: item.cazasouqUrl || null,
          }
        });
      }
    }

    return NextResponse.json({ message: "تم رفع جميع القطع بنجاح" });
  } catch (error) {
    return NextResponse.json({ error: "حدث خطأ أثناء الرفع المجمع" }, { status: 500 });
  }
}