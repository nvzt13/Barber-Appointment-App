"use client";

import BarberSelection from "@/app/randevu/_components/BarberSelection";
import DateSelection from "@/app/randevu/_components/DateSelection";
import HourSelection from "@/app/randevu/_components/HourSelection";
import { Appointment, Barber } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Loader2Icon } from "lucide-react";
import { allSlots } from "@/data/data";
import { FormDataProps } from "@/types/type";
interface ClientRandevePageProps {
  barbers: Barber[];
}

const ClientRandevePage: React.FC<ClientRandevePageProps> = ({ barbers }) => {
  

  return (
    <section className="p-6 bg-gray-900 text-white w-full">
     
    </section>
  );
};

export default ClientRandevePage;
