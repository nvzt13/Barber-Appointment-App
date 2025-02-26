import CliendRandevePage from "./CliendRandevePage";

const TakeAppointmentPage = async () => {
  const getServerSideProps = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/barber");
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        console.log("API hatası:", await res.json());
        return null;
      }
    } catch (error) {
      console.log("Sunucu hatası:", error);
      return null;
    }
  };

  const data = await getServerSideProps();
  
  // Berber verilerini prop olarak geçiyoruz
  return (
    <section className="p-6 bg-gray-900 text-white">
      <CliendRandevePage barbers={data ? data.barbers : []} />
    </section>
  );
};

export default TakeAppointmentPage;
