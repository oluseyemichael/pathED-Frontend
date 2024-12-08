import React from 'react';
import { GoArrowUpRight } from "react-icons/go";
import { PiMeteorDuotone } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';

const REGISTER_ROUTE = '/signup';

const SignupSection = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate(REGISTER_ROUTE);
  };

  return (
    <div className='text-center mb-14'>
      <div className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 border rounded-xl w-fit flex flex-row space-x-2 cursor-pointer text-center mx-auto' onClick={handleSignup}>
        <h1>Signup</h1>
        <GoArrowUpRight className='w-5 h-5' />
      </div>
    </div>
  );
};

const Card = ({ children, className }) => (
  <div className={`bg-white rounded-xl shadow-lg p-8 mx-6 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="mb-6">
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h3 className="text-xl font-medium  mb-2 px-6 font-aeonik">{children}</h3>
);

const CardContent = ({ children }) => (
  <div>{children}</div>
);

const HowItWorksSection = () => {
  return (
    <div id="how-it-works" className='bg-gray-100 pt-16 mb-16'>
      <div className='text-center mb-14'>
        <CardHeader>
        <div className='flex flex-row text-sm text-blue-600 font-medium border rounded-xl w-fit px-2 py-1 space-x-3 mb-6 shadow-md text-center mx-auto'>
          <PiMeteorDuotone className="h-4 w-4 text-blue-600" />
          <p className='text-xs font-sans text-blue-600 font-semibold'>How it works</p>
        </div>
          <CardTitle className="font-aeonik">Eased process to start learning and growing</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 font-base mb-4">Pathed will take you on a learning journey that’s clear, engaging, and tailored to help you<br></br> grow every step of the way.</p>

              <SignupSection />

        </CardContent>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <div className="flex items-center space-x-4 mb-4">
            <div className="font-bold rounded-lg">
            <img src="/assets/tag01.png" alt="01" />
            </div>
            <CardTitle>Choose a proficiency level</CardTitle>
          </div>
          <CardContent>
            <p className="text-gray-500">Select a tailored path that matches your goals, whether it's a new skill, a deeper understanding, or preparing for a career shift.</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-blue-500 font-bold">★★★</span>
                <span className="font-medium">Advanced</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-500 font-bold">★★</span>
                <span className="font-medium">Intermediate</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-500 font-bold">★</span>
                <span className="font-medium">Beginner</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <div className="flex items-center space-x-4 mb-4">
          <div className="font-bold rounded-lg w-10 h-10 flex items-center justify-center">
            <img src="/assets/tag02.png" alt="02" />
            </div>
            <CardTitle>Watch curated video lessons</CardTitle>
          </div>
          <CardContent>
            <p className="text-gray-500">Learn through top-quality video lessons, carefully curated to keep you focused and inspired, while offering practical, real-world insights.</p>
            <div className="mt-4">
              <img src="/assets/lessonpreview.png" alt="Lesson preview" className="h-20 w-80 rounded-lg float-right" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <div className="flex space-x-4 mb-4">
          <div className="font-bold rounded-lg w-10 h-10 flex items-center justify-center">
            <img src="/assets/tag03.png" alt="03" />
            </div>
            <CardTitle>Take interactive quizzes</CardTitle>
          </div>
          <CardContent>
            <p className="text-gray-500">Test what you've learned with interactive quizzes to reinforce your knowledge and track your progress on your learning journey.</p>
            <div className="mt-4">
              <div className=" p-4 rounded-lg">
                <h4 className="text-lg font-semibold mb-2 bg-blue-600 text-white border rounded-lg mx-0 p-2">Is this quiz component interactive?</h4>
                <div className="bg-white space-y-2">
                  <div>
                    <input type="radio" id="quiz-interactive-yes" name="quiz-interactive" value="yes" className="mr-2" />
                    <label htmlFor="quiz-interactive-yes" className="font-medium">Yes</label>
                  </div>
                  <div>
                    <input type="radio" id="quiz-interactive-no" name="quiz-interactive" value="no" className="mr-2" />
                    <label htmlFor="quiz-interactive-no" className="font-medium">No</label>
                  </div>
                  <div>
                    <input type="radio" id="quiz-interactive-unsure" name="quiz-interactive" value="unsure" className="mr-2" />
                    <label htmlFor="quiz-interactive-unsure" className="font-medium">I'm not sure</label>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <div className="flex items-center space-x-4 mb-4">
          <div className="font-bold rounded-lg w-10 h-10 flex items-center justify-center">
            <img src="/assets/tag04.png" alt="04" />
            </div>
            <CardTitle>Learn valuable skills</CardTitle>
          </div>
          <CardContent>
            <p className="text-gray-500">Dive deeper with each lesson, building essential skills that translate into real-life applications and lasting knowledge.</p>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="rounded-lg shadow-lg flex items-center justify-center">
                <img src="/assets/figma_logo.svg" alt="Figma icon" className="w-5 h-5" />
              </div>
              <div className="bg-white p-4 rounded-lg shadow-lg flex items-center justify-center">
                <img src="/assets/js.svg" alt="JavaScript icon" className="w-5 h-5" />
              </div>
              <div className="shadow-lg flex items-center justify-center">
                <img src="/assets/framer.png" alt="Framer icon" className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div >
  );
};

export default HowItWorksSection;