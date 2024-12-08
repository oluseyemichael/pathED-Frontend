import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaWandMagicSparkles } from "react-icons/fa6";
import { GoArrowUpRight } from "react-icons/go";

const REGISTER_ROUTE = '/signup';

const StartLearningSection = () => {
  const navigate = useNavigate();

  const handleStartLearning = () => {
    navigate(REGISTER_ROUTE);
  };

  return (
    <div className='flex flex-row space-x-2'>
      <div className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 border rounded-xl w-fit flex flex-row space-x-2 cursor-pointer' onClick={handleStartLearning}>
        <h1>Start Learning</h1>
        <GoArrowUpRight className='mt-1' />
      </div>
      <h1 className='text-blue-600 hover:text-blue-700 underline font-semibold text-lg py-4 px-6 cursor-pointer'>Learn more</h1>
    </div>
  );
};

const HeroAndContentSection = () => {
  return (
    <div>
      {/* Hero Section */}
      <section id='about' className="mt-16" >
        <div className="container px-6 mb--20 bg-[url('/assets/Rectangle-bg.png')]">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="text-left mt-16 mb-16">
              <div className='flex flex-row text-sm text-blue-600 font-medium border rounded-xl w-fit px-2 py-1 space-x-3 mb-6 shadow-md'>
                <h3 className="">The next generation of modern edtech</h3>
                <FaWandMagicSparkles className='w-4 h-5' />
              </div>
              <h1 className="text-4xl md:text-5xl font-aeonik text-gray-800 mb-4">
                The modern all-in-one <br className='bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent' />
                <span className='bg-gradient-to-r from-blue-700 to-blue-300 bg-clip-text text-transparent'>self learning </span>system.
              </h1>
              <p className="text-gray-600 text-lg mb-8 font-medium">
                Curated learning paths, video lessons, quizzes, and more—all in one place to help you master web development and beyond.
              </p>
              <StartLearningSection />
            </div>
            <div className="hidden md:block md:-mt-20 lg:mt-9">
              <img src="/assets/hero-image.png" alt="Hero Image" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-blue-600 text-white py-16 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-left">
            <h2 className="text-2xl font-medium font-aeonik mb-4">
              With curated courses, interactive quizzes, real-world projects, and progress tracking, it's everything you need to learn effectively, at your own pace, and in a way that truly sticks.
              Whether you're advancing your career or exploring new passions, our platform makes <span className='italic'>learning focused, engaging, and enjoyable.</span>
            </h2>
          </div>
          <div className="md:block">
            <img src="/assets/illustration1.png" alt="Bottom" className="absolute right-0 w-24 md:w-32" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroAndContentSection;