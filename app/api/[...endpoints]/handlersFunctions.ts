import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function handleGet(resource: string, id: string | undefined) {
    switch (resource) {
      case "barber":
        if (id) {
          const barber = await prisma.barber.findFirst({
            where: { id },
          });
          return NextResponse.json(barber);
        }
        return NextResponse.json({ message: "Fetching all barbers" });
      case "user":
        if (id) {
          const user = await prisma.user.findFirst({
            where:{id}
          })
          return NextResponse.json(user);
        }
        return NextResponse.json({ message: "Fetching all users" });
      case "appointment":
        if (id) {
          const appointment = await prisma.appointment.findFirst({
            where: {id}
          })
          return NextResponse.json(appointment)
        
        }
        return NextResponse.json({ message: "Fetching all appointments" });
      default:
        return NextResponse.json(
          { message: "Resource not found" },
          { status: 404 }
        );
    }
  }
  
  export async function handlePost(
    resource: string,
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    switch (resource) {
      case "barber":
        return res
          .status(201)
          .json({ message: "Creating new barber", data: req.body });
      case "user":
        return res
          .status(201)
          .json({ message: "Creating new user", data: req.body });
      case "appointment":
        return res
          .status(201)
          .json({ message: "Creating new appointment", data: req.body });
      default:
        return res.status(404).json({ message: "Resource not found" });
    }
  }
  
  export async function handlePut(
    resource: string,
    id: string | undefined,
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (!id)
      return res.status(400).json({ message: "ID is required for updating" });
  
    switch (resource) {
      case "barber":
        return res
          .status(200)
          .json({ message: `Updating barber with id ${id}`, data: req.body });
      case "user":
        return res
          .status(200)
          .json({ message: `Updating user with id ${id}`, data: req.body });
      case "appointment":
        return res.status(200).json({
          message: `Updating appointment with id ${id}`,
          data: req.body,
        });
      default:
        return res.status(404).json({ message: "Resource not found" });
    }
  }
  
  export async function handleDelete(
    resource: string,
    id: string | undefined,
    res: NextApiResponse
  ) {
    if (!id)
      return res.status(400).json({ message: "ID is required for deleting" });
  
    switch (resource) {
      case "barber":
        return res.status(200).json({ message: `Deleting barber with id ${id}` });
      case "user":
        return res.status(200).json({ message: `Deleting user with id ${id}` });
      case "appointment":
        return res
          .status(200)
          .json({ message: `Deleting appointment with id ${id}` });
      default:
        return res.status(404).json({ message: "Resource not found" });
    }
  }