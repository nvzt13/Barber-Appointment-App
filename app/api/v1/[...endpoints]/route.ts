import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

// GET
export async function GET(request: NextRequest, { params }: { params: Promise<{ endpoints: string }> }) {
  const { endpoints } = await params;
  const session = await auth();

  if (!session || !session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const [table, id, item] = endpoints;

  switch (table) {
    case "barber":
      if (id && item) {
        const appointments = await prisma.appointment.findMany({
          where: { barberId: id, date: new Date(item) },
          select: { time: true },
        });
        return NextResponse.json(appointments.map((appointment) => appointment.time));
      }
      const barbers = await prisma.barber.findMany();
      return NextResponse.json(barbers);

    case "user":
      const admin = await prisma.user.findFirst({ where: { id, role: "ADMIN" } });
      if (item && !admin) {
        const userAppointment = await prisma.appointment.findMany({ where: { userId: id } });
        return NextResponse.json({
          message: "User appointment fetch successfully!",
          data: userAppointment,
        });
      } else if (item && admin) {
        const allAppointments = await prisma.appointment.findMany();
        return NextResponse.json({
          message: "All appointments fetched successfully!",
          data: allAppointments,
        });
      } else if (!item && id) {
        return NextResponse.json({ isAdmin: !!admin });
      }
      const users = await prisma.user.findMany();
      return NextResponse.json(users);

    case "appointment":
      if (id) {
        const appointment = await prisma.appointment.findFirst({ where: { id } });
        return NextResponse.json(appointment);
      }
      const appointments = await prisma.appointment.findMany();
      return NextResponse.json(appointments);

    default:
      return NextResponse.json({ message: "Resource not found" }, { status: 404 });
  }
}

// POST
export async function POST(request: NextRequest,  { params }: { params: Promise<{ endpoints: string }> }) {
  const { endpoints } = await params;
  const session = await auth();

  if (!session || !session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const [table] = endpoints;
  const body = await request.json();

  switch (table) {
    case "barber":
      if (!body.id || !body.name || !body.image || !body.createdAt) {
        return NextResponse.json({ message: "Missing required fields for barber" }, { status: 400 });
      }
      try {
        const newBarber = await prisma.barber.create({ data: body });
        return NextResponse.json(newBarber);
      } catch (error) {
        return NextResponse.json({ message: "Failed to create barber", error: error.message }, { status: 500 });
      }

    case "appointment":
      if (!body.barberId || !body.date || !body.time) {
        return NextResponse.json({ message: "Missing required fields for appointment" }, { status: 400 });
      }
      try {
        const newAppointment = await prisma.appointment.create({
          data: {
            userId: body.userId,
            barberId: body.barberId,
            userName: session?.user?.name,
            date: body.date,
            time: body.time
          }
        });
        return NextResponse.json(newAppointment);
      } catch (error) {
        return NextResponse.json({ message: "Failed to create appointment", error: error.message }, { status: 500 });
      }

    default:
      return NextResponse.json({ message: "Resource not found" }, { status: 404 });
  }
}

// DELETE
export async function DELETE(request: NextRequest,  { params }: { params: Promise<{ endpoints: string }> }) {
  const { endpoints } = await params;
  const session = await auth();
  console.log(request)
  if (!session || !session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const [table, id] = endpoints;

  switch (table) {
    case "barber":
      if (id) {
        const barber = await prisma.barber.findFirst({ where: { id } });
        return NextResponse.json(barber);
      }
      const barbers = await prisma.barber.findMany();
      return NextResponse.json(barbers);

    case "appointment":
      if (id) {
        const appointment = await prisma.appointment.delete({ where: { id } });
        return NextResponse.json(appointment);
      }
      const appointments = await prisma.appointment.findMany();
      return NextResponse.json(appointments);

    default:
      return NextResponse.json({ message: "Resource not found" }, { status: 404 });
  }
}

// PUT
export async function PUT(request: NextRequest,  { params }: { params: Promise<{ endpoints: string }> }) {
  const { endpoints } = await params;
  const session = await auth();

  if (!session || !session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const [table, id] = endpoints;
  const body = await request.json();

  switch (table) {
    case "appointment":
      if (!id || !body.userId || !body.barberId || !body.date || !body.time) {
        return NextResponse.json({ message: "Bad request!" }, { status: 400 });
      }
      try {
        const updatedAppointment = await prisma.appointment.update({
          where: { id },
          data: { ...body }
        });
        return NextResponse.json(updatedAppointment);
      } catch (error) {
        return NextResponse.json({ message: "Failed to update appointment", error: error.message }, { status: 500 });
      }

    default:
      return NextResponse.json({ message: "Resource not found" }, { status: 404 });
  }
}
