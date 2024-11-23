import React from 'react';
import { FolderPlus, Upload, Clock } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <FolderPlus className="h-10 w-10 text-blue-600 mb-4" />,
      title: "Personalized Learning Paths",
      description:
        "Curated learning paths to guide you from beginner to expert, tailored to your goals."
    },
    {
      icon: <Upload className="h-10 w-10 text-blue-600 mb-4" />,
      title: "Video Lessons",
      description:
        "Expertly-crafted video lessons from top instructors on YouTube to deepen your understanding."
    },
    {
      icon: <Clock className="h-10 w-10 text-blue-600 mb-4" />,
      title: "Progress Tracking",
      description:
        "Stay motivated and on track with our comprehensive progress tracking features."
    }
  ];

  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 mb-10 text-left">
          Everything You Need for a Seamless Learning Journey
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-8 flex flex-col h-full"
            >
              {feature.icon}
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 flex-1">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;