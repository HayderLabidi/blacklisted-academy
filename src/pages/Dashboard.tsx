import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, PlayCircle, CheckCircle, Clock } from 'lucide-react';
import VideoPlayer from '@/components/VideoPlayer';

const courses = [
  {
    id: 1,
    title: "Trading Fundamentals Masterclass",
    progress: 60,
    lastAccessed: "2 days ago",
    modules: [
      {
        id: 1,
        title: "Introduction to Trading",
        duration: "15:00",
        completed: true,
        videoUrl: "https://example.com/video1"
      },
      {
        id: 2,
        title: "Market Structure Basics",
        duration: "20:00",
        completed: true,
        videoUrl: "https://example.com/video2"
      },
      {
        id: 3,
        title: "Risk Management Fundamentals",
        duration: "25:00",
        completed: false,
        videoUrl: "https://example.com/video3"
      }
    ]
  },
  {
    id: 2,
    title: "Advanced Chart Analysis",
    progress: 30,
    lastAccessed: "1 week ago",
    modules: [
      {
        id: 1,
        title: "Price Action Introduction",
        duration: "18:00",
        completed: true,
        videoUrl: "https://example.com/video4"
      },
      {
        id: 2,
        title: "Chart Patterns Deep Dive",
        duration: "22:00",
        completed: false,
        videoUrl: "https://example.com/video5"
      }
    ]
  }
];

const Dashboard = () => {
  const { signOut } = useAuth();
  const [currentVideo, setCurrentVideo] = useState<{
    courseId: number;
    moduleId: number;
    title: string;
    videoUrl: string;
  } | null>(null);

  const handleStartModule = (courseId: number, moduleId: number) => {
    const course = courses.find(c => c.id === courseId);
    const module = course?.modules.find(m => m.id === moduleId);
    
    if (module) {
      setCurrentVideo({
        courseId,
        moduleId,
        title: module.title,
        videoUrl: module.videoUrl
      });
    }
  };

  const handleCloseVideo = () => {
    setCurrentVideo(null);
  };

  const handleNextVideo = () => {
    if (!currentVideo) return;

    const course = courses.find(c => c.id === currentVideo.courseId);
    const currentModuleIndex = course?.modules.findIndex(m => m.id === currentVideo.moduleId);
    
    if (currentModuleIndex !== undefined && course?.modules[currentModuleIndex + 1]) {
      const nextModule = course.modules[currentModuleIndex + 1];
      setCurrentVideo({
        courseId: currentVideo.courseId,
        moduleId: nextModule.id,
        title: nextModule.title,
        videoUrl: nextModule.videoUrl
      });
    }
  };

  const handlePreviousVideo = () => {
    if (!currentVideo) return;

    const course = courses.find(c => c.id === currentVideo.courseId);
    const currentModuleIndex = course?.modules.findIndex(m => m.id === currentVideo.moduleId);
    
    if (currentModuleIndex !== undefined && course?.modules[currentModuleIndex - 1]) {
      const prevModule = course.modules[currentModuleIndex - 1];
      setCurrentVideo({
        courseId: currentVideo.courseId,
        moduleId: prevModule.id,
        title: prevModule.title,
        videoUrl: prevModule.videoUrl
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="container-custom py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="/lovable-uploads/logo-blt.png" className="h-8 w-auto" />
            <h1 className="text-xl font-bold">BLACKLISTED TRADERS</h1>
          </div>
          <button onClick={signOut} className="glass-button-outline">
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course List */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold mb-6">My Courses</h2>
            {courses.map((course) => (
              <div key={course.id} className="glass-panel p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/10 rounded-full">
                      <BookOpen size={20} />
                    </div>
                    <h3 className="text-xl font-semibold">{course.title}</h3>
                  </div>
                  <div className="text-sm text-gray-400">
                    Last accessed {course.lastAccessed}
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                  <div
                    className="bg-white h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <div className="text-sm text-gray-400 mb-4">
                  {course.progress}% Complete
                </div>

                {/* Modules */}
                <div className="space-y-3">
                  {course.modules.map((module) => (
                    <div
                      key={module.id}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                      onClick={() => handleStartModule(course.id, module.id)}
                    >
                      <div className="flex items-center space-x-3">
                        {module.completed ? (
                          <CheckCircle className="text-green-500" size={20} />
                        ) : (
                          <PlayCircle size={20} />
                        )}
                        <div>
                          <h4 className="font-medium">{module.title}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <Clock size={14} />
                            <span>{module.duration}</span>
                          </div>
                        </div>
                      </div>
                      {!module.completed && (
                        <button className="glass-button-outline text-sm">
                          Start
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Overview */}
            <div className="glass-panel p-6">
              <h3 className="text-lg font-semibold mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall Progress</span>
                    <span>45%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full"
                      style={{ width: '45%' }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Courses Completed</span>
                    <span>1/2</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full"
                      style={{ width: '50%' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-panel p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/10 rounded-full">
                    <PlayCircle size={16} />
                  </div>
                  <div>
                    <p className="text-sm">Watched "Market Structure Basics"</p>
                    <p className="text-xs text-gray-400">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/10 rounded-full">
                    <CheckCircle size={16} className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm">Completed "Introduction to Trading"</p>
                    <p className="text-xs text-gray-400">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Video Player */}
      {currentVideo && (
        <VideoPlayer
          videoUrl={currentVideo.videoUrl}
          title={currentVideo.title}
          onClose={handleCloseVideo}
          onNext={handleNextVideo}
          onPrevious={handlePreviousVideo}
        />
      )}
    </div>
  );
};

export default Dashboard; 