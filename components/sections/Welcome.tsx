import React from "react";
import AppointmentButton from "../shared/AppointmentButton";

const Header = () => {
  return (
    <section className="bg-headerImage bg-cover bg-center h-screen w-full text-white relative">
      <div className="container mx-auto h-full flex flex-col items-center justify-center text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
          Nevzat Berber
        </h2>
        <p className="text-2xl">Herkes için sağlık ve güzellik</p>
        <AppointmentButton />
      </div>
    </section>
  );
};

export default Header;
