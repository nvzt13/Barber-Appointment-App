import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const barbers = await prisma.barber.findMany()

    if (!barbers) {
      return NextResponse.json({ error: "No barbers found" }, { status: 404 });
    }

    return NextResponse.json(barbers);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch barbers from database" },
      { status: 500 }
    );
  }
}
