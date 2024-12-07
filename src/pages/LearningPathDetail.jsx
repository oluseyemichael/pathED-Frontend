import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchLearningPathDetail, fetchModuleDetail, updateModuleProgress, updateQuizScore, fetchLearningPathProgress, fetchModuleProgress, fetchAllModulesProgress, fetchNextLearningPath } from '../services/api';
import Progress from '../components/Progress';
import { Card, CardContent } from '../components/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/Tabs';
import VideoPlayer from "../components/VideoPlayer";
import { ChevronLeft, ChevronRight, Clock, Video, FileText, Menu, X, Check } from 'lucide-react';

const LearningPathDetail = () => {
  const { id } = useParams();
  console.log("Learning Path ID:", id);
  const [learningPath, setLearningPath] = useState(null);
  const [selectedModuleContent, setSelectedModuleContent] = useState(null);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [learningPathProgress, setLearningPathProgress] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizMessage, setQuizMessage] = useState("");
  const [videoProgress, setVideoProgress] = useState({});
  const [moduleCompletionStatus, setModuleCompletionStatus] = useState({});

  const navigate = useNavigate();

  const handleVideoCompletion = async (moduleId) => {
    try {
      const response = await updateModuleProgress(moduleId, {
        video_watched: true,
      });

      console.log("Video marked as watched:", response.data);

      // Update local storage to persist watched status
      localStorage.setItem(`video_watched_${moduleId}`, "true");

      // Refresh learning path progress
      await fetchProgressData();
    } catch (error) {
      console.error("Error updating video progress:", error);
    }
  };


  // Function to fetch learning path details and progress
  const fetchAndLoadProgress = async () => {
    try {
      const learningPathResponse = await fetchLearningPathDetail(id); // Fetch learning path using `id`
      setLearningPath(learningPathResponse.data);

      const modulesResponse = await fetchModuleProgress(id); // Fetch module progress
      console.log("Modules Response:", modulesResponse);

      if (Array.isArray(modulesResponse)) {
        modulesResponse.forEach((module) => {
          // Handle video progress
          if (module.video_watched) {
            setVideoProgress((prev) => ({
              ...prev,
              [module.module__module_name]: true,
            }));
          }

          // Handle module completion
          if (module.completed) {
            setModuleCompletionStatus((prev) => ({
              ...prev,
              [module.module__module_name]: true,
            }));
          }
        });
      } else {
        console.error("Modules response is not an array:", modulesResponse);
      }
    } catch (error) {
      console.error("Error loading saved progress:", error);
    }
  };

  // Ensure useEffect has correct dependencies and checks for `id`
  useEffect(() => {
    if (id) {
      fetchAndLoadProgress();
    }
  }, [id]);



  // Load saved progress on component mount
  const loadSavedProgress = async () => {
    try {
      const progressData = await fetchModuleProgress(id);
      console.log("Fetched Module Progress:", progressData);

      if (Array.isArray(progressData)) {
        const savedModuleCompletion = {};

        // Map backend progress to frontend moduleCompletionStatus
        progressData.forEach((module) => {
          savedModuleCompletion[module.module__module_name] = module.completed;
        });

        // Update module completion status
        setModuleCompletionStatus(savedModuleCompletion);

        console.log("Updated Module Completion Status:", savedModuleCompletion);
      } else {
        console.error("Unexpected progress data format:", progressData);
      }
    } catch (error) {
      console.error("Error loading saved progress:", error);
    }
  };


  useEffect(() => {
    if (learningPath) {
      loadSavedProgress();
    }
  }, [id, learningPath]);



  useEffect(() => {
    console.log("Learning Path ID:", id);
    if (learningPath) {
      loadSavedProgress();
    }
  }, [id, learningPath]);






  useEffect(() => {
    const loadLearningPathDetails = async () => {
      try {
        const response = await fetchLearningPathDetail(id);
        setLearningPath(response.data);

        // Fetch the learning path progress
        const progressResponse = await fetchLearningPathProgress(id);
        setLearningPathProgress(progressResponse.data.progress_percentage || 0);
      } catch (error) {
        console.error("Error fetching learning path details:", error);
      } finally {
        setLoading(false);
      }
    };
    loadLearningPathDetails();
  }, [id]);

  const fetchProgressData = async () => {
    try {
      const response = await fetchLearningPathProgress(id); // Fetch learning path progress
      console.log("Fetched Learning Path Progress:", response.data);
      setLearningPathProgress(response.data.progress_percentage || 0);
    } catch (error) {
      console.error("Error fetching progress data:", error);
    }
  };

  useEffect(() => {
    fetchProgressData(); // Fetch progress when the component loads
  }, [id]);



  // Modified handleModuleClick to load saved progress
  const handleModuleClick = async (moduleName, index) => {
    try {
      setQuizMessage("");
      setUserAnswers({});
      console.log(`Fetching details for module: ${moduleName}`);

      const response = await fetchModuleDetail(moduleName);
      console.log("Fetched Module Data:", response.data);
      const moduleData = response.data;

      if (!moduleData || !moduleData.id) {
        console.error("Module data is incomplete:", moduleData);
        return;
      }

      // Load saved quiz state
      const savedQuizState = localStorage.getItem(`quiz_${moduleData.id}`);
      if (savedQuizState) {
        const parsedState = JSON.parse(savedQuizState);
        setQuizCompleted(parsedState.completed);
        setQuizMessage(parsedState.message);
      }

      setSelectedModuleContent(moduleData);
      setCurrentModuleIndex(index);
      setShowSidebar(false);

      if (moduleData.quizzes) {
        setQuizData(moduleData.quizzes);
      } else {
        setQuizData(null);
      }
    } catch (error) {
      console.error('Error fetching module details:', error);
    }
  };


  const handleNextModule = async () => {
    if (currentModuleIndex < learningPath.modules.length - 1) {
      try {
        // Move to the next module
        const nextModuleName = learningPath.modules[currentModuleIndex + 1];
        const response = await fetchModuleDetail(nextModuleName); // Fetch details of the next module
        const nextModuleData = response.data;

        // Update selected module content
        setSelectedModuleContent(nextModuleData);

        // Update current module index
        setCurrentModuleIndex(currentModuleIndex + 1);

        // Handle quiz data if available
        if (nextModuleData.quizzes) {
          setQuizData(nextModuleData.quizzes);
        } else {
          setQuizData(null);
        }

        // Clear quiz-related states
        setQuizCompleted(false);
        setQuizMessage("");
        setUserAnswers({});
      } catch (error) {
        console.error("Error fetching the next module details:", error);
      }
    } else {
      // Last module reached
      await handleNextLearningPath();
    }
  };

  const handleNextLearningPath = async () => {
    try {
      const nextLearningPath = await fetchNextLearningPath(learningPath.id); // Fetch the next learning path
      if (nextLearningPath) {
        console.log("Next Learning Path:", nextLearningPath.id);

        // Reset state before navigating to the new learning path
        setSelectedModuleContent(null);
        setCurrentModuleIndex(0);
        setQuizData(null);
        setQuizCompleted(false);
        setQuizMessage("");
        setUserAnswers({});
        setModuleCompletionStatus({});
        setVideoProgress({});

        navigate(`/learning-path/${nextLearningPath.id}`); // Navigate to the next learning path
      } else {
        console.log("No more learning paths available!");
        alert("No next learning path found.");
      }
    } catch (error) {
      console.error("Error fetching the next learning path:", error);
      alert("An error occurred while fetching the next learning path.");
    }
  };


  const handlePreviousModule = () => {
    // Navigate to the previous module
    if (currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1);
      handleModuleClick(learningPath.modules[currentModuleIndex - 1], currentModuleIndex - 1);
    } else {
      // Reached the beginning of the learning path, handle accordingly
      console.log('Reached the beginning of the learning path');
    }
  };


  const handleQuizSubmit = async (quizId) => {
    try {
      if (!selectedModuleContent || !selectedModuleContent.quizzes) {
        console.error("No quiz data available.");
        return;
      }

      const answers = Object.keys(userAnswers).map((questionId) => ({
        question_id: parseInt(questionId),
        answer_id: userAnswers[questionId],
      }));

      console.log("Submitting answers:", answers);

      // Call API to submit quiz answers
      const response = await updateQuizScore(quizId, answers);
      console.log("Quiz submission response:", response);

      if (!response || response.completed === undefined) {
        throw new Error("Unexpected response structure from quiz submission.");
      }

      const quizState = {
        completed: response.completed,
        score: response.score.toFixed(1),
        message: response.completed
          ? `You have passed the quiz! Your Score - ${response.score.toFixed(1)}%`
          : `You did not pass the quiz. Please try again. Your Score - ${response.score.toFixed(1)}%`,
      };

      // Save quiz state in localStorage
      localStorage.setItem(`quiz_${quizId}`, JSON.stringify(quizState));

      // Update UI
      setQuizCompleted(quizState.completed);
      setQuizMessage(quizState.message);

      if (quizState.completed) {
        console.log("Updating module progress...");
        await updateModuleProgress(selectedModuleContent.id, { quiz_completed: true });

        // Check if the module is complete
        const moduleResponse = await fetchModuleProgress(selectedModuleContent.id);
        if (moduleResponse?.data?.completed) {
          // Update state to reflect completion
          setModuleCompletionStatus((prev) => ({
            ...prev,
            [selectedModuleContent.id]: true,
          }));
          localStorage.setItem(`module_completion_${selectedModuleContent.id}`, "true");
        }

        // Refresh learning path progress
        await fetchProgressData();
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      setQuizMessage("An error occurred while submitting the quiz. Please try again.");
    }
  };



  useEffect(() => {
    if (selectedModuleContent && Array.isArray(selectedModuleContent.quizzes) && selectedModuleContent.quizzes.length > 0) {
      const savedQuizState = JSON.parse(
        localStorage.getItem(`quiz_${selectedModuleContent.quizzes[0].id}`)
      );
      if (savedQuizState) {
        setQuizCompleted(savedQuizState.completed || false);
        setQuizMessage(savedQuizState.message || "");
      }
    } else {
      // Reset quiz state if there are no quizzes for the selected module
      setQuizCompleted(false);
      setQuizMessage("");
    }
  }, [selectedModuleContent]);




  // Handle quiz answer selection
  const handleAnswerSelect = (questionId, answerId) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answerId,
    }));
  };


  const toggleSidebar = () => {
    setShowSidebar((prevState) => !prevState);
  };

  const isModuleCompleted = (moduleName) => {
    return moduleCompletionStatus[moduleName] || false; // Default to false if not found
  };

  // Function to check if all modules in the learning path are completed
  const isPathCompleted = () => {
    if (!learningPath || !learningPath.modules) {
      return false;
    }
    return learningPath.modules.every((moduleName) =>
      moduleCompletionStatus[moduleName]
    );
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-b-2 border-t-2 border-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Curating Modules...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => {
              setSelectedModuleContent(null); // Reset selected module
              setCurrentModuleIndex(0); // Reset the module index
              setQuizData(null); // Clear quiz data
              setQuizCompleted(false); // Reset quiz state
              setQuizMessage(""); // Clear quiz message
              setUserAnswers({}); // Clear quiz answers
              setModuleCompletionStatus({}); // Reset module completion status
              setVideoProgress({}); // Reset video progress
              navigate(-1); // Navigate back
            }}
            className="flex items-center text-gray-600 hover:text-gray-900 lg:mr-4"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </button>

          <div className="ml-auto flex items-center space-x-4">
            {/* <h1 className="text-2xl font-bold">{learningPath?.path_name}</h1> */}
            <div className="flex items-center">
              <Progress value={learningPathProgress} className="w-32" />
              <span className="text-sm text-gray-600">{learningPathProgress}% Complete</span>
            </div>
            <button
              className="lg:hidden"
              onClick={toggleSidebar}
            >
              {showSidebar ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <div className={`col-span-3 bg-white rounded-lg shadow transition-all duration-300 ease-in-out fixed inset-0 z-50 lg:static lg:translate-x-0 ${showSidebar ? 'translate-x-0' : '-translate-x-full'
          }`}>
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center">
              <img src="/src/assets/logo.svg" alt="Logo" className="h-8 mr-2" />
            </div>
            <button
              className="lg:hidden"
              onClick={toggleSidebar}
            >
              {showSidebar ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>


          {learningPath && (
            <div className="space-y-4 px-6 pb-6">
              <h1 className="text-2xl font-semibold text-gray-900">{learningPath.path_name}</h1>
              <div className="space-y-2">
                {learningPath.modules.map((moduleName, index) => (
                  <Card
                    key={index}
                    onClick={() => handleModuleClick(moduleName, index)}
                    className={`cursor-pointer transition-all ${currentModuleIndex === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'hover:border-gray-300'
                      }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${isModuleCompleted(moduleName)
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-400'
                            }`}
                        >
                          {isModuleCompleted(moduleName) ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <span>{index + 1}</span>
                          )}
                        </div>
                        <span
                          className={`font-medium ${isModuleCompleted(moduleName) ? 'text-blue-600' : 'text-gray-800'
                            }`}
                        >
                          {moduleName}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="col-span-12 sm:col-span-9 md:col-span-12 lg:col-start-4 lg:col-span-9 px-0 sm:px-0 lg:px-0">
          {selectedModuleContent ? (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">{selectedModuleContent.module_name}</h2>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="w-5 h-5" />
                      <span>{selectedModuleContent.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Video className="w-5 h-5" />
                      <span>Pre-recorded video</span>
                    </div>
                  </div>

                  <Tabs defaultValue="discussions">
                    <TabsList>
                      {/* Changed "Discussions" to "Video" in discussions tab */}
                      <TabsTrigger value="discussions">Video</TabsTrigger>
                      <TabsTrigger value="resources">Resources</TabsTrigger>
                      <TabsTrigger value="quiz">Quiz</TabsTrigger>
                      <TabsTrigger value="notes">Notes</TabsTrigger>
                    </TabsList>

                    <TabsContent value="discussions">
                      {selectedModuleContent.video_link && (
                        <div className="aspect-w-16 aspect-h-9 mb-6">

                          <VideoPlayer className="w-full h-[500px] rounded-lg border-0"
                            videoLink={selectedModuleContent.video_link}
                            moduleId={selectedModuleContent.id}
                            onVideoWatched={handleVideoCompletion}
                          />
                        </div>
                      )}

                      <div className="space-y-4">
                        {/* Discussion section removed */}
                      </div>
                    </TabsContent>

                    <TabsContent value="resources">
                      <div className="space-y-4">
                        {selectedModuleContent.blog_link && (
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-start space-x-4">
                              <FileText className="w-6 h-6 text-blue-500" />
                              <div>
                                <h4 className="font-medium">Related Blog Post</h4>
                                <p className="text-sm text-gray-600">
                                  <a
                                    href={selectedModuleContent.blog_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                  >
                                    {selectedModuleContent.blog_link}
                                  </a>
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="quiz">
                      <div className="space-y-4">
                        {selectedModuleContent?.quizzes?.length > 0 ? (
                          selectedModuleContent.quizzes.map((quiz) => (
                            <div key={quiz.id} className="mb-6">
                              <h2 className="text-xl font-bold text-gray-800">{quiz.quiz_name}</h2>
                              {quiz.questions.length > 0 ? (
                                quiz.questions.map((question) => (
                                  <div key={question.id} className="mb-4">
                                    <h3 className="font-semibold text-lg">{question.question_text}</h3>
                                    <ul className="mt-2">
                                      {question.answers.map((answer) => (
                                        <li key={answer.id} className="mb-2">
                                          <label>
                                            <input
                                              type="radio"
                                              name={`quiz_${quiz.id}_question_${question.id}`}
                                              value={answer.id}
                                              checked={userAnswers[question.id] === answer.id}
                                              onChange={() => handleAnswerSelect(question.id, answer.id)}
                                              className="mr-2"
                                            />
                                            {answer.answer_text}
                                          </label>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))
                              ) : (
                                <p className="text-gray-500">No questions available for this quiz.</p>
                              )}
                              <button
                                onClick={() => handleQuizSubmit(quiz.id)}
                                className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
                              >
                                Submit Quiz
                              </button>
                              {quizMessage && (
                                <p
                                  className={`mt-4 ${quizCompleted ? "text-green-500" : "text-red-500"
                                    } font-semibold`}
                                >
                                  {quizMessage}
                                </p>
                              )}
                            </div>
                          ))
                        ) : (
                          <p>No quiz available for this module.</p>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="notes">
                      <div className="prose max-w-none">
                        <textarea
                          className="w-full h-32 p-4 border rounded-lg resize-none"
                          placeholder="Take notes during the lecture..."
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>

              <div className="flex justify-between">
                {currentModuleIndex > 0 && (
                  <button
                    onClick={handlePreviousModule}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-medium px-6 py-3 rounded-lg flex items-center space-x-2"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span>Previous Module</span>
                  </button>
                )}
                {currentModuleIndex < learningPath.modules.length - 1 ? (
                  <button
                    onClick={handleNextModule}
                    disabled={!isModuleCompleted(selectedModuleContent?.module_name)}
                    className={`font-medium px-6 py-3 rounded-lg flex items-center space-x-2 transition-all ${isModuleCompleted(selectedModuleContent?.module_name)
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                  >
                    <span>Next Module</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  // Show "Next Learning Path" button only if it's the last module in the path
                  <button
                    onClick={handleNextLearningPath}
                    disabled={!isPathCompleted()}
                    className={`font-medium px-6 py-3 rounded-lg flex items-center space-x-2 transition-all ${isPathCompleted()
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                  >
                    <span>Next Learning Path</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-500">Select a module to view its content</p>
            </div>
          )}
        </div>
      </div>
    </div >
  );
};

export default LearningPathDetail;