import React, { useState, useRef, useEffect } from "react";
import {
  Globe,
  Brain,
  ArrowRight,
  MessageCircle,
  BookOpen,
  Target,
  Lightbulb,
  Layers,
  Zap,
  Workflow,
  Repeat2,
  FileQuestion,
  Puzzle,
  Rocket,
} from "lucide-react";

interface WhatIfScenarioProps {
  id: number;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  challenges: string[];
  solution: string;
  impact: {
    metric: string;
    value: string;
    improvement: number;
  };
  technologies: string[];
  videoDemo?: string;
}

const WhatIf: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const scenarios: WhatIfScenarioProps[] = [
    {
      id: 0,
      icon: <Globe className="w-8 h-8 text-blue-600" />,
      title: "Global Business Expansion",
      subtitle: "Transforming International Communication",
      description:
        "Revolutionizing cross-border business interactions through AI-powered translation",
      challenges: [
        "Complex multilingual communication barriers",
        "High-stakes translation accuracy requirements",
        "Real-time communication dependencies",
        "Cultural nuance preservation",
      ],
      solution:
        "Our advanced AI translation platform provides contextual, nuanced translations with machine learning-driven accuracy, enabling seamless global collaboration.",
      impact: {
        metric: "Communication Efficiency",
        value: "87% Improved",
        improvement: 87,
      },
      technologies: [
        "Neural Machine Translation",
        "Contextual AI",
        "Deep Learning",
        "Natural Language Processing",
      ],
      videoDemo: "/demos/global-business.mp4",
    },
    {
      id: 1,
      icon: <Brain className="w-8 h-8 text-purple-600" />,
      title: "Academic Research Collaboration",
      subtitle: "Breaking Knowledge Boundaries",
      description:
        "Enabling unprecedented global research communication and knowledge sharing",
      challenges: [
        "Technical terminology translation complexity",
        "Preserving research semantic precision",
        "Interdisciplinary communication gaps",
        "International research collaboration barriers",
      ],
      solution:
        "Specialized translation algorithms that maintain technical accuracy, contextual meaning, and disciplinary nuances across multiple scientific domains.",
      impact: {
        metric: "Research Collaboration",
        value: "73% Expanded",
        improvement: 73,
      },
      technologies: [
        "Domain-Specific AI Models",
        "Semantic Analysis",
        "Multi-Modal Translation",
        "Research Ontology Mapping",
      ],
      videoDemo: "/demos/academic-research.mp4",
    },
    {
      id: 2,
      icon: <MessageCircle className="w-8 h-8 text-green-600" />,
      title: "Multicultural Customer Support",
      subtitle: "Personalized Global Customer Experience",
      description:
        "Redefining customer interaction through intelligent, real-time translation",
      challenges: [
        "Multilingual support complexity",
        "Cultural communication barriers",
        "Response time optimization",
        "Emotional context translation",
      ],
      solution:
        "Intelligent translation platform with emotional intelligence and cultural adaptation, providing seamless, empathetic customer support across languages.",
      impact: {
        metric: "Customer Satisfaction",
        value: "92% Enhanced",
        improvement: 92,
      },
      technologies: [
        "Emotional AI",
        "Sentiment Analysis",
        "Cultural Context Detection",
        "Real-Time Translation",
      ],
      videoDemo: "/demos/customer-support.mp4",
    },
  ];

  // Menggunakan useEffect untuk memantau perubahan pada activeScenario
  useEffect(() => {
    // Misalnya, kita bisa menambahkan logika untuk mengatur ulang video saat scenario berubah
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsVideoPlaying(false);
    }
  }, [activeScenario]);

  const handleVideoToggle = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const TechnologyBadge: React.FC<{ tech: string }> = ({ tech }) => (
    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium mr-2 mb-2 inline-block">
      {tech}
    </span>
  );

  const ImpactProgressBar: React.FC<{ improvement: number }> = ({
    improvement,
  }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${improvement}%` }}
      ></div>
    </div>
  );

  return (
    <section className="bg-white py-16 md:py-20 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            Reimagining Communication Possibilities
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore groundbreaking scenarios where advanced translation
            technology transcends traditional communication limitations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Scenarios Selector */}
          <div className="space-y-6">
            {scenarios.map((scenario, idx) => (
              <div
                key={idx}
                onClick={() => setActiveScenario(idx)}
                className={`
                  p-6 rounded-xl cursor-pointer transition-all duration-300 group
                  ${
                    activeScenario === idx
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg border-blue-500 border"
                      : "hover:bg-gray-50 border border-transparent"
                  }
                `}
              >
                <div className="flex items-center mb-4">
                  {scenario.icon}
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">{scenario.title}</h3>
                    <p className="text-sm text-gray-500">{scenario.subtitle}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{scenario.description}</p>

                {activeScenario === idx && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-600">
                        Impact Metrics
                      </span>
                      <Zap className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>{scenario.impact.metric}</span>
                        <span className="font-semibold">
                          {scenario.impact.value}
                        </span>
                      </div>
                      <ImpactProgressBar
                        improvement={scenario.impact.improvement}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Detailed Scenario Exploration */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10">
              <Rocket className="w-64 h-64 text-blue-300" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  {scenarios[activeScenario].icon}
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold">
                      {scenarios[activeScenario].title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {scenarios[activeScenario].subtitle}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="p-2 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors"
                    onClick={handleVideoToggle}
                  >
                    {isVideoPlaying ? "Pause" : "Play"} Demo
                  </button>
                  <button
                    className="p-2 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors"
                    onClick={() => alert("Bookmark feature coming soon!")}
                  >
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </button>
                </div>
              </div>

              {/* Comprehensive Scenario Insights */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-lg mb-3 flex items-center">
                    <FileQuestion className="mr-2 text-blue-500" />
                    Key Challenges
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    {scenarios[activeScenario].challenges.map(
                      (challenge, idx) => (
                        <li key={idx} className="flex items-start">
                          <Puzzle className="w-4 h-4 mr-2 mt-1 text-red-500" />
                          {challenge}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-lg mb-3 flex items-center">
                    <Workflow className="mr-2 text-green-500" />
                    Advanced Solution
                  </h4>
                  <p className="text-gray-700 mb-4">
                    {scenarios[activeScenario].solution}
                  </p>
                </div>
              </div>

              {/* Technologies Showcase */}
              <div className="mt-6 bg-gray-50 p-6 rounded-xl">
                <h4 className="font-semibold text-lg mb-3 flex items-center">
                  <Layers className="mr-2 text-purple-500" />
                  Enabling Technologies
                </h4>
                <div className="flex flex-wrap">
                  {scenarios[activeScenario].technologies.map((tech, idx) => (
                    <TechnologyBadge key={idx} tech={tech} />
                  ))}
                </div>
              </div>

              <div className="mt-8 flex justify-between items-center border-t pt-4 border-gray-200">
                <span className="text-sm text-gray-500">
                  More Innovative Scenarios Coming Soon
                </span>
                <button className="group inline-flex items-center text-blue-600 hover:text-blue-800">
                  Explore Further
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Additional Icons Usage */}
              <div className="mt-4 flex items-center space-x-2">
                <Target className="w-5 h-5 text-red-500" />
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <Repeat2 className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIf;
