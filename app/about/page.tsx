import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center  max-w-7xl mx-auto p-12">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Hakkımızda</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-2xl mb-6">
        Hair Studio&apos;ya hoş geldiniz! Profesyonel berber ekibimiz, sizlere kaliteli tıraş ve bakım hizmetleri sunmaya adanmıştır. 
        Amacımız, bir sonraki tıraşınızı kolayca ayarlayabileceğiniz sorunsuz bir randevu deneyimi sunmak. 
        Uzman berberlerimizle, her müşterimizin en iyi görünümle ve kendini harika hissederek ayrılmasını sağlıyoruz.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Misyonumuz</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Misyonumuz, profesyonel ve özenli hizmetlerle her ziyaretinizi rahatlatıcı ve keyifli bir deneyime dönüştürmektir.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Ekibimiz</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Berberlerimiz, modern ve klasik stillerde uzmanlaşmış deneyimli profesyonellerdir. Basit bir kesimden yeni bir stile kadar, her ihtiyacınızı karşılıyoruz.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Kolay Randevu</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Randevu almayı kolaylaştırdık. Size uygun bir zamanı seçin, gerisini biz hallederiz. Bekleme yok, sorun yok, sadece mükemmel hizmet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
