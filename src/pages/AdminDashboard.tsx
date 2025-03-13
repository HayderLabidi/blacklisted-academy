import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCourse } from '@/contexts/CourseContext';
import { Users, BookOpen, Video, Settings, BarChart, Plus, Edit2, Trash2, Upload, PlayCircle, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface Student {
  id: string;
  name: string;
  email: string;
  enrolledCourses: string[];
  progress: Record<string, number>;
  joinDate: string;
}

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

const AdminDashboard = () => {
  const { signOut } = useAuth();
  const { courses, addCourse, updateCourse, deleteCourse } = useCourse();
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [isAddingModule, setIsAddingModule] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [newCourse, setNewCourse] = useState<Omit<Course, 'id'>>({
    title: '',
    description: '',
    instructor: '',
    thumbnail: '',
    modules: [],
    level: 'beginner',
    price: 0,
    status: 'draft',
    enrolledStudents: 0
  });

  const [students] = useState<Student[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      enrolledCourses: ['1', '2'],
      progress: { '1': 65, '2': 30 },
      joinDate: '2024-03-01'
    },
    // Add more students as needed
  ]);

  const stats = {
    totalStudents: students.length,
    totalCourses: courses.length,
    totalRevenue: '$12,450',
    averageProgress: '65%',
  };

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addCourse(newCourse);
      setIsAddingCourse(false);
      setNewCourse({
        title: '',
        description: '',
        instructor: '',
        level: 'beginner',
        price: 0,
        thumbnail: '',
        modules: [],
        status: 'draft',
        enrolledStudents: 0
      });
      toast.success('Course added successfully');
    } catch (error) {
      toast.error('Failed to add course');
    }
  };

  const handleUpdateCourse = async (courseId: string, updates: Partial<Course>) => {
    try {
      await updateCourse(courseId, updates);
      toast.success('Course updated successfully');
    } catch (error) {
      toast.error('Failed to update course');
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await deleteCourse(courseId);
        toast.success('Course deleted successfully');
      } catch (error) {
        toast.error('Failed to delete course');
      }
    }
  };

  const handleAddModule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return;

    const formData = new FormData(e.target as HTMLFormElement);
    const newModule: Module = {
      id: Math.random().toString(36).substr(2, 9),
      courseId: selectedCourse.id,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      videoUrl: formData.get('videoUrl') as string,
      duration: formData.get('duration') as string,
      order: selectedCourse.modules.length + 1,
      isCompleted: false
    };

    try {
      await updateCourse(selectedCourse.id, {
        modules: [...selectedCourse.modules, newModule]
      });
      setIsAddingModule(false);
      setSelectedCourse(null);
      toast.success('Module added successfully');
    } catch (error) {
      toast.error('Failed to add module');
    }
  };

  const handleUpdateModule = async (courseId: string, moduleId: string, updates: Partial<Module>) => {
    try {
      const course = courses.find(c => c.id === courseId);
      if (!course) throw new Error('Course not found');

      const updatedModules = course.modules.map(module =>
        module.id === moduleId ? { ...module, ...updates } : module
      );

      await updateCourse(courseId, { modules: updatedModules });
      toast.success('Module updated successfully');
    } catch (error) {
      toast.error('Failed to update module');
    }
  };

  const handleDeleteModule = async (courseId: string, moduleId: string) => {
    if (window.confirm('Are you sure you want to delete this module?')) {
      try {
        const course = courses.find(c => c.id === courseId);
        if (!course) throw new Error('Course not found');

        const updatedModules = course.modules.filter(module => module.id !== moduleId);
        await updateCourse(courseId, { modules: updatedModules });
        toast.success('Module deleted successfully');
      } catch (error) {
        toast.error('Failed to delete module');
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="container-custom py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="/lovable-uploads/logo-blt.png" className="h-8 w-auto" />
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          <button onClick={signOut} className="glass-button-outline">
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-custom py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass-panel p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/10 rounded-full">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Students</p>
                <p className="text-2xl font-bold">{stats.totalStudents}</p>
              </div>
            </div>
          </div>
          <div className="glass-panel p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/10 rounded-full">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Courses</p>
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
                <p className="text-sm text-gray-400">Total Revenue</p>
                <p className="text-2xl font-bold">{stats.totalRevenue}</p>
              </div>
            </div>
          </div>
          <div className="glass-panel p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/10 rounded-full">
                <Video className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Average Progress</p>
                <p className="text-2xl font-bold">{stats.averageProgress}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeTab === 'overview'
                ? 'bg-white text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeTab === 'courses'
                ? 'bg-white text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Courses
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeTab === 'students'
                ? 'bg-white text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Students
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeTab === 'settings'
                ? 'bg-white text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Settings
          </button>
        </div>

        {/* Tab Content */}
        <div className="glass-panel p-6">
          {activeTab === 'courses' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Course Management</h2>
                <button 
                  onClick={() => setIsAddingCourse(true)}
                  className="glass-button flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add New Course
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <div key={course.id} className="glass-panel p-6">
                    <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          course.status === 'published'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {course.status}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                    <p className="text-gray-400 mb-4">{course.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-400">
                        {course.modules.length} Modules
                      </span>
                      <span className="text-sm text-gray-400">
                        {course.enrolledStudents} Students
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">
                        ${course.price}
                      </span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setSelectedCourse(course);
                            setIsAddingModule(true);
                          }}
                          className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleUpdateCourse(course.id, { status: course.status === 'published' ? 'draft' : 'published' })}
                          className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteCourse(course.id)}
                          className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div>
              <h2 className="text-xl font-bold mb-6">Student Management</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-white/10">
                      <th className="pb-4">Name</th>
                      <th className="pb-4">Email</th>
                      <th className="pb-4">Courses</th>
                      <th className="pb-4">Progress</th>
                      <th className="pb-4">Join Date</th>
                      <th className="pb-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} className="border-b border-white/10">
                        <td className="py-4">{student.name}</td>
                        <td className="py-4">{student.email}</td>
                        <td className="py-4">{student.enrolledCourses.length}</td>
                        <td className="py-4">
                          {Object.values(student.progress).reduce((a, b) => a + b, 0) / Object.keys(student.progress).length}%
                        </td>
                        <td className="py-4">{student.joinDate}</td>
                        <td className="py-4">
                          <button className="text-blue-400 hover:text-blue-300">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-xl font-bold mb-6">Admin Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Profile Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Admin Email
                      </label>
                      <input
                        type="email"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                        defaultValue="admin@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                        placeholder="Change password"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">Platform Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Enable New Registrations</span>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-white/10">
                        <span className="sr-only">Enable new registrations</span>
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Maintenance Mode</span>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-white/10">
                        <span className="sr-only">Enable maintenance mode</span>
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Add Course Modal */}
      {isAddingCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="glass-panel w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Add New Course</h2>
              <button 
                onClick={() => setIsAddingCourse(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddCourse} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Course Title
                </label>
                <input
                  type="text"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Description
                </label>
                <textarea
                  value={newCourse.description}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                  rows={4}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Level
                  </label>
                  <select 
                    value={newCourse.level}
                    onChange={(e) => setNewCourse(prev => ({ ...prev, level: e.target.value as 'beginner' | 'intermediate' | 'advanced' }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Price
                  </label>
                  <input
                    type="number"
                    value={newCourse.price}
                    onChange={(e) => setNewCourse(prev => ({ ...prev, price: Number(e.target.value) }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Thumbnail
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="thumbnail-upload"
                  />
                  <label
                    htmlFor="thumbnail-upload"
                    className="glass-button-outline flex items-center gap-2 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Thumbnail
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsAddingCourse(false)}
                  className="glass-button-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="glass-button">
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Module Modal */}
      {isAddingModule && selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="glass-panel w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Add New Module to {selectedCourse.title}</h2>
              <button 
                onClick={() => {
                  setIsAddingModule(false);
                  setSelectedCourse(null);
                }}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddModule} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Module Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                  rows={4}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Video URL
                </label>
                <input
                  type="url"
                  name="videoUrl"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  placeholder="e.g., 15:00"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingModule(false);
                    setSelectedCourse(null);
                  }}
                  className="glass-button-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="glass-button">
                  Add Module
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; 