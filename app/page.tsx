'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import PainSection from '@/components/sections/PainSection';
import SolutionSection from '@/components/sections/SolutionSection';
import ServicesSection from '@/components/sections/ServicesSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import StatsSection from '@/components/sections/StatsSection';
import TeamSection from '@/components/sections/TeamSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import Modal from '@/components/ui/Modal';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const open = () => setShowModal(true);

  return (
    <>
      <Header openModal={open} />
      <main>
        <HeroSection openModal={open} />
        <PainSection />
        <SolutionSection />
        <ServicesSection openModal={open} />
        <HowItWorksSection />
        <StatsSection />
        <TeamSection />
        <ReviewsSection />
        <FAQSection />
        <CTASection openModal={open} />
      </main>
      <Footer />
      <Modal showModal={showModal} setShowModal={setShowModal} />
      <WhatsAppButton />
    </>
  );
}
