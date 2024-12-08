import React from 'react';
import { RiBookOpenFill } from "react-icons/ri";

const CourseCard = ({ title, level, enrollText }) => (
  <div className="bg-[#001249] rounded-md shadow px-4 py-20 text-center">
    <p className="text-[#4C78FF] mb-4 text-xs font-medium">{level}</p>
    <h3 className="text-lg font-medium text-white mb-2 font-aeonik">{title}</h3>
    <div className="flex justify-center mt-6">
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-normal py-2 pl-4 pr-6 rounded-br-full rounded-tr-full rounded-tl-none rounded-bl-full flex items-center">
        <span className="mr-2">{enrollText}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform -rotate-45" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
);

const CoursesOfferedSection = () => {
  return (
    <div id='courses' className="bg-gray-100 mx-auto py-16 px-6">
      <div className='flex flex-row text-sm text-blue-600 font-medium border rounded-xl w-fit px-2 py-1 space-x-3 mb-6 shadow-md text-center mx-auto'>
        <RiBookOpenFill className="h-4 w-4 text-blue-600" />
        <p className='text-xs font-sans text-blue-600 font-semibold'>Popular Courses</p>
      </div>
      <h2 className="text-xl font-aeonik text-center mb-8">Your All-in-One Hub for Mastering New Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <CourseCard
          level="BEGINNER | INTERMEDIATE"
          title="Web Development"
          enrollText="Enroll"
        />
        <CourseCard
          title="Hosting on Github"
          level="BEGINNER | INTERMEDIATE"
          enrollText="Enroll"
        />
        <CourseCard
          title="Creating Information Architecture"
          level="BEGINNER | INTERMEDIATE"
          enrollText="Enroll"
        />
      </div>
      <div className="flex justify-center mt-6">
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-normal py-2 pl-4 pr-6 rounded-xl flex items-center">
        <span className="mr-2">Explore Courses</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform -rotate-45" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
    </div>
  );
};

export default CoursesOfferedSection;