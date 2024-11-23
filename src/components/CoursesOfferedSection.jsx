import React from 'react';

const CourseCard = ({ title, level, enrollText }) => (
  <div className="bg-navy-800 rounded-md shadow p-6">
    <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
    <p className="text-gray-400 mb-4">{level}</p>
    <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md inline-block">
      {enrollText}
    </a>
  </div>
);

const CoursesOfferedSection = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8">Courses Offered</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <CourseCard
          title="Hosting on Github"
          level="Beginner | Intermediate"
          enrollText="Enroll"
        />
        <CourseCard
          title="Creating Information Architecture" 
          level="Beginner | Intermediate"
          enrollText="Enroll"
        />
        <CourseCard
          title="Hosting on Github"
          level="Beginner | Intermediate" 
          enrollText="Enroll"
        />
      </div>
      <div className="flex justify-center mt-8">
        <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md">
          Explore courses
        </a>
      </div>
    </div>
  );
};

export default CoursesOfferedSection;