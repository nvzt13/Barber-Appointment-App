import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const isAdmin = await prisma.user.findFirst({
      where: { id: userId, role: "ADMIN" }
    });

    if (!isAdmin) {
      return NextResponse.json(false);
    }

    return NextResponse.json(true);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
