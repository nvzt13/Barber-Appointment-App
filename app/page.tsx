import Footer from "@/components/layout/Footer";
import Gallery from "@/components/sections/Gallery";
import Header from "@/components/sections/Welcome";
import Services from "@/components/sections/Services";
import Why from "@/components/sections/Why";

export default async function Home() {
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
