import Footer from "@/components/layout/Footer";
import Gallery from "@/components/sections/Gallery";
import Header from "@/components/sections/Welcome";
import Services from "@/components/sections/Services";
import Why from "@/components/sections/Why";


export default function Home() {
 const getServerSideProps = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/barber/read/1");
    if (res.ok) {
      const data = await res.json();
      console.log(data);
    } else {
      console.log(res)
    }
  } catch (error) {
    console.log(error);
  }

  return { props: {} }; // Eğer sayfaya veri geçirilecekse buraya props eklenmeli
};
const {res} = getServerSideProps()
console.log(res)
  return (
    <div className="mx-auto">
      <Header />
      <Why />
      <Services />
      <Gallery />
      <Footer />
    </div>
  );
}