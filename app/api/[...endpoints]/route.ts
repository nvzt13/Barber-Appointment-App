// /api/v1/barber
// /api/v1/barber/id
// /api/v1/barber/id?avaible-slots=true&day=01-03-2025

// /api/v1/appointment
// /api/v1/appointment/id

// /api/v1/user
// /api/v1/user/id

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";


export async function GET(req: NextRequest, context: { params: { endpoints: string[] } }) {
  const { params } = context; // context'ten params'ı alıyoruz
  const { endpoints } = params; // endpoints'i destructure ediyoruz
  
  const session = await auth();
  console.log(session?.user?.id + "-----------------");
  console.log(endpoints + "_______________");

  // Diğer işlemler...
  const [resource, id] = endpoints; // Dinamik route ile gelen değerleri alın

  return await handleGet(resource, id, req);
}

export async function handleGet(resource: string, id: string | undefined, req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const availableSlots = searchParams.get('available-slots');
  const day = searchParams.get('day');

  switch (resource) {
    case "barber":
      if (id) {
        if (availableSlots === 'true' && day) {
          const availableSlots = await prisma.slot.findMany({
            where: {
              barberId: id,
              day: new Date(day),
              isBooked: false, // Boş olan slotlar
            }
          });
          return NextResponse.json(availableSlots);
        } else {
          const barber = await prisma.barber.findFirst({ where: { id } });
          return NextResponse.json(barber);
        }
      }
      const barbers = await prisma.barber.findMany();
      return NextResponse.json(barbers);

    case "user":
      if (id) {
        // Belirtilen id'li kullanıcıyı döndür
        const user = await prisma.user.findFirst({ where: { id } });
        return NextResponse.json(user);
      }
      // Tüm kullanıcıları döndür
      const users = await prisma.user.findMany();
      return NextResponse.json(users);

    case "appointment":
      if (id) {
        // Belirtilen id'li randevuyu döndür
        const appointment = await prisma.appointment.findFirst({ where: { id } });
        return NextResponse.json(appointment);
      }
      // Tüm randevuları döndür
      const appointments = await prisma.appointment.findMany();
      return NextResponse.json(appointments);

    default:
      return NextResponse.json({ message: "Resource not found" }, { status: 404 });
  }
}




export async function POST(req: NextRequest, context: { params: { endpoints: string[] } }) {
  const { params } = context;
  const { endpoints } = await params;


  console.log(endpoints + "_______________");

  let data;
  try {
    data = await req.json(); // Request body'den JSON veriyi alıyoruz
    console.log(data + "-----------------")
  } catch (error) {
    console.error("Invalid JSON:", error);
    return new Response(JSON.stringify({ error: 'Invalid JSON payload' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!data || !data.name || !data.image) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const createBarber = await prisma.barber.create({
      data: {
        id: data.id,
        name: data.name,  // Gelen veriden berber ismi
        image: data.image,  // Gelen veriden resim
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      }
    });

    return new Response(JSON.stringify(createBarber), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Barber creation failed:", error instanceof Error ? error.message : error);
    return new Response(JSON.stringify({ error: 'Failed to create barber' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}