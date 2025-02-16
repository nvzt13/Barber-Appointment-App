import Footer from "@/components/shared/Footer";
import Gallery from "@/components/shared/Gallery";
import Header from "@/components/shared/Header";
import Services from "@/components/shared/Services";
import Why from "@/components/shared/Why";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      <Why />
      <Services />
      <Gallery />
      <Footer />
    </div>
  );
}
