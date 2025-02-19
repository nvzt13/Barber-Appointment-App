import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth"; // Auth ayarlarının olduğu dosya
import { prisma } from "@/lib/prisma"; // Prisma client

// POST request handler
export async function POST(req: NextRequest) {
  // Kullanıcı doğrulama
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { customerId, barberId, date, time } = await req.json();

    // Gerekli alanların kontrolü
    if (!customerId || !barberId || !date || !time) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Randevuyu veritabanına kaydet
    const appointment = await prisma.appointment.create({
      data: {
        customerId,
        barberId,
        date: date,
        time,  // Burada 'time' kullanmalısınız, 'hour' değil
        status: "pending", // or any appropriate default status
      },
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
