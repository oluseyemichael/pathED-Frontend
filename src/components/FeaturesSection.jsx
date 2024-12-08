import React, { useState } from 'react';
import { PiTreeStructureFill, PiVideo, PiSuitcaseFill, PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import { BsHourglassTop } from "react-icons/bs";

const FeaturesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const features = [
    {
      icon: <PiTreeStructureFill className="h-10 w-10 p-2 text-blue-600 border-10 rounded bg-gray-200 " />,
      title: "Personalized Learning Paths",
      description:
        "Curated learning paths to guide you from beginner to expert, tailored to your goals."
    },
    {
      icon: <PiVideo className="h-10 w-10 p-2 text-blue-600 border-10 rounded bg-gray-200" />,
      title: "Video Lessons from YouTube",
      description:
        "Expertly-crafted video lessons from top instructors on YouTube to deepen your understanding."
    },
    {
      icon: <BsHourglassTop className="h-10 w-10 p-2 text-blue-600 border-10 rounded bg-gray-200" />,
      title: "Progress Tracking",
      description:
        "Stay motivated and on track with our comprehensive progress tracking features."
    }
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === Math.floor((features.length - 1) / 2) ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.floor((features.length - 1) / 2) : prevIndex - 1
    );
  };

  // Get the two features to display based on current index
  const displayedFeatures = [
    features[currentIndex * 2],
    features[currentIndex * 2 + 1]
  ].filter(Boolean); // Remove undefined if odd number of features

  return (
    <section id='features' className="py-20 font-aeonik px-6">
      <div className="container mx-auto">
        <div className='flex flex-row space-x-4'>
          <div className='text-left sm:w-1/2'>
            <div className='flex flex-row mb-3 space-x-2 border rounded-lg w-24 shadow-md p-1'>
              <PiSuitcaseFill className="h-4 w-4 text-blue-600" />
              <p className='text-xs font-sans text-blue-600 font-semibold'>Features</p>
            </div>
            <h2 className="text-4xl font-normal text-gray-800 mb-4">
              Everything You Need for a Seamless Learning Journey
            </h2>
            <p className='text-gray-500 font-sans text-base mb-14'>
              From guided skill paths to interactive projects, our platform provides everything you need to learn with confidence, at your own pace.
            </p>
          </div>
          {/* Carousel Navigation Buttons */}
          <div className="bg-[#00256F] flex flex-row">
            <button
              onClick={handlePrev}
              className=" border-gray-200 rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
            >
              <PiCaretLeftBold className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={handleNext}
              className=" border border-gray-200 rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
            >
              <PiCaretRightBold className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Large and Medium Screens Carousel */}
        <div className="hidden md:flex items-center justify-center relative">
          <div className="grid grid-cols-2 gap-8 w-full max-w-4xl">
            {displayedFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg p-8 flex flex-col h-full"
              >
                <div className='flex flex-row space-x-4'>
                  {feature.icon}
                  <h3 className="text-xl font-semibold mb-4 font-sans">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 flex-1 font-sans text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile and Small Screens (Full Grid) */}
        <div className="grid grid-cols-1 md:hidden gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg p-8 flex flex-col h-full"
            >
              <div className='flex flex-row space-x-4'>
                {feature.icon}
                <h3 className="text-xl font-semibold mb-4 font-sans">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600 flex-1 font-sans text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;