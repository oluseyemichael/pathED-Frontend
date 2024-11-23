import React from 'react';

const Card = ({ children, className }) => (
  <div className={`bg-white rounded-md shadow p-6 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="mb-4">
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h3 className="text-lg font-medium">{children}</h3>
);

const CardContent = ({ children }) => (
  <div>{children}</div>
);

const HowItWorksSection = () => {
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Eased process to start learning and growing</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-blue-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
                1
              </div>
              <h3 className="text-lg font-medium">Choose a proficiency level</h3>
            </div>
            <p>Select a tailored path that matches your goals, whether it's a new skill, a deeper understanding, or preparing for a career shift.</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-blue-500 font-bold">★★★</span>
                <span>Advanced</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-500 font-bold">★★</span>
                <span>Intermediate</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-500 font-bold">★</span>
                <span>Beginner</span>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-blue-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
                2
              </div>
              <h3 className="text-lg font-medium">Watch curated video lessons</h3>
            </div>
            <p>Learn through top-quality video lessons, carefully curated to keep you focused and inspired, while offering practical, real-world insights.</p>
            <div className="mt-4">
              <img src="/api/placeholder/400/240" alt="Lesson preview" className="w-full rounded-md" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-blue-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
                3
              </div>
              <h3 className="text-lg font-medium">Take interactive quizzes</h3>
            </div>
            <p>Test what you've learned with interactive quizzes to reinforce your knowledge and track your progress on your learning journey.</p>
            <div className="mt-4">
              <div className="bg-white p-4 rounded-md shadow">
                <h4 className="text-lg font-medium mb-2">Is this quiz component interactive?</h4>
                <div className="space-y-2">
                  <div>
                    <input type="radio" id="quiz-interactive-yes" name="quiz-interactive" value="yes" className="mr-2" />
                    <label htmlFor="quiz-interactive-yes">Yes</label>
                  </div>
                  <div>
                    <input type="radio" id="quiz-interactive-no" name="quiz-interactive" value="no" className="mr-2" />
                    <label htmlFor="quiz-interactive-no">No</label>
                  </div>
                  <div>
                    <input type="radio" id="quiz-interactive-try" name="quiz-interactive" value="try" className="mr-2" />
                    <label htmlFor="quiz-interactive-try">I'll try</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-blue-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
                4
              </div>
              <h3 className="text-lg font-medium">Learn valuable skills</h3>
            </div>
            <p>Dive deeper with each lesson, building essential skills that translate into real-life applications and lasting knowledge.</p>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-md shadow flex items-center justify-center">
                <img src="/api/placeholder/48/48" alt="React icon" className="w-8 h-8" />
              </div>
              <div className="bg-white p-4 rounded-md shadow flex items-center justify-center">
                <img src="/api/placeholder/48/48" alt="JavaScript icon" className="w-8 h-8" />
              </div>
              <div className="bg-white p-4 rounded-md shadow flex items-center justify-center">
                <img src="/api/placeholder/48/48" alt="HTML icon" className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md">
            Sign up
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default HowItWorksSection;