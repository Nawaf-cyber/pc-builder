import { prisma } from "../../../lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
  const email = "admin@pcbuilder.com";
  const password = "YourSecurePassword2026"; // كلمة المرور الخاصة بك

  try {
    const existingAdmin = await prisma.user.findUnique({ where: { email } });
    
    if (existingAdmin) {
      return NextResponse.json({ message: "حساب المسؤول موجود مسبقاً في قاعدة البيانات." });
    }

    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
      data: {
        name: "Nawaf Admin",
        email: email,
        password: hashedPassword,
        role: "ADMIN"
      }
    });

    return NextResponse.json({ message: "تم إنشاء حساب المسؤول بنجاح وتشفير كلمة المرور." });
  } catch (error) {
    return NextResponse.json({ error: "حدث خطأ أثناء الإنشاء." }, { status: 500 });
  }
}