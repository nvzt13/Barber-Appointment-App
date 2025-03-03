// /api/v1/barber            GET-POST
// /api/v1/barber/id         GET
// /api/v1/barber/id/blog-slots?day=2025-12-12

// /api/v1/appointment      GET-POST
// /api/v1/appointment/id

// /api/v1/user             GET
// /api/v1/user/id
// /api/v1/user/id/appointments

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { HTTPMethotsProps, HandleHTTPMethodsProps } from "@/types/type";
import { Appointment } from "@prisma/client";

export async function POST(request: NextRequest, { params }: HTTPMethotsProps) {
  const { endpoints } = await params;
  const session = await auth();
  if (!session || !session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const [resource, id] = endpoints;
  const body = await request.json() ;
  return await handlePost({ resource, id, request, body });
}

// ------------------- handlePost ----------------

export async function handlePost({
  resource,
  id,
  request,
  body,
}: HandleHTTPMethodsProps) {
  switch (resource) {
    case "barber":
      if (id) {
        return NextResponse.json(
          { message: "Not implemented" },
          { status: 501 }
        );
      }
      // Create new barber
      console.log(body + "___________________-");
      if (!body.id || !body.name || !body.image || !body.createdAt) {
        return NextResponse.json(
          { message: "Missing required fields for appointment" },
          { status: 400 }
        );
      }
      try {
        const newBarber = await prisma.barber.create({
          data: body,
        });
        return NextResponse.json(newBarber);
      } catch (error) {
        return NextResponse.json(
          { message: "Failed to create barber" },
          { status: 500 }
        );
      }

    case "appointment":
      console.log(body.barberId, body.userId, body.date, body.time +  "-------------------")
      try {
        if (!body.barberId || !body.userId || !body.date || !body.time) {
          return NextResponse.json(
            { message: "Missing required fields for appointment" },
            { status: 400 }
          );
        }

        const newAppointment = await prisma.appointment.create({
          data:body
        });
        return NextResponse.json(newAppointment);
      } catch (error) {
        console.error("Appointment creation error:", error);
        return NextResponse.json(
          { message: "Failed to create appointment", error: error.message },
          { status: 500 }
        );
      }
  }
}

// -------------------------------------------------------------
// ----------------------------- GET ---------------------------
// -------------------------------------------------------------

export async function GET({ request }, { params }: HTTPMethotsProps) {
  const { endpoints } = await params;

  const session = await auth();

  if (!session || !session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const [resource, id] = endpoints;

  return await handleGet({ resource, id, request });
}

export async function handleGet({
  resource,
  id,
  request,
}: HandleHTTPMethodsProps) {
  switch (resource) {
    case "barber":
      if (id) {
        const barber = await prisma.barber.findFirst({ where: { id } });
        return NextResponse.json(barber);
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
        const appointment = await prisma.appointment.findFirst({
          where: { id },
        });
        return NextResponse.json(appointment);
      }
      // Tüm randevuları döndür
      const appointments = await prisma.appointment.findMany();
      return NextResponse.json(appointments);

    default:
      return NextResponse.json(
        { message: "Resource not found" },
        { status: 404 }
      );
  }
}
