import React, { useState, useRef, useEffect } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Lock,
  Sparkles,
  CheckCircle2,
  GraduationCap,
  Lightbulb,
  Zap,
  Star,
  Gift,
} from "lucide-react";

interface Tip {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: "beginner" | "intermediate" | "advanced";
  impact: "high" | "medium" | "low";
  timeToImplement: string;
  exampleUseCase: string;
  results: string[];
}

const SecretTips: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<
    "all" | "beginner" | "intermediate" | "advanced"
  >("all");
  const [expandedTip, setExpandedTip] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleTips, setVisibleTips] = useState<Tip[]>([]);

  const secretTips: Tip[] = [
    {
      id: 1,
      title: "Context-Aware Translation",
      description:
        "Improve accuracy by training the AI with domain-specific terminology and context from your business documents.",
      icon: <Sparkles className="w-6 h-6 text-purple-500" />,
      category: "advanced",
      impact: "high",
      timeToImplement: "3-4 weeks",
      exampleUseCase:
        "Legal document translation with specific terminology requirements",
      results: [
        "93% increase in technical accuracy",
        "Reduced post-editing time by 67%",
        "Customer satisfaction increased by 42%",
      ],
    },
    {
      id: 2,
      title: "Batch Processing Strategy",
      description:
        "Optimize large translation jobs by implementing intelligent document segmentation and parallel processing.",
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      category: "intermediate",
      impact: "high",
      timeToImplement: "1-2 weeks",
      exampleUseCase: "E-commerce product catalog localization",
      results: [
        "Translation speed improved by 5x",
        "Resource usage optimized by 40%",
        "Cost reduction of 35% for large projects",
      ],
    },
    {
      id: 3,
      title: "Cultural Nuance Preservation",
      description:
        "Leverage custom cultural adaptation layers to maintain idioms, expressions and cultural references.",
      icon: <GraduationCap className="w-6 h-6 text-blue-500" />,
      category: "advanced",
      impact: "high",
      timeToImplement: "2-3 weeks",
      exampleUseCase: "Marketing campaign localization for global markets",
      results: [
        "Cultural appropriateness rating increased by 89%",
        "Brand message consistency improved by 75%",
        "Customer engagement increased by 37% in target markets",
      ],
    },
    {
      id: 4,
      title: "Smart Glossary Integration",
      description:
        "Create and maintain custom glossaries for consistent terminology across all your translations.",
      icon: <CheckCircle2 className="w-6 h-6 text-green-500" />,
      category: "beginner",
      impact: "medium",
      timeToImplement: "1-2 days",
      exampleUseCase:
        "Technical documentation translation with specific terminology",
      results: [
        "Terminology consistency improved by 97%",
        "Revision cycles reduced by 40%",
        "Translation quality score increased by 28%",
      ],
    },
    {
      id: 5,
      title: "Multi-Format Translation Pipelines",
      description:
        "Set up dedicated pipelines for different content formats (websites, apps, documents) for optimal results.",
      icon: <Lightbulb className="w-6 h-6 text-amber-500" />,
      category: "intermediate",
      impact: "medium",
      timeToImplement: "1 week",
      exampleUseCase: "Mobile app and website localization project",
      results: [
        "Format-specific accuracy improved by 34%",
        "Translation workflow efficiency increased by 50%",
        "Deployment time reduced by 65%",
      ],
    },
    {
      id: 6,
      title: "Voice-Optimized Translation",
      description:
        "Specialized processing for natural-sounding voice and audio translations with proper cadence and tone.",
      icon: <Star className="w-6 h-6 text-rose-500" />,
      category: "advanced",
      impact: "high",
      timeToImplement: "2-3 weeks",
      exampleUseCase: "Voiceover translation for educational videos",
      results: [
        "Natural speech cadence improved by 85%",
        "Emotional tone accuracy increased by 62%",
        "Viewer engagement time increased by 47%",
      ],
    },
    {
      id: 7,
      title: "Translation Memory Bootstrapping",
      description:
        "Jump-start your efficiency by importing existing translated content into your translation memory.",
      icon: <Gift className="w-6 h-6 text-indigo-500" />,
      category: "beginner",
      impact: "medium",
      timeToImplement: "2-3 days",
      exampleUseCase:
        "Migrating from another translation service with existing assets",
      results: [
        "Initial translation speed improved by 300%",
        "Cost savings of 45% on first projects",
        "Learning curve reduced by 75% for new users",
      ],
    },
    {
      id: 8,
      title: "Real-Time Collaborative Translation",
      description:
        "Enable multiple translators and reviewers to work simultaneously with conflict resolution.",
      icon: <Lock className="w-6 h-6 text-sky-500" />,
      category: "intermediate",
      impact: "high",
      timeToImplement: "1-2 weeks",
      exampleUseCase: "Urgent multi-language press release distribution",
      results: [
        "Project completion time reduced by 70%",
        "Communication overhead reduced by 85%",
        "Version conflicts eliminated entirely",
      ],
    },
  ];

  useEffect(() => {
    filterTips();
  }, [activeCategory]);

  const filterTips = () => {
    let filtered = [...secretTips];
    if (activeCategory !== "all") {
      filtered = filtered.filter((tip) => tip.category === activeCategory);
    }
    setVisibleTips(filtered);
    setCurrentPage(0);
  };

  const itemsPerPage = 3;
  const totalPages = Math.ceil(visibleTips.length / itemsPerPage);

  const goToPage = (pageNumber: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentPage(pageNumber);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const renderImpactBadge = (impact: "high" | "medium" | "low") => {
    const colors = {
      high: "bg-rose-100 text-rose-800 border-rose-200",
      medium: "bg-amber-100 text-amber-800 border-amber-200",
      low: "bg-green-100 text-green-800 border-green-200",
    };

    return (
      <span
        className={`text-xs px-2.5 py-0.5 rounded-full border ${colors[impact]}`}
      >
        {impact.charAt(0).toUpperCase() + impact.slice(1)} Impact
      </span>
    );
  };

  const renderCategoryBadge = (
    category: "beginner" | "intermediate" | "advanced"
  ) => {
    const colors = {
      beginner: "bg-green-100 text-green-800 border-green-200",
      intermediate: "bg-blue-100 text-blue-800 border-blue-200",
      advanced: "bg-purple-100 text-purple-800 border-purple-200",
    };

    return (
      <span
        className={`text-xs px-2.5 py-0.5 rounded-full border ${colors[category]}`}
      >
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </span>
    );
  };

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <Lock className="w-5 h-5 text-purple-600 mr-2" />
            <span className="text-sm font-medium text-purple-600 uppercase tracking-wider">
              Exclusive Insights
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
            Translation Power Tips
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Unlock advanced strategies that most users don't know about to
            maximize your translation quality, efficiency, and ROI.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center mb-10 gap-2">
          {["all", "beginner", "intermediate", "advanced"].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category as never)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category === "all"
                ? "All Tips"
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Cards Container with Animation */}
        <div className="relative overflow-hidden">
          <div
            ref={containerRef}
            className="transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentPage * 100}%)`,
            }}
          >
            <div className="flex">
              {Array.from({ length: totalPages }).map((_, pageIdx) => (
                <div key={pageIdx} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 md:gap-8">
                    {visibleTips
                      .slice(
                        pageIdx * itemsPerPage,
                        (pageIdx + 1) * itemsPerPage
                      )
                      .map((tip) => (
                        <div
                          key={tip.id}
                          className={`bg-white rounded-xl transition-all duration-300 transform ${
                            expandedTip === tip.id
                              ? "scale-102.5 shadow-xl border-indigo-200"
                              : "hover:shadow-lg hover:-translate-y-1"
                          } border border-gray-200 overflow-hidden`}
                        >
                          <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center"
                                style={{
                                  background:
                                    "linear-gradient(135deg, #f5f7ff 0%, #e3e8ff 100%)",
                                }}
                              >
                                {tip.icon}
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {renderCategoryBadge(tip.category)}
                                {renderImpactBadge(tip.impact)}
                              </div>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">
                              {tip.title}
                            </h3>
                            <p className="text-gray-600 mb-4">
                              {tip.description}
                            </p>

                            <button
                              onClick={() =>
                                setExpandedTip(
                                  expandedTip === tip.id ? null : tip.id
                                )
                              }
                              className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                            >
                              {expandedTip === tip.id
                                ? "Show Less"
                                : "Reveal Details"}
                              <ArrowRight className="ml-1 w-4 h-4" />
                            </button>

                            {expandedTip === tip.id && (
                              <div className="mt-4 pt-4 border-t border-gray-100 animate-fadeIn">
                                <div className="mb-3">
                                  <span className="text-sm font-medium text-gray-700">
                                    Implementation Time:
                                  </span>
                                  <span className="ml-2 text-sm text-gray-600">
                                    {tip.timeToImplement}
                                  </span>
                                </div>

                                <div className="mb-3">
                                  <span className="text-sm font-medium text-gray-700">
                                    Best For:
                                  </span>
                                  <span className="ml-2 text-sm text-gray-600">
                                    {tip.exampleUseCase}
                                  </span>
                                </div>

                                <div>
                                  <span className="text-sm font-medium text-gray-700 mb-2 block">
                                    Results:
                                  </span>
                                  <ul className="space-y-1">
                                    {tip.results.map((result, idx) => (
                                      <li
                                        key={idx}
                                        className="flex items-start"
                                      >
                                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                        <span className="text-sm text-gray-600">
                                          {result}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-10 space-x-2">
              <button
                onClick={() => goToPage(Math.max(currentPage - 1, 0))}
                disabled={currentPage === 0}
                className={`p-2 rounded-full ${
                  currentPage === 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div className="flex space-x-1">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToPage(idx)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      currentPage === idx
                        ? "bg-indigo-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  goToPage(Math.min(currentPage + 1, totalPages - 1))
                }
                disabled={currentPage === totalPages - 1}
                className={`p-2 rounded-full ${
                  currentPage === totalPages - 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Extra Info Section */}
        <div className="mt-16 p-6 md:p-8 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-3/4 pr-0 md:pr-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Want More Secret Tips?
              </h3>
              <p className="text-gray-700 mb-6">
                Our advanced users unlock 35+ additional power strategies
                through our premium workshop sessions. Learn from translation
                experts and take your content global with unmatched quality and
                efficiency.
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg transform transition hover:-translate-y-1">
                Join Next Workshop
              </button>
            </div>
            <div className="hidden md:flex mt-8 md:mt-0 w-full md:w-1/4 justify-center">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
                <GraduationCap className="w-16 h-16 text-indigo-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecretTips;
