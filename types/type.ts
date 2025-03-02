import { NextRequest } from "next/server";

export interface FormDataProps {
  id: string;
  barberId: string;
  date: string;
  time: string;
}

export interface HTTPMethotsProps {
  params: {
    endpoints: string[];
  };
}

export interface HandleHTTPMethodsProps {
  resource: string;
  id?: string;
  request: NextRequest;
  body?: any;
}
