import React from 'react'

const Why = () => {
  return (
    <section className="bg-whyImage bg-cover bg-center h-screen">
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 h-full">
        <div className="flex flex-col items-center justify-end w-full h-full">
        <div className="p-4 bg-black bg-opacity-50 mb-8 ">
        <h2 className="text-4xl font-bold text-white">Neden Nevzat Berber?</h2>
          <p className="text-white text-justify mt-8"> 
          Deneyimli ekibimizle kaliteli hizmeti uygun fiyatlarla sunuyoruz. Müşteri memnuniyeti odaklı çalışarak her ziyaretinizde kendinizi özel hissedeceksiniz.
          </p>
        </div>
        </div>
      </div>
    </section>
  )
}

export default Why
