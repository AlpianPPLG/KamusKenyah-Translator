import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Globe,
  Headphones,
  Languages,
  Lightbulb,
  MessageSquare,
  Users,
  Play,
  PauseCircle,
  Info,
  BookOpen,
  ChevronRight,
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  delay: number;
}

interface TestimonialProps {
  content: string;
  author: string;
  position: string;
  company: string;
  image: string;
}

interface ResourceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  url: string;
}

const Hero = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [currentFeature, setCurrentFeature] = useState<number>(0);
  const [showResourceDropdown, setShowResourceDropdown] =
    useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const featureIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: <Languages className="w-6 h-6" />,
      title: "Advanced Translation",
      description:
        "Instant and accurate translations across 100+ languages with contextual understanding.",
      gradient: "from-blue-600 to-indigo-600",
      delay: 0,
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "Voice Recognition",
      description:
        "Powerful speech-to-text capabilities that work seamlessly in noisy environments.",
      gradient: "from-purple-600 to-pink-600",
      delay: 0.1,
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Accessibility",
      description:
        "Access our platform anywhere, with offline capabilities for when you're on the go.",
      gradient: "from-emerald-600 to-teal-600",
      delay: 0.2,
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Real-time Chat",
      description:
        "Connect with speakers of any language with our real-time translation chat.",
      gradient: "from-orange-500 to-amber-500",
      delay: 0.3,
    },
  ];

  const resourceItems: ResourceItem[] = [
    {
      title: "Documentation",
      description: "Comprehensive guides and API reference",
      icon: <BookOpen className="w-5 h-5" />,
      url: "/documentation",
    },
    {
      title: "Tutorials",
      description: "Step-by-step learning resources",
      icon: <BookOpen className="w-5 h-5" />,
      url: "/tutorials",
    },
    {
      title: "FAQ",
      description: "Answers to common questions",
      icon: <Info className="w-5 h-5" />,
      url: "/faq",
    },
  ];

  const testimonials: TestimonialProps[] = [
    {
      content:
        "This platform has revolutionized how our international team collaborates. The real-time translation features save us hours every day.",
      author: "Sarah Johnson",
      position: "VP of Operations",
      company: "Global Tech Inc.",
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      content:
        "As someone who frequently travels for business, having this translation tool in my pocket has opened doors to new partnerships.",
      author: "Michael Chen",
      position: "Business Development",
      company: "Nexus Partners",
      image: "https://i.pravatar.cc/150?img=2",
    },
    {
      content:
        "The accuracy of the translations is what impressed me most. It captures nuances that other tools miss completely.",
      author: "Aisha Patel",
      position: "Content Strategist",
      company: "MediaForge",
      image: "https://i.pravatar.cc/150?img=3",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    featureIntervalRef.current = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => {
      if (featureIntervalRef.current) {
        clearInterval(featureIntervalRef.current);
      }
    };
  }, [features.length]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowResourceDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const FeatureCard: React.FC<FeatureCardProps> = ({
    icon,
    title,
    description,
    gradient,
    delay,
  }) => (
    <div
      className="bg-white rounded-xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100"
      style={{ animationDelay: `${delay}s` }}
    >
      <div
        className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center bg-gradient-to-r ${gradient}`}
      >
        <div className="text-white">{icon}</div>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );

  const Testimonial: React.FC<TestimonialProps> = ({
    content,
    author,
    position,
    company,
    image,
  }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="mb-4">
        <svg
          className="h-8 w-8 text-gray-400"
          fill="currentColor"
          viewBox="0 0 32 32"
        >
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
      </div>
      <p className="text-gray-600 mb-4">{content}</p>
      <div className="flex items-center">
        <img src={image} alt={author} className="w-10 h-10 rounded-full mr-4" />
        <div>
          <h4 className="font-semibold">{author}</h4>
          <p className="text-sm text-gray-500">
            {position}, {company}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-white overflow-x-hidden">
      {/* Main Hero Section */}
      <section className="pt-12 pb-16 md:pt-16 mt-20 md:pb-24 px-4 sm:px-6 lg:px-8 relative w-full">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-200 to-purple-200 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Hero Text */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-600 mb-4">
                <span className="w-2 h-2 rounded-full bg-blue-600 mr-2"></span>
                Learn more about our revolutionary platform
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Breaking Language Barriers with AI
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Discover how our cutting-edge translation technology is
                connecting people and businesses across the globe with
                unprecedented accuracy and speed.
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
                <Link
                  to="/pricing"
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                >
                  Get Started
                  <ArrowRight className="inline-block ml-2 h-4 w-4" />
                </Link>
                <button
                  onClick={handlePlayVideo}
                  className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:border-blue-500 hover:text-blue-500 transition-all duration-300 flex items-center"
                >
                  {isPlaying ? (
                    <>
                      <PauseCircle className="mr-2 h-4 w-4" />
                      Pause Demo
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Watch Demo
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-4 justify-center lg:justify-start text-sm text-gray-500">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((img) => (
                    <img
                      key={img}
                      src={`https://i.pravatar.cc/40?img=${img}`}
                      alt="User"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <span>
                  <strong className="text-blue-600">10,000+</strong> satisfied
                  users worldwide
                </span>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="lg:w-1/2 relative w-full max-w-md mx-auto lg:max-w-none mt-8 lg:mt-0">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 p-2">
                <div className="relative rounded-xl overflow-hidden bg-gray-50 aspect-video">
                  <video
                    ref={videoRef}
                    poster="https://i.pravatar.cc/600?img=20"
                    className="w-full h-full object-cover"
                  >
                    <source src="demo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={handlePlayVideo}
                        className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center hover:bg-white/50 transition-all"
                      >
                        <Play className="h-8 w-8 text-white fill-white" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center p-4">
                  <div>
                    <h3 className="font-semibold">
                      Watch our platform in action
                    </h3>
                    <p className="text-sm text-gray-500">
                      See how we're transforming communication
                    </p>
                  </div>
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => window.open("#", "_blank")}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Floating elements - hidden on small screens */}
              <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4 border border-gray-100 hidden md:flex items-center">
                <Globe className="h-5 w-5 text-blue-500 mr-2" />
                <div>
                  <p className="font-semibold">100+ Languages</p>
                  <p className="text-xs text-gray-500">Global coverage</p>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-gray-100 hidden md:block">
                <div className="flex items-center mb-2">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                  <p className="text-sm font-medium">99.9% Accuracy</p>
                </div>
                <div className="w-32 h-2 bg-gray-200 rounded-full">
                  <div className="h-2 rounded-full bg-green-500 w-[99%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learn More Section with Info Icon */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-blue-50 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start">
              <div className="flex-shrink-0 bg-blue-100 rounded-full p-3 mb-4 md:mb-0">
                <Info className="h-6 w-6 text-blue-600" />
              </div>
              <div className="md:ml-5">
                <h3 className="text-lg font-semibold text-gray-900">
                  Need more information?
                </h3>
                <p className="mt-2 text-gray-600">
                  Our comprehensive documentation covers everything from getting
                  started to advanced usage. Access user guides, API
                  documentation, and integration examples.
                </p>
                <div className="mt-4">
                  <Link
                    to="/documentation"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Browse documentation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative w-full">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Powerful Features to Explore
            </h2>
            <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform offers a range of innovative features designed to
              make language translation seamless, accurate, and intuitive.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                gradient={feature.gradient}
                delay={feature.delay}
              />
            ))}
          </div>

          <div className="mt-12 md:mt-16 flex justify-center">
            <Link
              to="/features"
              className="group inline-flex items-center justify-center px-6 py-3 text-base font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              Explore all features
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Rotating Features */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                How It Works
              </h2>
              <p className="text-base lg:text-lg text-gray-600 mb-8">
                Our platform makes translation simple, accurate, and accessible
                for everyone. Discover how our technology can help you break
                down language barriers.
              </p>

              <div className="space-y-6">
                {features.map((feature, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                      currentFeature === idx
                        ? "bg-white shadow-md"
                        : "hover:bg-white/50"
                    }`}
                    onClick={() => setCurrentFeature(idx)}
                  >
                    <div className="flex items-start">
                      <div
                        className={`p-2 rounded-lg bg-gradient-to-r ${feature.gradient} text-white mr-4`}
                      >
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-bold">{feature.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-10 lg:mt-0">
              <div className="aspect-square max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50"></div>

                <div className="relative z-10 h-full flex flex-col justify-center items-center">
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r ${features[currentFeature].gradient} flex items-center justify-center mb-6 text-white`}
                  >
                    {features[currentFeature].icon}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center">
                    {features[currentFeature].title}
                  </h3>
                  <p className="text-gray-600 text-center text-sm sm:text-base">
                    {features[currentFeature].description}
                  </p>

                  <div className="mt-auto pt-6 flex space-x-2">
                    {features.map((_, idx) => (
                      <button
                        key={idx}
                        className={`w-2 h-2 rounded-full ${
                          currentFeature === idx ? "bg-blue-600" : "bg-gray-300"
                        }`}
                        onClick={() => setCurrentFeature(idx)}
                        aria-label={`View feature ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating elements - hidden on small and medium screens */}
              <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4 border border-gray-100 hidden lg:block">
                <div className="flex items-center">
                  <Lightbulb className="h-5 w-5 text-amber-500 mr-2" />
                  <p className="text-sm font-medium">Smart suggestions</p>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-gray-100 hidden lg:block">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-500 mr-2" />
                  <p className="text-sm font-medium">Team collaboration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              What Our Users Say
            </h2>
            <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
              Thousands of users trust our platform for their translation needs.
              Here's what a few of them have to say.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <Testimonial key={idx} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Learning Resources Section with BookOpen icon */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Learning Resources
            </h2>
            <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
              Enhance your skills with our comprehensive learning materials and
              guides.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resourceItems.map((resource, idx) => (
              <Link
                key={idx}
                to={resource.url}
                className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="mb-4 p-3 bg-blue-50 inline-block rounded-lg">
                  {resource.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <div className="flex items-center text-blue-600">
                  <span className="font-medium">Learn more</span>
                  <ChevronRight className="ml-1 h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-12 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
                Join thousands of users who are already breaking language
                barriers with our platform.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/pricing"
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 text-center"
              >
                View Pricing Plans
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:border-blue-500 hover:text-blue-500 transition-all duration-300 text-center"
              >
                Contact Sales
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>No credit card required for trial</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
