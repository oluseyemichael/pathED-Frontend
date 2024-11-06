import React from 'react';

export default function FeaturesSection() {
  const features = [
    { title: "Structured Learning Paths", description: "Clear guidance from beginner to expert levels." },
    { title: "Progress Tracking", description: "Monitor your journey and stay on track." },
    { title: "Interactive Quizzes", description: "Engage with quizzes to test your understanding." },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-white shadow rounded">
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
