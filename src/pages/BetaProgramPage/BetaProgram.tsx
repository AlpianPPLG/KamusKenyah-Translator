import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Star,
  Calendar,
  Users,
  Mail,
  ChevronRight,
  Check,
  ChevronDown,
  Gift,
  Zap,
  Send,
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isNew?: boolean;
}

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  image: string;
}

interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
  isActive?: boolean;
}

interface BenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BetaProgram = () => {
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<string>("user");
  const [activeSection, setActiveSection] = useState<number>(0);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [isIntersecting, setIsIntersecting] = useState<boolean[]>(
    Array(4).fill(false)
  );

  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const features: FeatureCardProps[] = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Early Access",
      description:
        "Be the first to try innovative features before anyone else.",
      isNew: true,
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Direct Feedback Line",
      description: "Direct communication channel with our product team.",
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Exclusive Rewards",
      description: "Special perks and rewards for active beta testers.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Beta Community",
      description: "Join a community of forward-thinking users.",
    },
  ];

  const testimonials: TestimonialProps[] = [
    {
      content:
        "Being part of the beta program allowed me to shape features I now use daily. The team listens and implements feedback quickly.",
      author: "Alex Morgan",
      role: "Beta Tester since 2023",
      image: "https://i.pravatar.cc/150?img=11",
    },
    {
      content:
        "I discovered workflows I never thought possible by testing early features. The beta community is also incredibly helpful.",
      author: "Samantha Lee",
      role: "Product Manager",
      image: "https://i.pravatar.cc/150?img=12",
    },
    {
      content:
        "As a developer, the beta program gives me insights into upcoming API changes so I can prepare my integrations in advance.",
      author: "Miguel Rodriguez",
      role: "Software Engineer",
      image: "https://i.pravatar.cc/150?img=13",
    },
  ];

  const timeline: TimelineItemProps[] = [
    {
      date: "Week 1",
      title: "Onboarding",
      description: "Complete orientation and get access to beta features.",
      isActive: true,
    },
    {
      date: "Week 2-3",
      title: "Initial Testing",
      description:
        "Start testing core features and submit your first feedback.",
    },
    {
      date: "Week 4-5",
      title: "Advanced Testing",
      description: "Dive deeper into complex workflows and edge cases.",
    },
    {
      date: "Week 6",
      title: "Feedback Review",
      description: "Join a group session to discuss your experience.",
    },
  ];

  const benefits: BenefitProps[] = [
    {
      icon: <Star className="w-6 h-6" />,
      title: "Premium Features",
      description:
        "Get free access to premium features during the beta period.",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Exclusive Events",
      description: "Invitations to virtual events and product demos.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Recognition",
      description: "Get featured as a valued contributor in our community.",
    },
  ];

  const faqs = [
    {
      question: "How long does the beta program last?",
      answer:
        "The beta program typically runs for 2-3 months before features are released to the public. However, as a beta tester, you'll remain in the program for future features as well.",
    },
    {
      question: "What kind of feedback are you looking for?",
      answer:
        "We value all types of feedback - from usability issues and bug reports to feature suggestions and general impressions. Both positive and constructive feedback help us improve.",
    },
    {
      question: "How much time will I need to commit?",
      answer:
        "The time commitment is flexible. We recommend at least 1-2 hours per week to test features and provide feedback, but you can contribute as much as you'd like.",
    },
    {
      question: "Will my data be safe during beta testing?",
      answer:
        "Absolutely. We maintain the same security standards for beta features as we do for our production environment. Your data remains protected according to our privacy policy.",
    },
  ];

  const roleOptions = [
    { value: "user", label: "Regular User" },
    { value: "developer", label: "Developer" },
    { value: "designer", label: "Designer" },
    { value: "business", label: "Business Owner" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = sectionRefs.current.findIndex(
            (ref) => ref === entry.target
          );
          if (index !== -1) {
            setIsIntersecting((prev) => {
              const newState = [...prev];
              newState[index] = entry.isIntersecting;
              return newState;
            });
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log("Submitted:", { email, selectedRole });
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
    }, 3000);
  };

  const scrollToSection = (index: number) => {
    setActiveSection(index);
    sectionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="bg-white overflow-x-hidden">
      {/* Navigation Pills */}
      <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 hidden lg:flex">
        <div className="bg-white/80 backdrop-blur-md rounded-full shadow-lg px-2 py-1 border border-gray-100">
          <div className="flex space-x-1">
            {["Overview", "Features", "Timeline", "Join Now"].map(
              (item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(index)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    activeSection === index
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        className={`pt-24 pb-20 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 mt-20 ${
          isIntersecting[0] ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-200 to-indigo-200 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>

          <div className="text-center mb-16">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-600 mb-4">
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse mr-2"></span>
              Limited Spots Available
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Shape the Future:
              <br />
              Join Our Beta Program
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Get early access to cutting-edge features, provide valuable
              feedback, and help us build the next generation of our platform.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                onClick={() => scrollToSection(3)}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center"
              >
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <Link
                to="/learn-more"
                className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:border-blue-500 hover:text-blue-500 transition-all duration-300 flex items-center"
              >
                Learn More
              </Link>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-3">
                  {[1, 2, 3, 4].map((img) => (
                    <img
                      key={img}
                      src={`https://i.pravatar.cc/40?img=${img + 20}`}
                      alt="Beta Tester"
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  <span className="font-semibold text-blue-600">721+</span> beta
                  testers already joined
                </span>
              </div>

              <div className="flex items-center">
                <div className="flex items-center mr-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  <span className="font-semibold">4.9/5</span> satisfaction rate
                </span>
              </div>
            </div>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100 shadow-xl">
              <img
                src="https://i.pravatar.cc/1000?img=20"
                alt="Beta Program"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-8 text-center">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 drop-shadow-md">
                    See What's Coming
                  </h2>
                  <p className="text-gray-900 mb-6 max-w-lg mx-auto drop-shadow">
                    Get a sneak peek of the exciting features we're developing
                    and be part of the innovation journey.
                  </p>
                  <Link
                    to="/roadmap"
                    className="px-6 py-3 bg-white/20 backdrop-blur-md hover:bg-white/30 text-gray-900 rounded-lg font-medium inline-flex items-center border border-white/30 transition-all"
                  >
                    View Roadmap
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-6 -left-6 bg-white rounded-xl shadow-lg p-3 border border-gray-100 hidden md:block">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                <div>
                  <p className="font-medium text-sm">Early Access</p>
                  <p className="text-xs text-gray-500">Next batch: April 15</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-3 border border-gray-100 hidden md:block">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-green-500 mr-2" />
                <div>
                  <p className="font-medium text-sm">Community</p>
                  <p className="text-xs text-gray-500">5k+ members</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={(el) => (sectionRefs.current[1] = el)}
        className={`py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 transition-opacity duration-1000 ${
          isIntersecting[1] ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-blue-600 mb-2 block">
              EXCLUSIVE ACCESS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Beta Program Benefits
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join our exclusive beta testing program and enjoy these special
              advantages while helping us perfect our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100 relative hover:shadow-xl transition-all hover:-translate-y-1"
              >
                {feature.isNew && (
                  <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    NEW
                  </span>
                )}
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <h3 className="text-2xl font-bold mb-4">
                  Why Join Our Beta Program?
                </h3>
                <p className="text-gray-600 mb-6">
                  Our beta testers don't just test features - they help shape
                  the future of our product. You'll have a direct impact on the
                  tools thousands will use.
                </p>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mt-1 bg-blue-100 rounded-full p-1 mr-3">
                        {React.cloneElement(
                          benefit.icon as React.ReactElement,
                          { className: "h-4 w-4 text-blue-600" }
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold">{benefit.title}</h4>
                        <p className="text-sm text-gray-600">
                          {benefit.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <button
                    onClick={() => scrollToSection(3)}
                    className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center"
                  >
                    Apply to join
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700">
                  <div
                    className="absolute inset-0 opacity-20 mix-blend-overlay"
                    style={{
                      backgroundImage:
                        'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-white p-12">
                    <div className="text-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                        <div className="font-bold text-xl mb-2">
                          Exclusive Previews
                        </div>
                        <p className="text-white/80 mb-4">
                          Get a sneak peek at features months before public
                          release.
                        </p>
                        <img
                          src="https://i.pravatar.cc/300?img=32"
                          alt="Feature preview"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section
        ref={(el) => (sectionRefs.current[2] = el)}
        className={`py-20 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ${
          isIntersecting[2] ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-blue-600 mb-2 block">
              YOUR JOURNEY
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Beta Testing Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A simple and structured approach to ensure you have the best
              experience helping us improve.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute top-0 left-4 md:left-1/2 w-0.5 h-full bg-gray-200 transform -translate-x-1/2"></div>

              {/* Timeline items */}
              <div className="space-y-16">
                {timeline.map((item, index) => (
                  <div key={index} className="relative">
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="flex-1 md:text-right md:pr-8 mb-4 md:mb-0 order-2 md:order-1">
                        {index % 2 === 0 ? (
                          <>
                            <h3 className="text-xl font-bold mb-1">
                              {item.title}
                            </h3>
                            <p className="text-gray-600">{item.description}</p>
                          </>
                        ) : (
                          <div className="md:hidden">
                            <h3 className="text-xl font-bold mb-1">
                              {item.title}
                            </h3>
                            <p className="text-gray-600">{item.description}</p>
                          </div>
                        )}
                      </div>

                      <div className="z-10 order-1 md:order-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            item.isActive ? "bg-blue-600" : "bg-gray-300"
                          }`}
                        >
                          {item.isActive ? (
                            <Check className="h-4 w-4 text-white" />
                          ) : (
                            <span className="w-2 h-2 bg-white rounded-full"></span>
                          )}
                        </div>
                      </div>

                      <div className="flex-1 md:pl-8 order-3">
                        {index % 2 === 0 ? (
                          <div className="md:hidden">
                            <h3 className="text-xl font-bold mb-1">
                              {item.title}
                            </h3>
                            <p className="text-gray-600">{item.description}</p>
                          </div>
                        ) : (
                          <>
                            <h3 className="text-xl font-bold mb-1">
                              {item.title}
                            </h3>
                            <p className="text-gray-600">{item.description}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-20">
            <div className="max-w-4xl mx-auto rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 md:p-12 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Frequently Asked Questions
                </h3>
                <p className="opacity-90 mb-6">
                  Everything you need to know about joining our beta program.
                </p>
              </div>
              <div className="bg-white p-8 md:p-12">
                <div className="grid gap-6">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
                    >
                      <h4 className="text-lg font-semibold mb-3">
                        {faq.question}
                      </h4>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Beta Section */}
      <section
        ref={(el) => (sectionRefs.current[3] = el)}
        className={`py-20 px-4 sm:px-6 lg:px-8 relative transition-opacity duration-1000 ${
          isIntersecting[3] ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-blue-600 mb-2 block">
              GET STARTED
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join the Beta Program
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Be among the first to experience our latest innovations and help
              shape the future of our platform.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-5">
                <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 lg:p-12 text-white">
                  <h3 className="text-2xl font-bold mb-6">
                    Beta Tester Benefits
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3" />
                      <span>Early access to new features</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3" />
                      <span>Influence product development</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3" />
                      <span>Direct line to product team</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3" />
                      <span>Special recognition & rewards</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3" />
                      <span>Exclusive beta community access</span>
                    </li>
                  </ul>

                  <div className="mt-12 pt-6 border-t border-white/20">
                    <div className="flex -space-x-2 mb-3">
                      {[1, 2, 3, 4, 5].map((img) => (
                        <img
                          key={img}
                          src={`https://i.pravatar.cc/40?img=${img + 10}`}
                          alt="Beta Tester"
                          className="w-9 h-9 rounded-full border-2 border-indigo-700"
                        />
                      ))}
                    </div>
                    <p className="text-sm opacity-90">
                      Join over 700 beta testers helping us improve
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-3 p-8 lg:p-12">
                  <h3 className="text-2xl font-bold mb-6">Apply Now</h3>

                  {submitted ? (
                    <div className="bg-green-50 border border-green-100 rounded-lg p-6 text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
                        <Check className="h-6 w-6" />
                      </div>
                      <h4 className="text-xl font-semibold mb-2">
                        Application Received!
                      </h4>
                      <p className="text-gray-600">
                        Thank you for applying to our beta program. We'll review
                        your application and get back to you shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="block font-medium text-gray-700 mb-2"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          placeholder="you@example.com"
                          required
                        />
                      </div>

                      <div>
                        <label className="block font-medium text-gray-700 mb-2">
                          I am joining as a
                        </label>
                        <div className="relative" ref={dropdownRef}>
                          <button
                            type="button"
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="w-full text-left rounded-md border border-gray-300 px-4 py-3 bg-white text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none flex items-center justify-between"
                          >
                            <span>
                              {roleOptions.find(
                                (option) => option.value === selectedRole
                              )?.label || "Select role"}
                            </span>
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                          </button>

                          {showDropdown && (
                            <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-100">
                              <div className="py-1">
                                {roleOptions.map((option) => (
                                  <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => {
                                      setSelectedRole(option.value);
                                      setShowDropdown(false);
                                    }}
                                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                                      selectedRole === option.value
                                        ? "text-blue-600 bg-blue-50"
                                        : "text-gray-700"
                                    }`}
                                  >
                                    {option.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center">
                        <input
                          id="terms"
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          required
                        />
                        <label
                          htmlFor="terms"
                          className="ml-2 block text-sm text-gray-600"
                        >
                          I agree to provide feedback and participate in beta
                          testing. I understand that features may change.
                        </label>
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="w-full rounded-md bg-gradient-to-r from-blue-600 to-indigo-700 px-5 py-3 text-white font-medium hover:shadow-lg hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center"
                        >
                          <Send className="mr-2 h-4 w-4" />
                          Submit Application
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-center mb-10">
              What Our Beta Testers Say
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all"
                >
                  <div className="mb-4 text-blue-600">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="inline-block h-4 w-4 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-10 h-10 rounded-full mr-4 object-cover border border-gray-200"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.author}</h4>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-20 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Shape the Future?
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Spots in our beta program are limited. Apply now to secure your
              place and start testing exciting new features.
            </p>
            <button
              onClick={() => scrollToSection(3)}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 inline-flex items-center"
            >
              Join the Beta Program
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Custom scrollbar styling */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: #c7d2fe;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #a5b4fc;
        }
      `}</style>
    </div>
  );
};

export default BetaProgram;
