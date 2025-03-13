import React, { useRef, useEffect } from "react";
import { BookOpen, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCourse } from "@/contexts/CourseContext";
import { toast } from "sonner";

const courses = [
  {
    id: '1',
    title: "Trading Fundamentals Masterclass",
    description:
      "Master the essential concepts and build a solid foundation for successful trading.",
    level: "beginner",
    modules: 12,
    duration: "10 weeks",
    features: [
      "Market structure analysis",
      "Risk management",
      "Technical indicators",
      "Trading psychology",
    ],
  },
  {
    id: '2',
    title: "Advanced Chart Analysis",
    description:
      "Develop expert-level skills in reading and interpreting price action and patterns.",
    level: "intermediate",
    modules: 8,
    duration: "6 weeks",
    features: [
      "Price action",
      "Chart patterns",
      "Multiple timeframe analysis",
      "Entry & exit strategies",
    ],
  },
];

const CourseSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();
  const { enrollInCourse } = useCourse();
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    const elementsToObserve =
      sectionRef.current?.querySelectorAll(".course-card");
    elementsToObserve?.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      elementsToObserve?.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

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
    <section id="courses" className="section-spacing bg-gray-300" ref={sectionRef}>
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm uppercase tracking-widest text-gray-600 mb-4">
            Trading Education
          </p>
          <h2 className="heading-lg mb-6 text-black">
            Premium Trading Courses
          </h2>
          <p className="text-lg text-gray-600 text-balance">
            Comprehensive courses designed to transform beginners into confident
            traders and help experienced traders reach new heights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto max-w-4xl">
          {courses.map((course) => (
            <div
              key={course.id}
              className="course-card bg-white rounded-2xl shadow-lg p-8 border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gray-100 rounded-full">
                  <BookOpen size={20} className="text-gray-700" />
                </div>
                <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                  {course.level}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-3 text-black">
                {course.title}
              </h3>
              <p className="text-gray-600 mb-6">{course.description}</p>

              <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{course.modules} Modules</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{course.duration}</span>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {course.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-gray-700" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleCourseClick(course.id)}
                className="bg-black text-white px-6 py-3 rounded-full w-full flex justify-center hover:bg-gray-800 transition-colors"
              >
                {isAuthenticated ? 'Enroll Now' : 'Sign In to Enroll'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseSection;