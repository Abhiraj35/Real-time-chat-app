import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import CtaSection from "@/components/landing/CtaSection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="relative z-10">
      <Hero />
      <HowItWorks />
      <Features />
      <CtaSection />
      <Footer />
    </div>
  );
}
