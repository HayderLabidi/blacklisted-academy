import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PlayCircle, ChevronRight, ChevronLeft, CheckCircle2, Lock } from 'lucide-react';
import { useCourse } from '@/contexts/CourseContext';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  order: number;
  isCompleted?: boolean;
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  modules: Module[];
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  status: 'draft' | 'published';
  enrolledStudents: number;
  progress?: number;
  lastAccessed?: string;
  totalModules?: number;
  completedModules?: number;
}

const CourseViewer = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { getCourse, updateCourseProgress, enrolledCourses } = useCourse();
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const course = getCourse(courseId || '');
  const enrolledCourse = enrolledCourses.find(c => c.id === courseId);

  useEffect(() => {
    if (!course) {
      toast.error('Course not found');
      navigate(isAdmin ? '/admin' : '/dashboard');
    }
  }, [course, navigate, isAdmin]);

  if (!course) {
    return null;
  }

  const currentModule = course.modules[currentModuleIndex];
  const nextModule = course.modules[currentModuleIndex + 1];
  const prevModule = currentModuleIndex > 0 ? course.modules[currentModuleIndex - 1] : null;

  const handleNextModule = async () => {
    if (nextModule) {
      try {
        await updateCourseProgress(course.id, currentModule.id, true);
        setCurrentModuleIndex(currentModuleIndex + 1);
        setIsVideoPlaying(false);
      } catch (error) {
        toast.error('Failed to update progress');
      }
    }
  };

  const handlePrevModule = () => {
    if (prevModule) {
      setCurrentModuleIndex(currentModuleIndex - 1);
      setIsVideoPlaying(false);
    }
  };

  const handleModuleClick = (index: number) => {
    if (index <= currentModuleIndex || enrolledCourse?.modules[index]?.isCompleted) {
      setCurrentModuleIndex(index);
      setIsVideoPlaying(false);
    } else {
      toast.error('Complete previous modules first');
    }
  };

  const progress = enrolledCourse?.progress || 0;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">{course.title}</h1>
              <p className="text-gray-400">Instructor: {course.instructor}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-400">Course Progress</p>
                <p className="text-lg font-bold">{Math.round(progress)}%</p>
              </div>
              <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
              <div className="w-full h-full flex items-center justify-center">
                {isVideoPlaying ? (
                  <video
                    src={currentModule.videoUrl}
                    controls
                    className="w-full h-full"
                    onEnded={() => setIsVideoPlaying(false)}
                  />
                ) : (
                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    className="p-8 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <PlayCircle className="w-16 h-16" />
                  </button>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{currentModule.title}</h2>
              <span className="text-gray-400">{currentModule.duration}</span>
            </div>
            <p className="text-gray-400 mb-8">{currentModule.description}</p>
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevModule}
                disabled={!prevModule}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  prevModule
                    ? 'bg-white/10 hover:bg-white/20'
                    : 'bg-white/5 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Module
              </button>
              <button
                onClick={handleNextModule}
                disabled={!nextModule}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  nextModule
                    ? 'bg-white/10 hover:bg-white/20'
                    : 'bg-white/5 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next Module
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Module List */}
          <div className="lg:col-span-1">
            <div className="glass-panel p-6">
              <h3 className="text-lg font-bold mb-4">Course Modules</h3>
              <div className="space-y-2">
                {course.modules.map((module, index) => (
                  <button
                    key={module.id}
                    onClick={() => handleModuleClick(index)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      index === currentModuleIndex
                        ? 'bg-white/10'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      {enrolledCourse?.modules[index]?.isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : index > currentModuleIndex ? (
                        <Lock className="w-5 h-5 text-gray-500" />
                      ) : (
                        <PlayCircle className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium">{module.title}</p>
                      <p className="text-sm text-gray-400">{module.duration}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseViewer; 