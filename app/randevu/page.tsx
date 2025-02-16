import { seniorBarber } from "@/data/data";
import { LucidePersonStanding, PersonStanding, PersonStandingIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const Appointment = () => {
  return (
    <section className="text-white">
      <form action="">
        <div className="form-group">
          <div>
            <div>
              <div>
                <h3>Usta Seç</h3>
              </div>
              <div>
                {
                  seniorBarber.map((barber, index) => (
                      <div key={index}>
                        <Image src={barber.image
                        } alt={barber.name} width={100} height={100} />
                      </div>
                  ))
                }
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </form>
    </section>
  );
};

export default Appointment;
