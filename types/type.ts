import { Session } from "@prisma/client";
import { NextRequest } from "next/server";

export interface FormDataProps {
  id: string;
  barberId: string;
  date: string;
  time: string;
}

export interface HTTPMethotsProps {
  request: NextRequest;
  params: {
    endpoints: string[];
  };
}

export interface HandleHTTPMethodsProps {
  endpoints: string[];
  request: NextRequest;
  session?: any
}
