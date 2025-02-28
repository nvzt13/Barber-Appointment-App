import { NextApiRequest, NextApiResponse } from 'next';
import {prisma} from '@/lib/prisma'

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Parametreleri yakalayın
  const endpoint = req.nextUrl.pathname.split('/').slice(3); // ilk 3 bölümü keser (/api/...parametreler)
  
  const barber = endpoint[0];
  const read = endpoint[1];
  const x = endpoint[2];
  return NextResponse.json({ barber, read, x });
}

export async function  POST(req: NextApiRequest, res: NextApiResponse) {
  const { endpoints } = await req.query;

  if (!endpoints || !Array.isArray(endpoints)) {
    return res.status(400).json({ message: 'Invalid request' });
  }

  const [resource] = endpoints;
  await handlePost(resource, req, res);
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const { endpoints } = await req.query;

  if (!endpoints || !Array.isArray(endpoints)) {
    return res.status(400).json({ message: 'Invalid request' });
  }

  const [resource, id] = endpoints;
  await handlePut(resource, id, req, res);
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  const { endpoints } = await req.query;

  if (!endpoints || !Array.isArray(endpoints)) {
    return res.status(400).json({ message: 'Invalid request' });
  }

  const [resource, id] = endpoints;
  await handleDelete(resource, id, res);
}

export async function handleGet(resource: string, id: string | undefined, res: NextApiResponse) {
  switch (resource) {
    case 'barber':
      if (id) {
        const barber = await prisma.barber.findFirst({
          where: {
            id,
          }
        });
        return res.status(200).json(barber);
      }
      return res.status(200).json({ message: 'Fetching all barbers' });
    case 'user':
      if (id) {
        return res.status(200).json({ message: `Fetching user with id ${id}` });
      }
      return res.status(200).json({ message: 'Fetching all users' });
    case 'appointment':
      if (id) {
        return res.status(200).json({ message: `Fetching appointment with id ${id}` });
      }
      return res.status(200).json({ message: 'Fetching all appointments' });
    default:
      return res.status(404).json({ message: 'Resource not found' });
  }
}

export async function handlePost(resource: string, req: NextApiRequest, res: NextApiResponse) {
  switch (resource) {
    case 'barber':
      return res.status(201).json({ message: 'Creating new barber', data: req.body });
    case 'user':
      return res.status(201).json({ message: 'Creating new user', data: req.body });
    case 'appointment':
      return res.status(201).json({ message: 'Creating new appointment', data: req.body });
    default:
      return res.status(404).json({ message: 'Resource not found' });
  }
}

export async function handlePut(resource: string, id: string | undefined, req: NextApiRequest, res: NextApiResponse) {
  if (!id) return res.status(400).json({ message: 'ID is required for updating' });

  switch (resource) {
    case 'barber':
      return res.status(200).json({ message: `Updating barber with id ${id}`, data: req.body });
    case 'user':
      return res.status(200).json({ message: `Updating user with id ${id}`, data: req.body });
    case 'appointment':
      return res.status(200).json({ message: `Updating appointment with id ${id}`, data: req.body });
    default:
      return res.status(404).json({ message: 'Resource not found' });
  }
}

export async function handleDelete(resource: string, id: string | undefined, res: NextApiResponse) {
  if (!id) return res.status(400).json({ message: 'ID is required for deleting' });

  switch (resource) {
    case 'barber':
      return res.status(200).json({ message: `Deleting barber with id ${id}` });
    case 'user':
      return res.status(200).json({ message: `Deleting user with id ${id}` });
    case 'appointment':
      return res.status(200).json({ message: `Deleting appointment with id ${id}` });
    default:
      return res.status(404).json({ message: 'Resource not found' });
  }
}