import { auth } from "@/auth";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const AppointmentButton = async () => {
  const session = await auth();
  return (
    <div>
      {session ? (
        <Button type="button" className="lg bg-transparent border-2 ">
          <Link href={"/randevu"}>Randevu Al</Link>
        </Button>
      ) : (
        <Button type="button" className="lg bg-transparent border-2 ">
          <Link href={"/api/auth/signin"}>Randevu Al</Link>
        </Button>
      )}
    </div>
  );
};

export default AppointmentButton;
