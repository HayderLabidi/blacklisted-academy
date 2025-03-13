import React from 'react';
import { BookOpen, CheckCircle, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
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

const team = [
  {
    name: "John Doe",
    role: "Senior Trading Analyst",
    bio: "With over 10 years of experience, John specializes in technical analysis and risk management.",
    image: "/lovable-uploads/timesta.png",
    social: {
      twitter: "https://twitter.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      instagram: "https://instagram.com/johndoe",
    },
  },
  {
    name: "Jane Smith",
    role: "Market Strategist",
    bio: "Jane is an expert in macroeconomic trends and their impact on financial markets.",
    image: "/lovable-uploads/spayzer.png",
    social: {
      twitter: "https://twitter.com/janesmith",
      linkedin: "https://linkedin.com/in/janesmith",
      instagram: "https://instagram.com/janesmith",
    },
  },
  {
    name: "Alex Johnson",
    role: "Algorithmic Trading Expert",
    bio: "Alex develops advanced trading algorithms and automated strategies.",
    image: "/lovable-uploads/motaz.png",
    social: {
      twitter: "https://twitter.com/alexjohnson",
      linkedin: "https://linkedin.com/in/alexjohnson",
      instagram: "https://instagram.com/alexjohnson",
    },
  },
  {
    name: "Emily Brown",
    role: "Trading Psychologist",
    bio: "Emily helps traders overcome psychological barriers and improve decision-making.",
    image: "/lovable-uploads/ibrahim.png",
    social: {
      twitter: "https://twitter.com/emilybrown",
      linkedin: "https://linkedin.com/in/emilybrown",
      instagram: "https://instagram.com/emilybrown",
    },
  },
  {
    name: "Michael Lee",
    role: "Options Trading Specialist",
    bio: "Michael is a seasoned options trader with a focus on volatility strategies.",
    image: "/lovable-uploads/yassin.png",
    social: {
      twitter: "https://twitter.com/michaellee",
      linkedin: "https://linkedin.com/in/michaellee",
      instagram: "https://instagram.com/michaellee",
    },
  },
  {
    name: "Sarah Wilson",
    role: "Cryptocurrency Analyst",
    bio: "Sarah provides insights into the fast-evolving world of cryptocurrencies.",
    image: "/lovable-uploads/hmzed.png",
    social: {
      twitter: "https://twitter.com/sarahwilson",
      linkedin: "https://linkedin.com/in/sarahwilson",
      instagram: "https://instagram.com/sarahwilson",
    },
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
    <div className="min-h-screen bg-black text-white pt-24">
      {/* Courses Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold mb-6">Premium Trading Courses</h1>
            <p className="text-gray-400">
              Comprehensive courses designed to transform beginners into confident
              traders and help experienced traders reach new heights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto max-w-4xl">
            {courses.map((course) => (
              <div
                key={course.id}
                className="glass-panel p-8 rounded-2xl border border-white/10"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-white/10 rounded-full">
                    <BookOpen size={20} />
                  </div>
                  <span className="text-sm font-medium bg-white/10 px-3 py-1 rounded-full">
                    {course.level}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3">{course.title}</h3>
                <p className="text-gray-400 mb-6">{course.description}</p>

                <div className="flex items-center justify-between mb-6">
                  <div className="text-sm text-gray-400">
                    <span className="font-medium">{course.modules} Modules</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    <span className="font-medium">{course.duration}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {course.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle size={16} className="text-blue-500" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleCourseClick(course.id)}
                  className="glass-button w-full"
                >
                  {isAuthenticated ? 'Enroll Now' : 'Sign In to Enroll'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white/5">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">Meet Our Expert Team</h2>
            <p className="text-gray-400">
              Learn from experienced traders who have successfully navigated the markets
              and are passionate about sharing their knowledge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member) => (
              <div
                key={member.name}
                className="glass-panel p-6 rounded-xl border border-white/10 text-center"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-white/10">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-blue-400 mb-4">{member.role}</p>
                <p className="text-gray-400 mb-6">{member.bio}</p>
                <div className="flex justify-center space-x-4">
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Twitter size={20} />
                  </a>
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href={member.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Instagram size={20} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div className="mt-24">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6">Why Choose Our Platform</h2>
              <p className="text-gray-400">
                Discover the unique features that make our trading academy stand out
                and help you achieve your trading goals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="glass-panel p-6 rounded-xl border border-white/10">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">Comprehensive Learning</h3>
                <p className="text-gray-400">
                  Access structured courses, live sessions, and practical exercises
                  designed to build your trading skills from the ground up.
                </p>
              </div>

              <div className="glass-panel p-6 rounded-xl border border-white/10">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">Expert Guidance</h3>
                <p className="text-gray-400">
                  Learn from experienced traders who share their proven strategies
                  and provide personalized feedback on your progress.
                </p>
              </div>

              <div className="glass-panel p-6 rounded-xl border border-white/10">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                  <Facebook className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">Community Support</h3>
                <p className="text-gray-400">
                  Join a thriving community of traders, share experiences, and get
                  support from fellow members on your trading journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses; 