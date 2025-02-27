import { Barber } from "@prisma/client";
import CliendRandevePage from "./_components/CliendRandevuPage";

const TakeAppointmentPage = async () => {
  const getServerSideProps = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/barber/read");
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

  const barberData = await getServerSideProps();
  const barbers: Barber[] = barberData.barbers
  return (
    <section className="p-6 bg-gray-900 text-white w-full">
      <CliendRandevePage barbers={barbers} />
    </section>
  );
};

export default TakeAppointmentPage;
