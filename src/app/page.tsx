import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { LogoBar } from "@/components/landing/logo-bar";
import { Stats } from "@/components/landing/stats";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Pricing } from "@/components/landing/pricing";
import { Testimonials } from "@/components/landing/testimonials";
import { FAQ } from "@/components/landing/faq";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";
import { SiteViewTracker } from "@/components/landing/site-view-tracker";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteViewTracker />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <LogoBar />
        <Stats />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
