import React from 'react';


const HeroAndContentSection = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="text-left">
            <h3 className="border rounded-md">The next generation of modern edtech</h3>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                The modern all-in-one <br />
                self learning system.
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                Curated learning paths, video lessons, quizzes, and more—all in one place to help you master web development and beyond.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded">
                Start Learning
              </button>
            </div>
            <div className="hidden md:block">
              <img src="src/assets/hero-image.png" alt="Hero Image" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-left">
            <h2 className="text-3xl font-bold mb-4">
              With curated courses, interactive quizzes, real-world projects, and progress tracking, it's everything you need to learn effectively, at your own pace, and in a way that truly sticks.
            </h2>
            <p className="text-lg">
              Whether you're advancing your career or exploring new passions, our platform makes learning focused, engaging, and enjoyable.
            </p>
          </div>
          <div className="hidden md:block">
          <img src="src/assets/illustration1.png" alt="Bottom" className="absolute right-0 w-24 md:w-32" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroAndContentSection;