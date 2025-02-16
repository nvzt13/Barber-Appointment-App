import React from 'react';
import { galleryData } from '@/data/data';
import Image from 'next/image';

const Gallery = () => {
  return (
    <section className="bg-gray-800 py-16">
      <h1 className="text-5xl font-bold text-center text-white mb-12">Gallery</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 max-w-7xl mx-auto">
        {galleryData.map((item) => (
          <div key={item.id} className="group relative overflow-hidden rounded-lg shadow-lg">
            <Image
              src={item.href}
              alt="gallery"
              width={300}
              height={300}
              className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex justify-center items-center">
              <h2 className="text-xl font-semibold text-white">{item.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
