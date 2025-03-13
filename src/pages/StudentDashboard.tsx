import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCourse } from '@/contexts/CourseContext';
import { BookOpen, BarChart, Clock, Award, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

const StudentDashboard = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { enrolledCourses, enrollInCourse } = useCourse();
  const [activeTab, setActiveTab] = useState('courses');

  const stats = {
    totalCourses: enrolledCourses.length,
    averageProgress: Math.round(
      enrolledCourses.reduce((acc, course) => acc + (course.progress || 0), 0) / enrolledCourses.length || 0
    ),
    totalModules: enrolledCourses.reduce((acc, course) => acc + (course.totalModules || 0), 0),
    completedModules: enrolledCourses.reduce((acc, course) => acc + (course.completedModules || 0), 0),
  };

  const handleEnroll = async (courseId: string) => {
    try {
      await enrollInCourse(courseId);
      toast.success('Successfully enrolled in course');
    } catch (error) {
      toast.error('Failed to enroll in course');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/lovable-uploads/logo-blt.png" className="h-8 w-auto" />
              <h1 className="text-xl font-bold">Student Dashboard</h1>
            </div>
            <button onClick={signOut} className="glass-button-outline">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-custom py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass-panel p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/10 rounded-full">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Enrolled Courses</p>
                <p className="text-2xl font-bold">{stats.totalCourses}</p>
              </div>
            </div>
          </div>
          <div className="glass-panel p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/10 rounded-full">
                <BarChart className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Average Progress</p>
                <p className="text-2xl font-bold">{stats.averageProgress}%</p>
              </div>
            </div>
          </div>
          <div className="glass-panel p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/10 rounded-full">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Modules</p>
                <p className="text-2xl font-bold">{stats.totalModules}</p>
              </div>
            </div>
          </div>
          <div className="glass-panel p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/10 rounded-full">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Completed Modules</p>
                <p className="text-2xl font-bold">{stats.completedModules}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeTab === 'courses'
                ? 'bg-white text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            My Courses
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeTab === 'progress'
                ? 'bg-white text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Progress
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeTab === 'certificates'
                ? 'bg-white text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Certificates
          </button>
        </div>

        {/* Tab Content */}
        <div className="glass-panel p-6">
          {activeTab === 'courses' && (
            <div>
              <h2 className="text-xl font-bold mb-6">My Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="glass-panel p-6">
                    <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500"
                            style={{ width: `${course.progress || 0}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-300 mt-2">
                          {Math.round(course.progress || 0)}% Complete
                        </p>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                    <p className="text-gray-400 mb-4">{course.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-400">
                        Instructor: {course.instructor}
                      </span>
                      <span className="text-sm text-gray-400">
                        Last accessed: {course.lastAccessed}
                      </span>
                    </div>
                    <button
                      onClick={() => navigate(`/course/${course.id}`)}
                      className="w-full glass-button flex items-center justify-center gap-2"
                    >
                      Continue Learning
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'progress' && (
            <div>
              <h2 className="text-xl font-bold mb-6">Learning Progress</h2>
              <div className="space-y-6">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="glass-panel p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold">{course.title}</h3>
                      <span className="text-sm text-gray-400">
                        {course.completedModules}/{course.totalModules} Modules
                      </span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500"
                        style={{ width: `${course.progress || 0}%` }}
                      />
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm text-gray-400">
                        Last accessed: {course.lastAccessed}
                      </span>
                      <button
                        onClick={() => navigate(`/course/${course.id}`)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Continue Learning
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'certificates' && (
            <div>
              <h2 className="text-xl font-bold mb-6">My Certificates</h2>
              <div className="text-center py-12">
                <Award className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-400">
                  Complete courses to earn certificates. Keep learning to unlock more achievements!
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard; 