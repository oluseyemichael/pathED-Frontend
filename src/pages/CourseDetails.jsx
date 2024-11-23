import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCourseById } from '../services/api';

// =============== Utility Components ===============

const Card = ({ className = "", children }) => (
  <div className={`rounded-lg border border-[#F0F4FF] bg-white shadow-sm transition-all duration-300 w-full ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ className = "", children }) => (
  <div className={`flex flex-col space-y-1.5 p-4 sm:p-6 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ className = "", children }) => (
  <div className={`p-4 sm:p-6 pt-0 ${className}`}>
    {children}
  </div>
);

const Button = ({ variant = "default", className = "", children, ...props }) => {
  const variants = {
    default: "bg-[#4C78FF] text-white shadow hover:bg-[#4C78FF]/90",
    ghost: "hover:bg-[#F0F4FF] text-[#001249]",
    outline: "border border-[#F0F4FF] bg-white hover:bg-[#F0F4FF] text-[#001249]"
  };
  
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4C78FF] disabled:opacity-50 h-9 px-3 sm:px-4 py-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Badge = ({ className = "", children }) => (
  <div className={`inline-flex items-center rounded-md border-none bg-[#F0F4FF] px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-[#001249] transition-all duration-200 ${className}`}>
    {children}
  </div>
);


// =============== Icons ===============

const Logo = () => (
  <div className="flex items-center space-x-2">
    <img src="/src/assets/logo.svg" alt="PathED" className="h-8 mr-2" />
    {/* <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="#4C78FF"/>
      <path d="M8 16L16 8L24 16L16 24L8 16Z" fill="white"/>
    </svg>
    <span className="text-xl font-bold text-[#001249]">PathED</span> */}
  </div>
);

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6"/>
  </svg>
);

const Users = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const Star = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

// =============== Module Circle Components ===============

const ModuleCircle = ({ module, index, total, isMobile }) => {
  const radius = isMobile ? 80 : 130;
  const angle = (360 / total) * index - 90;
  const radian = (angle * Math.PI) / 180;
  const x = radius * Math.cos(radian);
  const y = radius * Math.sin(radian);

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
      }}
    >
      <div className="relative group">
        <div className="absolute -inset-1 bg-[#4C78FF] rounded-full blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
        <div className="relative flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 bg-white rounded-full border-2 border-[#4C78FF] shadow-lg group-hover:scale-105 transition-transform duration-200">
          <div className="text-center p-1 sm:p-2 text-xs sm:text-sm text-[#001249]">
            {module}
          </div>
        </div>
      </div>
    </div>
  );
};

const ModuleArrow = ({ startIndex, endIndex, total, isMobile }) => {
  const radius = isMobile ? 80 : 130;
  const startAngle = (360 / total) * startIndex - 90;
  const endAngle = (360 / total) * endIndex - 90;
  const startRadian = (startAngle * Math.PI) / 180;
  const endRadian = (endAngle * Math.PI) / 180;
  
  const startX = radius * Math.cos(startRadian);
  const startY = radius * Math.sin(startRadian);
  const endX = radius * Math.cos(endRadian);
  const endY = radius * Math.sin(endRadian);

  const midAngle = ((startAngle + endAngle) / 2) * Math.PI / 180;
  const controlDistance = radius * 0.8;
  const controlX = controlDistance * Math.cos(midAngle);
  const controlY = controlDistance * Math.sin(midAngle);

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ transform: 'translateZ(0)' }}
    >
      <path
        d={`M ${startX + radius} ${startY + radius} Q ${controlX + radius} ${controlY + radius} ${endX + radius} ${endY + radius}`}
        fill="none"
        stroke="#4C78FF"
        strokeWidth="2"
        strokeDasharray="4 4"
        className="animate-dash"
      />
    </svg>
  );
};

const ModulesCircle = ({ modules }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerSize = isMobile ? 200 : 300;

  return (
    <div 
      className="relative mx-auto my-8"
      style={{ width: `${containerSize}px`, height: `${containerSize}px` }}
    >
      {modules.map((module, index) => (
        <ModuleCircle
          key={index}
          module={module}
          index={index}
          total={modules.length}
          isMobile={isMobile}
        />
      ))}
      {modules.map((_, index) => (
        <ModuleArrow
          key={index}
          startIndex={index}
          endIndex={(index + 1) % modules.length}
          total={modules.length}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
};

// =============== Main Component ===============

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCourseDetails = async () => {
      try {
        const response = await fetchCourseById(id);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course details:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourseDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFBFD]">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <Logo />
          <div className="animate-pulse mt-8">
            <div className="h-6 sm:h-8 w-24 sm:w-32 bg-[#F0F4FF] rounded mb-4 sm:mb-6" />
            <div className="h-10 sm:h-12 w-full bg-[#F0F4FF] rounded mb-4" />
            <div className="h-32 sm:h-48 w-full bg-[#F0F4FF] rounded mb-6" />
            <div className="space-y-4">
              <div className="h-20 sm:h-24 w-full bg-[#F0F4FF] rounded" />
              <div className="h-20 sm:h-24 w-full bg-[#F0F4FF] rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#FAFBFD]">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <Logo />
          <div className="mt-8">
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
              <div className="text-red-700">
                Course not found. Please check the URL or try again later.
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
            >
              <ChevronLeft />
              <span className="ml-2">Return to Dashboard</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <div className="flex flex-col space-y-6 sm:space-y-8 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <Logo />
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="text-[#001249] self-start sm:self-auto"
            >
              <ChevronLeft />
              <span className="ml-2 hidden sm:inline">Back to Dashboard</span>
            </Button>
          </div>

          <Card className="animate-slideUp">
            <CardHeader>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#001249]">{course.course_name}</h1>
              <p className="text-sm sm:text-base md:text-lg text-[#001249]/70">{course.description}</p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 sm:gap-4">
                <Badge className="animate-fadeIn">
                  <Users className="mr-1 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  {course.enrolled || '1.2k'} Students
                </Badge>
                <Badge className="animate-fadeIn">
                  <Star className="mr-1 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  {course.rating || '4.8'} Rating
                </Badge>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4 sm:space-y-6 animate-slideUp delay-200">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#001249]">Learning Paths</h2>
            <div className="grid gap-6 sm:gap-8">
              {course.learning_paths?.map((path, index) => (
                <Card 
                  key={path.id} 
                  className="hover:shadow-lg hover:-translate-y-1 cursor-pointer group transition-all duration-300"
                >
                  <CardHeader>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#4d5774]">
                      <button
                        onClick={() => navigate(`/learning-path/${path.id}`)}
                        className="text-center hover:text-[#4C78FF] transition-colors duration-200 w-full"
                      >
                        {path.path_name}
                      </button>
                    </h3>
                  </CardHeader>
                  {path.modules?.length > 0 && (
                    <CardContent>
                      <ModulesCircle modules={path.modules} />
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =============== Animations ===============

const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { 
      opacity: 0;
      transform: translateY(20px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 8;
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
  }

  .animate-slideUp {
    animation: slideUp 0.5s ease-out forwards;
  }

  .animate-dash {
    animation: dash 1s linear infinite;
  }

  .delay-200 {
    animation-delay: 0.2s;
  }
`;
document.head.appendChild(style);

export default CourseDetails;