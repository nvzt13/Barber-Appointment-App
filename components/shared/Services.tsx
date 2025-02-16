import Image from "next/image";
import React from "react";
import { cardData } from "@/data/data";

const Services = () => {
  return (
    <section className="bg-amber-800 py-16 text-white">
      <div className="flex flex-col min-h-[768px] justify-center items-center rounded-lg  p-8 mx-auto max-w-7xl">

        <h1 className="text-4xl font-extrabold text-center mb-20">Hizmetlerimiz</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-32 px-4 ">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out max-w-72"
            >
              <div className="w-full h-[200px] relative">
                <Image
                  src={card.image}
                  alt="card"
                  layout="fill" 
                  objectFit="cover"
                />
              </div>

              <h1 className="text-xl font-semibold mt-4 text-center">{card.title}</h1>
              <p className="mt-2 text-justify text-center">{card.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
