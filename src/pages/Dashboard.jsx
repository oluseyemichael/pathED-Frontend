import React, { useEffect, useState } from 'react';
import { getUserProfile, fetchCourses } from '../services/api';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Fetch user profile data
        const userProfileResponse = await getUserProfile();
        setUser(userProfileResponse.data);

        // Fetch available courses
        const coursesResponse = await fetchCourses();
        setCourses(coursesResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Error loading dashboard data", error);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading dashboard...</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <header className="bg-blue-600 text-white p-6 rounded-lg mb-8">
        <h1 className="text-2xl font-semibold">Welcome, {user?.username}!</h1>
        <p className="mt-2">Here’s your learning progress and available courses.</p>
      </header>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-700">Your Profile</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg mt-4">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-700">Available Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {courses.map(course => (
            <div key={course.id} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
              <p className="text-gray-600 mt-2">{course.description}</p>

              <div className="mt-4">
                <p><strong>Progress:</strong> {user.progress_data.find(progress => progress.course === course.id)?.progress_percentage || 0}%</p>
              </div>

              <button
                className="mt-4 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={() => alert(`Start learning ${course.title}`)}
              >
                Continue Course
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
