import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { EventTypes } from "@/components/EventTypes";
import { Packages } from "@/components/Packages";
import { HowItWorks } from "@/components/HowItWorks";
import { Gallery } from "@/components/Gallery";
import { QuoteForm } from "@/components/QuoteForm";
import { VisitForm } from "@/components/VisitForm";
import { LocationSection } from "@/components/LocationSection";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ProposalBanner } from "@/components/ProposalBanner";

export default function Home() {
  return (
    <>
      <ProposalBanner />
      <Header />
      <main>
        <Hero />
        <EventTypes />
        <Packages />
        <HowItWorks />
        <Gallery />
        <QuoteForm />
        <VisitForm />
        <LocationSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
