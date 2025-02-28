import { Appointment } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { handleGet } from "./handlersFunctions";

export async function GET(
  req: NextRequest,
  { params }: { params: { endpoints: string[] } }
) {
  const session = await auth();
  console.log(session?.user?.id + "-----------------")

  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
  const { endpoins } = params;

  if(!endpoints || !Array.isArray(endpoints)) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const [resource, id] = endpoints;
  return await handleGet(resource, id);
}

















export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { endpoints } = await req.query;

  if (!endpoints || !Array.isArray(endpoints)) {
    return res.status(400).json({ message: "Invalid request" });
  }

  const [resource] = endpoints;
  await handlePost(resource, req, res);
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const { endpoints } = await req.query;

  if (!endpoints || !Array.isArray(endpoints)) {
    return res.status(400).json({ message: "Invalid request" });
  }

  const [resource, id] = endpoints;
  await handlePut(resource, id, req, res);
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  const { endpoints } = await req.query;

  if (!endpoints || !Array.isArray(endpoints)) {
    return res.status(400).json({ message: "Invalid request" });
  }

  const [resource, id] = endpoints;
  await handleDelete(resource, id, res);
}
function handlePost(
  resource: string,
  req: NextApiRequest,
  res: NextApiResponse
) {
  throw new Error("Function not implemented.");
}

function handlePut(
  resource: string,
  id: string,
  req: NextApiRequest,
  res: NextApiResponse
) {
  throw new Error("Function not implemented.");
}

function handleDelete(resource: string, id: string, res: NextApiResponse) {
  throw new Error("Function not implemented.");
}
