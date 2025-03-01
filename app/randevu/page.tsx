
import ClientRandevuPage from "./_components/ClientRandevuPage";

const TakeAppointmentPage = async () => {

const  barber =  {
    id: "14gdee4ujfde",
    name: "cengiz",
    image: "yok",
    createdAt: new Date("2025-03-01T00:00:00Z"),  // ISO 8601 formatında tarih
    updatedAt: new Date("2025-03-01T00:00:00Z")   // ISO 8601 formatında tarih
}

  try {
    const res = await fetch("http://localhost:3000/api/barber", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json' // Manuel header ekledik
      },
      body: JSON.stringify(barber) // JSON.stringify büyük harfle
    });

    if (res.ok) {
      const data = await res.json();  // JSON verisini burada alıyorsunuz
      console.log(data);  // Veriyi console'a basıyoruz
    } else {
      console.log("Hata durumu:", res);
    }
  } catch (error) {
    console.log("Sunucu hatası:", error);
  }

  return (
    <section className="p-6 bg-gray-900 text-white w-full">
      randevu page
    </section>
  );
};

export default TakeAppointmentPage;