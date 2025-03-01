// /api/v1/barber
// /api/v1/barber/id
// /api/v1/barber/id?avaible-slots=true&day=01-03-2025

// /api/v1/appointment
// /api/v1/appointment/id

// /api/v1/user
// /api/v1/user/id


import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(req: NextRequest, res: NextResponse, { params }: { params: { endpoints: string[] } }) {
  const session = await auth();
  console.log(session?.user?.id + "-----------------")

  const { endpoints } = params;
  const [resource, id] = endpoints;

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
          // Belirtilen id'li berber için, belirtilen günün müsait saatlerini döndür
          const availableSlots = await prisma.slot.findMany({
            where: {
              barberId: id,
              day: new Date(day),
              isBooked: false, // Boş olan slotlar
            }
          });
          return NextResponse.json(availableSlots);
        } else {
          // Belirtilen id'li berberin bilgilerini döndür
          const barber = await prisma.barber.findFirst({ where: { id } });
          return NextResponse.json(barber);
        }
      }
      // Tüm berberleri döndür
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