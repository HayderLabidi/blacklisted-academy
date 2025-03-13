import React, { createContext, useContext, useState, useEffect } from 'react';

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

interface CourseContextType {
  courses: Course[];
  enrolledCourses: Course[];
  loading: boolean;
  error: string | null;
  getCourse: (id: string) => Course | undefined;
  enrollInCourse: (courseId: string) => Promise<void>;
  updateCourseProgress: (courseId: string, moduleId: string, completed: boolean) => Promise<void>;
  addCourse: (course: Omit<Course, 'id'>) => Promise<void>;
  updateCourse: (courseId: string, updates: Partial<Course>) => Promise<void>;
  deleteCourse: (courseId: string) => Promise<void>;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
};

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockCourses: Course[] = [
          {
            id: '1',
            title: 'Trading Fundamentals Masterclass',
            description: 'Master the essential concepts and build a solid foundation for successful trading.',
            instructor: 'John Smith',
            thumbnail: '/course-thumbnails/fundamentals.jpg',
            modules: [
              {
                id: '1',
                courseId: '1',
                title: 'Introduction to Trading',
                description: 'Learn the basics of trading and market structure.',
                videoUrl: 'https://example.com/video1',
                duration: '15:00',
                order: 1,
                isCompleted: true
              },
              {
                id: '2',
                courseId: '1',
                title: 'Understanding Market Structure',
                description: 'Deep dive into market structure and its importance in trading.',
                videoUrl: 'https://example.com/video2',
                duration: '20:00',
                order: 2,
                isCompleted: true
              },
              {
                id: '3',
                courseId: '1',
                title: 'Technical Analysis Basics',
                description: 'Introduction to technical analysis and chart reading.',
                videoUrl: 'https://example.com/video3',
                duration: '25:00',
                order: 3,
                isCompleted: false
              }
            ],
            level: 'beginner',
            price: 199,
            status: 'published',
            enrolledStudents: 45
          },
          {
            id: '2',
            title: 'Advanced Chart Analysis',
            description: 'Develop expert-level skills in reading and interpreting price action and patterns.',
            instructor: 'Sarah Johnson',
            thumbnail: '/course-thumbnails/chart-analysis.jpg',
            modules: [
              {
                id: '4',
                courseId: '2',
                title: 'Advanced Chart Patterns',
                description: 'Learn to identify and trade complex chart patterns.',
                videoUrl: 'https://example.com/video4',
                duration: '30:00',
                order: 1,
                isCompleted: true
              },
              {
                id: '5',
                courseId: '2',
                title: 'Price Action Trading',
                description: 'Master price action trading strategies.',
                videoUrl: 'https://example.com/video5',
                duration: '35:00',
                order: 2,
                isCompleted: false
              }
            ],
            level: 'intermediate',
            price: 299,
            status: 'published',
            enrolledStudents: 32
          }
        ];

        setCourses(mockCourses);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch courses');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const getCourse = (id: string) => {
    return courses.find(course => course.id === id);
  };

  const enrollInCourse = async (courseId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const course = getCourse(courseId);
      if (!course) throw new Error('Course not found');

      setEnrolledCourses(prev => [...prev, {
        ...course,
        progress: 0,
        lastAccessed: new Date().toISOString(),
        totalModules: course.modules.length,
        completedModules: 0
      }]);

      setCourses(prev => prev.map(c => 
        c.id === courseId 
          ? { ...c, enrolledStudents: c.enrolledStudents + 1 }
          : c
      ));
    } catch (err) {
      throw new Error('Failed to enroll in course');
    }
  };

  const updateCourseProgress = async (courseId: string, moduleId: string, completed: boolean) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setEnrolledCourses(prev => prev.map(course => {
        if (course.id !== courseId) return course;

        const updatedModules = course.modules.map(module =>
          module.id === moduleId ? { ...module, isCompleted: completed } : module
        );

        const completedModules = updatedModules.filter(m => m.isCompleted).length;
        const progress = (completedModules / course.modules.length) * 100;

        return {
          ...course,
          modules: updatedModules,
          progress,
          completedModules,
          lastAccessed: new Date().toISOString()
        };
      }));
    } catch (err) {
      throw new Error('Failed to update course progress');
    }
  };

  const addCourse = async (course: Omit<Course, 'id'>) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newCourse: Course = {
        ...course,
        id: Math.random().toString(36).substr(2, 9),
        enrolledStudents: 0
      };

      setCourses(prev => [...prev, newCourse]);
    } catch (err) {
      throw new Error('Failed to add course');
    }
  };

  const updateCourse = async (courseId: string, updates: Partial<Course>) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCourses(prev => prev.map(course =>
        course.id === courseId ? { ...course, ...updates } : course
      ));
    } catch (err) {
      throw new Error('Failed to update course');
    }
  };

  const deleteCourse = async (courseId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCourses(prev => prev.filter(course => course.id !== courseId));
      setEnrolledCourses(prev => prev.filter(course => course.id !== courseId));
    } catch (err) {
      throw new Error('Failed to delete course');
    }
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        enrolledCourses,
        loading,
        error,
        getCourse,
        enrollInCourse,
        updateCourseProgress,
        addCourse,
        updateCourse,
        deleteCourse
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}; 