import { Navbar } from "@/component/header";
import { HeroBanner } from "@/component/home";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <main>
        <HeroBanner />
      </main>
    </div>
  );
}
