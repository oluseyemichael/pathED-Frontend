import React from 'react';
import { PiTreeStructureFill, PiVideo, PiSuitcaseFill  } from "react-icons/pi";
import { BsHourglassTop } from "react-icons/bs";

const FeaturesSection = () => {
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

  return (
    <section id='features' className=" py-20 font-aeonik px-6">
      <div className="container mx-auto">
        <div className='text-left sm:w-1/2'>
        <div className='flex flex-row mb-3 space-x-2 border rounded-lg w-24 shadow-md p-1'> 
        <PiSuitcaseFill className="h-4 w-4 text-blue-600" />
        <p className='text-xs font-sans text-blue-600 font-semibold'>Features</p>
        </div>
        <h2 className="text-4xl font-normal text-gray-800 mb-4">
          Everything You Need for a Seamless Learning Journey
        </h2>
        <p className='text-gray-500 font-sans text-base mb-14'>From guided skill paths to interactive projects, our platform provides everything you need to learn with confidence, at your own pace.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <p className="text-gray-600 flex-1 font-sans text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;