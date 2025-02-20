import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { barberId: string } }
) {
  try {
    const { barberId } = params;
    const date = request.nextUrl.searchParams.get("date");

    if (!date) {
      return NextResponse.json(
        { message: "Date parameter is required" },
        { status: 400 }
      );
    }

    // Get all existing appointments for the barber on the specified date
    const existingAppointments = await prisma.appointment.findMany({
      where: {
        barberId: barberId,
        date: new Date(date),
      },
      select: {
        time: true,
      },
    });

    // Create array of all possible time slots
    const allTimeSlots = Array.from({ length: 13 }, (_, i) => {
      const hour = i + 9; // Start from 9 AM
      return `${hour}:00 - ${hour + 1}:00`;
    });

    // Filter out booked slots
    const bookedTimes = existingAppointments.map((apt) => apt.time);
    const availableSlots = allTimeSlots.filter(
      (slot) => !bookedTimes.includes(slot)
    );

    return NextResponse.json(availableSlots);
  } catch (error) {
    console.error("Error fetching available slots:", error);
    return NextResponse.json(
      { message: "Failed to fetch available slots" },
      { status: 500 }
    );
  }
}
