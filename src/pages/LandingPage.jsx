import React from 'react';
import Header from '../components/Header';
import HeroAndContentSection from '../components/HeroAndContentSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import CoursesOfferedSection from '../components/CoursesOfferedSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div>
      <Header />
      <HeroAndContentSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CoursesOfferedSection />
      <CTASection />
      <Footer />
    </div>
  );
}
