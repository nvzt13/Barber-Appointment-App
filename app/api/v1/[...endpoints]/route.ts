// /api/v1/barber            GET-POST
// /api/v1/barber/id         GET
// /api/v1/barber/id/blog-slots?day=2025-12-12

// /api/v1/appointment      GET-POST
// /api/v1/appointment/id

// /api/v1/user             GET
// /api/v1/user/id
// /api/v1/user/id/appointments  GET

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { HTTPMethotsProps, HandleHTTPMethodsProps } from "@/types/type";


export async function GET({ request }, { params }: HTTPMethotsProps) {
  const { endpoints } = await params;
  console.log(endpoints + "________-------------------------___________")  
  const session = await auth();

  if (!session || !session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return await handleGet({ endpoints, request, session });
}

export async function handleGet({
  endpoints,
  request,
}: HandleHTTPMethodsProps) {
  const id = endpoints[1];

  switch (endpoints[0]) {
    case "barber":
      if (id) {
        const barber = await prisma.barber.findFirst({ where: { id } });
        return NextResponse.json(barber);
      }

      const barbers = await prisma.barber.findMany();
      return NextResponse.json(barbers);

    case "user":
      const isWantedAppointment = endpoints[2]
      if (id && !isWantedAppointment) {
        const user = await prisma.user.findMany({ where: { id } });
        return NextResponse.json(user);
      }
      if(isWantedAppointment){
        const userAppointment = await prisma.appointment.findMany({where: {userId: id}})
        return NextResponse.json({message: "User appointment fetch succesfully!", data: userAppointment})
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












export async function POST(request: NextRequest, { params }: HTTPMethotsProps) {
  const { endpoints } = await params;
  const session = await auth();
  if (!session || !session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return await handlePost({ endpoints, request, session });
}

// ------------------- handlePost ----------------

export async function handlePost({
  endpoints,
  request,
  session
}: HandleHTTPMethodsProps) {

  const body = await request.json()
  switch (endpoints[0]) {
    case "barber":
      if (id) {
        return NextResponse.json(
          { message: "Not implemented" },
          { status: 501 }
        );
      }
      // Create new barber
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
      try {
        if ( !body.barberId || !body.date || !body.time) {
          return NextResponse.json(
            { message: "Missing required fields for appointment" },
            { status: 400 }
          );
        }
        const newAppointment = await prisma.appointment.create({
          data:{
            userId: body.userId,
            barberId: body.barberId,
            date: body.date,
            time: body.time
          }
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

