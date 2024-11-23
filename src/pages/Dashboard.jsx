import React, { useEffect, useState } from 'react';
import { getUserProfile, fetchCourses, fetchCourseProgress, fetchAllModulesProgress2 } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, Award, User } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-sm border border-gray-100 ${className}`}>
    {children}
  </div>
);

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [courseProgress, setCourseProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [recentModules, setRecentModules] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchRecentModules = async () => {
      try {
        const response = await fetchAllModulesProgress2();
        console.log("Modules Progress Response:", response);

        if (!Array.isArray(response)) {
          console.error("Expected array response, got:", typeof response);
          return;
        }

        // Get the current user
        const userProfile = await getUserProfile();
        const currentUser = userProfile.data;

        console.log("Current user:", currentUser); // Debug log

        const completedModules = response
          .filter((module) =>
            module.completed === true &&
            module.user === currentUser.username  // Compare with username instead of entire user object
          )
          .sort((a, b) => new Date(b.completion_date) - new Date(a.completion_date));

        console.log("Current User's Completed Modules:", completedModules);
        setRecentModules(completedModules.slice(0, 5));
      } catch (error) {
        console.error("Error fetching recent modules:", error);
      }
    };

    const loadDashboardData = async () => {
      try {
        // Fetch user profile
        const userProfileResponse = await getUserProfile();
        setUser(userProfileResponse.data);

        // Fetch courses
        const coursesResponse = await fetchCourses();
        setCourses(coursesResponse.data);

        // Fetch recent modules
        await fetchRecentModules();

        // Fetch course progress for each course
        const progressPromises = coursesResponse.data.map(async (course) => {
          try {
            const progressResponse = await fetchCourseProgress(course.id);
            return { courseId: course.id, progress: progressResponse.data.progress_percentage || 0 };
          } catch (error) {
            console.error(`Error fetching progress for course ${course.id}`, error);
            return { courseId: course.id, progress: 0 }; // Default to 0 if error occurs
          }
        });

        const progressData = await Promise.all(progressPromises);

        // Map progress data by course ID
        const progressMap = progressData.reduce((acc, { courseId, progress }) => {
          acc[courseId] = progress;
          return acc;
        }, {});
        setCourseProgress(progressMap);

        setLoading(false);
      } catch (error) {
        console.error("Error loading dashboard data", error);
      }
    };

    loadDashboardData();
  }, []);



  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-b-2 border-t-2 border-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        {/* Welcome Header */}
        <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 p-8 text-white shadow-lg">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold">Welcome back, {user?.username}! 👋</h1>
            <p className="mt-2 text-blue-100">Here's Your Learning Progress And Available Courses.</p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 transform translate-x-1/3 -translate-y-1/3">
            <div className="absolute w-full h-full bg-white opacity-10 rounded-full"></div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="flex items-center p-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Courses</p>
                <p className="text-2xl font-bold">{courses.length}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center p-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Completed Modules</p>
                <p className="text-2xl font-bold">{recentModules.length}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center p-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Hours Spent</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center p-6">
              <div className="p-2 bg-orange-100 rounded-lg">
                <User className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Profile Level</p>
                <p className="text-2xl font-bold">Beginner</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Courses Section */}
          <div className="lg:col-span-2">
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-bold flex items-center mb-6">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Available Courses
                </h2>
                <div className="space-y-6">
                  {courses.map((course) => (
                    <div key={course.id} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-all duration-200">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{course.course_name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                        </div>
                        <button
                          onClick={() => navigate(`/course/${course.id}`)}
                          className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          Continue
                        </button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{courseProgress[course.id] || 0}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${courseProgress[course.id] || 0}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Activity Section */}
          <div>
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-bold flex items-center mb-6">
                  <Clock className="w-5 h-5 mr-2" />
                  Recent Activity
                </h2>
                {recentModules.length > 0 ? (
                  <div className="space-y-4">
                    {recentModules.map((module, index) => (
                      <div
                        key={`${module.user}-${module.module}-${module.completion_date}`}
                        className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Award className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="ml-4 flex-1">
                          <p className="text-sm font-medium text-gray-900">{module.module}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(module.completion_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-8">No recent activity</p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;