'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import PainSection from '@/components/sections/PainSection';
import WhyPainSection from '@/components/sections/WhyPainSection';
import WhyNoHelpSection from '@/components/sections/WhyNoHelpSection';
import ServicesSection from '@/components/sections/ServicesSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import TeamSection from '@/components/sections/TeamSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import CTASection from '@/components/sections/CTASection';
import TwoGisSection from '@/components/sections/TwoGisSection';
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
        <WhyPainSection openModal={open} />
        <WhyNoHelpSection openModal={open} />
        <ServicesSection openModal={open} />
        <ReviewsSection />
        <HowItWorksSection openModal={open} />
        <TeamSection openModal={open} />
        <CTASection openModal={open} />
        <TwoGisSection />
      </main>
      <Footer />
      <Modal showModal={showModal} setShowModal={setShowModal} />
      <WhatsAppButton />
    </>
  );
}
