
import { Footer } from "@/component/common/Footer";
import { Navbar } from "@/component/header";
import { HeroBanner, OurJourney, TopProductBanner } from "@/component/home";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <main>
        <HeroBanner />
        <div className="md:p-8 p-4">
          <TopProductBanner />
        </div>

        <div className="md:p-8 p-4">
          <OurJourney />
        </div>

        <Footer />
      </main>
    </div>
  );
}
