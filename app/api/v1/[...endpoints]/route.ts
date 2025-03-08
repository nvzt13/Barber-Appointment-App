// /api/v1/barber            GET-POST
// /api/v1/barber/id         GET
// /api/v1/barber/id/date

// /api/v1/appointment      GET-POST
// /api/v1/appointment/id

// /api/v1/user             GET
// /api/v1/user/id
// /api/v1/user/id/appointments  GET

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { HTTPMethotsProps, HandleHTTPMethodsProps } from "@/types/type";

// GET
export async function GET({ request }, { params }: HTTPMethotsProps) {
  const { endpoints } = await params;
  const session = await auth();

  if (!session || !session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return await handleGet({ endpoints, request, session });
}
// POST
export async function POST(request: NextRequest, { params }: HTTPMethotsProps) {
  const { endpoints } = await params;
  const session = await auth();
  if (!session || !session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  return await handlePost({ endpoints, request, session });
}
// DELETE
export async function DELETE({ request }, { params }: HTTPMethotsProps) {
  const { endpoints } = await params;
  const session = await auth()
  if (!session || !session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return await handleDelete({ endpoints, request, session });
}
// PUT
export async function PUT( request , { params }) {
  const session = await auth()
  const { endpoints } = await params;
  if (!session || !session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return await handlePut({ endpoints, request, session });
}


// handleGet
export async function handleGet({
  endpoints,
}: HandleHTTPMethodsProps) {
  // item = date or appointment
  const [table, id, item] = endpoints;
  switch (table) {
    case "barber":
      if (id && item) {
    const appointments = await prisma.appointment.findMany({
      where: {
        barberId: id,
        date: new Date(item),
      },
      select: {
        time: true,
      },
    });

    return NextResponse.json(appointments.map(appointment => appointment.time));
  } 
      const barbers = await prisma.barber.findMany();
      return NextResponse.json(barbers);

    case "user":
      const admin = await prisma.user.findFirst({where:{id, role:"ADMIN"}})
       //  api/v1/user/id/appointment   admin değilse userın randevularını dön    
      if(item && !admin){
        const userAppointment = await prisma.appointment.findMany({where: {userId: id}})
        return NextResponse.json({message: "User appointment fetch succesfully!", data: userAppointment})
      }
        // /api/user/id/appointment    admin ise bütün randevuları dön
      else if(item && admin){
        const allAppointments = await prisma.appointment.findMany()
        return NextResponse.json({message: "All appointment fetch succesfully!", data: allAppointments})
      }
      // api/v1/user/id   admin mi? 
      else if(!item && id){
        return NextResponse.json({ isAdmin: !!admin });
      }
      //    /api/v1/user  tüm userları dön
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
// handlePost
export async function handlePost({
  endpoints,
  request,
  session
}: HandleHTTPMethodsProps) {
  
  const id = endpoints[1]
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
        console.log(error)
        return NextResponse.json(
          { message: "Failed to create barber" },
          { status: 500 },
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
            userName: session?.user?.name,
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
// handleDelete
export async function handleDelete({
  endpoints,
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
      
    case "appointment":
      if (id) {
        const appointment = await prisma.appointment.delete({
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
// handlePUt
export async function handlePut({
  endpoints,
  request,
}: HandleHTTPMethodsProps) {
  const id = endpoints[1];
  const body = await request.json();
console.log(body);
switch (endpoints[0]) {
  case "appointment":
    if(!id || !body.userId || !body.barberId || !body.date || !body.time){
      return NextResponse.json({message:"Bad request!"}, {status:400})
    }
    try {
        const willBeUpdatedAppointment = await prisma.appointment.update({
          where: { id },  // id ile güncellenecek kaydı buluyoruz
          data: {
            ...body,  // Güncellenecek verileri body'den alıyoruz
          },
        });
        return NextResponse.json(willBeUpdatedAppointment);
    } catch (error) {
      console.log(error);
    }
    break;

    default:
      return NextResponse.json(
        { message: "Resource not found" },
        { status: 404 }
      );
  }
}
