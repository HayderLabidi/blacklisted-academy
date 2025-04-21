
import React from 'react';
import { BookOpen, ArrowUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCourse } from '@/contexts/CourseContext';
import { toast } from 'sonner';

const courses = [
  {
    id: '1',
    title: "Trading Fundamentals Masterclass",
    description:
      "Master the essential concepts and build a solid foundation for successful trading.",
    level: "beginner",
    modules: 12,
    duration: "10 weeks",
    skills: ["Technical Analysis", "Risk Management", "Market Psychology", "Trading Strategies"]
  },
  {
    id: '2',
    title: "Advanced Chart Analysis",
    description:
      "Develop expert-level skills in reading and interpreting price action and patterns.",
    level: "intermediate",
    modules: 8,
    duration: "6 weeks",
    skills: ["Price Action", "Chart Patterns", "Market Structure", "Entry & Exit Strategies"]
  },
];

const Courses = () => {
  const { isAuthenticated } = useAuth();
  const { enrollInCourse } = useCourse();
  const navigate = useNavigate();

  const handleCourseClick = async (courseId: string) => {
    if (!isAuthenticated) {
      navigate('/sign-in');
      return;
    }

    try {
      await enrollInCourse(courseId);
      toast.success("Successfully enrolled in course!");
      navigate(`/course/${courseId}`);
    } catch (error) {
      toast.error("Failed to enroll in course. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-6 text-codecademy-purple-darkest">
              Trading Education that <span className="text-codecademy-purple">Works</span>
            </h1>
            <p className="text-lg text-codecademy-gray max-w-2xl mx-auto mb-8 text-balance">
              Learn trading through hands-on practice with real market scenarios. Join thousands of successful traders who've mastered the markets with our comprehensive courses.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20 bg-codecademy-gray-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="glass-panel hover:scale-[1.02] transition-all duration-300"
              >
                <div className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-codecademy-purple/10 rounded-full">
                      <BookOpen className="w-6 h-6 text-codecademy-purple" />
                    </div>
                    <span className="text-sm font-medium bg-codecademy-purple/10 px-4 py-1 rounded-full text-codecademy-purple">
                      {course.level}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-codecademy-purple-darkest">
                    {course.title}
                  </h3>
                  
                  <p className="text-codecademy-gray mb-6">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-codecademy-purple">
                        {course.modules} Modules
                      </span>
                    </div>
                    <span className="text-sm font-medium text-codecademy-purple">
                      {course.duration}
                    </span>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h4 className="font-medium text-codecademy-purple-darkest">
                      What you'll learn:
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {course.skills.map((skill, index) => (
                        <div
                          key={index}
                          className="text-sm text-codecademy-gray bg-codecademy-purple/5 px-3 py-2 rounded-lg"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleCourseClick(course.id)}
                    className="glass-button w-full"
                  >
                    {isAuthenticated ? 'Start Learning' : 'Sign In to Start'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-md mb-6 text-codecademy-purple-darkest">
              Ready to Start Your Trading Journey?
            </h2>
            <p className="text-lg text-codecademy-gray mb-8">
              Join our community of traders and start learning today.
            </p>
            <button 
              onClick={() => navigate('/sign-up')} 
              className="glass-button"
            >
              Get Started For Free
            </button>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <ArrowUp className="w-6 h-6 text-codecademy-purple" />
      </button>
    </div>
  );
};

export default Courses;
