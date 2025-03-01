import { Appointment } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { handleGet } from "./handlersFunctions";

export async function GET() {
  const sessions = await auth();
  console.log(sessions?.user?.id + "_________");

  if (!sessions) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 408 });
  }

  const { endpoints } = params;

  if (!endpoints || !Array.isArray(endpoints)) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  return NextResponse.json({ message: "success request" }, { status: 200 });
}