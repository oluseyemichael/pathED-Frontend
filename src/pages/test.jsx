import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchLearningPathDetail, fetchModuleDetail } from '../services/api';

const LearningPathDetail = () => {
  const { id } = useParams();
  const [learningPath, setLearningPath] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    try {
      if (url.includes('watch?v=')) {
        const videoId = url.split('v=')[1].split('&')[0];
        return `https://www.youtube.com/embed/${videoId}`;
      } else if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1];
        return `https://www.youtube.com/embed/${videoId}`;
      }
      return url;
    } catch (error) {
      console.error('Error processing YouTube URL:', error);
      return '';
    }
  };

  useEffect(() => {
    const loadLearningPathDetails = async () => {
      console.log('Attempting to load learning path with ID:', id); 
      if (!id) {
        setError('No learning path ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await fetchLearningPathDetail(id);
        
        if (!response?.data) {
          throw new Error('No data received from the server');
        }
        
        console.log('Learning path response:', response.data);
        setLearningPath(response.data);
        
        // Automatically select the first module if available
        if (response.data?.modules?.length > 0) {
          handleModuleClick(response.data.modules[0].id);
        }
      } catch (error) {
        console.error('Error fetching learning path:', error);
        setError(`Failed to load learning path details: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadLearningPathDetails();
  }, [id]);

  const handleModuleClick = async (moduleId) => {
    if (!moduleId) {
      console.error('No module ID provided');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log('Fetching module:', moduleId);
      const response = await fetchModuleDetail(moduleId);
      
      if (!response?.data) {
        throw new Error('No module data received');
      }
      
      console.log('Module response:', response.data);
      setSelectedModule(response.data);
    } catch (error) {
      console.error('Error fetching module:', error);
      setError(`Failed to load module details: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-600">{error}</p>
        <button 
          onClick={() => navigate(-1)}
          className="mt-4 text-blue-500 hover:underline"
        >
          Back to Course
        </button>
      </div>
    );
  }

  if (!learningPath) {
    return (
      <div className="p-4">
        <p className="text-gray-600">No learning path found.</p>
        <button 
          onClick={() => navigate(-1)}
          className="mt-4 text-blue-500 hover:underline"
        >
          Back to Course
        </button>
      </div>
    );
  }

  return (
    <div className="flex p-8">
      {/* Sidebar for Modules */}
      <div className="w-1/4 bg-gray-100 p-4 rounded-lg mr-8">
        <button 
          onClick={() => navigate(-1)} 
          className="text-blue-500 mb-4 hover:underline"
        >
          Back to Course
        </button>
        <h2 className="text-xl font-semibold mb-4">
          {learningPath?.path_name}
        </h2>
        <ul className="space-y-2">
          {learningPath.modules.map((module) => (
            <li
              key={module.id}
              className={`cursor-pointer p-2 rounded-md ${
                selectedModule?.id === module.id ? 'bg-blue-200' : 'hover:bg-blue-100'
              }`}
              onClick={() => handleModuleClick(module.id)}
            >
              {module.name || module.module_name}
            </li>
          ))}
        </ul>
      </div>

      {/* Right side for Video and Blog */}
      <div className="w-3/4 bg-white p-6 rounded-lg shadow-lg">
        {selectedModule ? (
          <div>
            <h3 className="text-2xl font-bold mb-4">
              {selectedModule.module_name}
            </h3>
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2">Topic:</h4>
              <p className="text-gray-600">{selectedModule.topic}</p>
            </div>
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2">Video</h4>
              {selectedModule.video_link ? (
                <iframe
                  className="w-full h-96"
                  src={getYouTubeEmbedUrl(selectedModule.video_link)}
                  title="Video Content"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <p>No video available</p>
              )}
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Blog</h4>
              {selectedModule.blog_link ? (
                <a
                  href={selectedModule.blog_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Read the Blog
                </a>
              ) : (
                <p>No blog content available</p>
              )}
            </div>
          </div>
        ) : (
          <p>Select a module to view content.</p>
        )}
      </div>
    </div>
  );
};

export default LearningPathDetail;