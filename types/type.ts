import { Appointment, Barber, Session } from "@prisma/client";
import { DateTime } from "next-auth/providers/kakao";
import { NextRequest } from "next/server";

export interface FormDataProps {
  id: string;
  barberId: string;
  userId: string;
  date: DateTime;
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
export interface ClientRandevuPageProps {
  barbers: Barber[];
}
export interface BarberSelectionProps {
  barbers: Barber[];
  formData: { barberId: string };
  setFormData: React.Dispatch<React.SetStateAction<{ barberId: string }>>;
}
export interface UserProfilProps {
  appointments: Appointment[];
}
export interface DateSelectionProps {
  güncellenecekTarih?: string;
  formData: FormDataProps;
  setFormData: React.Dispatch<React.SetStateAction<{ date: string }>>;
  willBeUpdatedDay: string;
}
export interface HourSelectionProps {
  formData: FormDataProps; // Kullanıcının seçtiği saat dilimi.
  setFormData: React.Dispatch<React.SetStateAction<{ time: string }>>;
}