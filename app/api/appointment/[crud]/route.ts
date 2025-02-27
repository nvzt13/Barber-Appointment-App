import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function POST(req: NextRequest) {
  const session = await auth();
  try {
    const { date, time, barberId } = await req.json();
    console.log("Received data:", {
      date,
      time,
      barberId,
      userId: session.user.id,
    });

    if (!date || !time || !barberId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check for existing appointment
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        barberId,
        date,
        time,
      },
    });

    if (existingAppointment) {
      return NextResponse.json(
        { message: "This time slot is already booked" },
        { status: 409 }
      );
    }

    // First check if barber exists
    const barber = await prisma.barber.findUnique({
      where: { id: barberId },
    });

    if (!barber) {
      console.log("Barber not found:", barberId);
      return NextResponse.json(
        { message: "Barber not found" },
        { status: 404 }
      );
    }

    const parsedDate = new Date(date);
    console.log("Creating appointment with:", {
      customerId: session.user.id,
      barberId,
      date: parsedDate,
      time,
    });

    const appointment = await prisma.appointment.create({
      data: {
        customer: {
          connect: { id: session.user.id },
        },
        barber: {
          connect: { id: barberId },
        },
        date,
        time,
        status: "pending",
      },
    });

    console.log("Created appointment:", appointment);
    return NextResponse.json(appointment, { status: 201 });
  } catch (err) {
    // Proper error handling with type checking
    const error = err as Error;

    console.error("Appointment creation error:", {
      message: error.message,
      name: error.name,
      stack: error.stack,
    });

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2003":
          return NextResponse.json(
            { message: "Invalid reference ID" },
            { status: 400 }
          );
        case "P2002":
          return NextResponse.json(
            { message: "This appointment slot is already taken" },
            { status: 409 }
          );
        default:
          return NextResponse.json(
            { message: "Database error occurred" },
            { status: 500 }
          );
      }
    }

    return NextResponse.json(
      {
        message: "Failed to create appointment",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest ) {
  const session = await auth();

  const { appointmentId } = await req.json();
  console.log(appointmentId + "_____________________________");

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!appointmentId) {
    return NextResponse.json({ message: "Appointment ID is required" }, { status: 400 });
  }

  try {
    const isAdmin = await prisma.user.findFirst({
      where: {
        id: session.user.id,
        role: "ADMIN"
      }
    });

    const existingAppointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!existingAppointment) {
      return NextResponse.json({ message: "Appointment not found" }, { status: 404 });
    }

    // Eğer admin değilse ve randevu sahibi değilse, işlemi reddet
    if (!isAdmin && existingAppointment.customerId !== session.user.id) {
      return NextResponse.json({ message: "Not authorized to delete this appointment" }, { status: 403 });
    }

    // Randevuyu silelim
    await prisma.appointment.delete({
      where: { id: appointmentId },
    });

    return NextResponse.json({ message: "Appointment deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error("Error deleting appointment:", err);
    return NextResponse.json({ message: "Failed to delete appointment" }, { status: 500 });
  }
}
