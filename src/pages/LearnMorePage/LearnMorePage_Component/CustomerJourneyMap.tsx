import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Search,
  MousePointer,
  UserPlus,
  Rocket,
  Star,
  Share2,
  MessageSquare,
  Users,
  Award,
  Heart,
  TrendingUp,
  Zap,
  CheckCircle,
  Globe,
  Lightbulb,
  Clock,
  Target,
  BarChart,
  PieChart,
  LineChart,
  Activity,
  ThumbsUp,
  Smile,
  Frown,
  Meh,
} from "lucide-react";

interface JourneyStage {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  metrics: {
    label: string;
    value: string;
    trend: "up" | "down" | "neutral";
    change: string;
  }[];
  touchpoints: {
    name: string;
    type: "digital" | "physical" | "social";
    impact: number;
  }[];
  emotions: {
    label: string;
    score: number;
    icon: React.ReactNode;
  }[];
  goals: {
    title: string;
    progress: number;
    target: string;
  }[];
  insights: {
    positive: string[];
    negative: string[];
  };
  timeframe: {
    average: string;
    range: string;
  };
}

interface AnimatedCounterProps {
  end: number;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 1000,
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);

  useEffect(() => {
    const steps = 60;
    const increment = end / steps;
    const timePerStep = duration / steps;

    const interval = setInterval(() => {
      if (countRef.current < end) {
        setCount((prev) => {
          const next = Math.min(prev + increment, end);
          countRef.current = next;
          return next;
        });
      } else {
        clearInterval(interval);
      }
    }, timePerStep);

    return () => clearInterval(interval);
  }, [end, duration]);

  return <span>{Math.round(count)}</span>;
};

const CustomerJourneyMap: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(1);
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);
  const [showInsights, setShowInsights] = useState<boolean>(false);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const journeyStages: JourneyStage[] = [
    {
      id: 1,
      icon: <Search className="w-6 h-6" />,
      title: "Discovery",
      description:
        "Initial exploration and awareness of our translation platform through various marketing channels and touchpoints",
      metrics: [
        { label: "Website Visits", value: "10K+", trend: "up", change: "+25%" },
        {
          label: "Avg. Session",
          value: "4:30",
          trend: "neutral",
          change: "0%",
        },
        { label: "Bounce Rate", value: "35%", trend: "down", change: "-10%" },
        { label: "Social Shares", value: "2.5K", trend: "up", change: "+45%" },
      ],
      touchpoints: [
        { name: "Social Media Ads", type: "digital", impact: 85 },
        { name: "Search Results", type: "digital", impact: 90 },
        { name: "Content Marketing", type: "digital", impact: 75 },
        { name: "Word of Mouth", type: "social", impact: 95 },
      ],
      emotions: [
        { label: "Interest", score: 8, icon: <Smile className="w-4 h-4" /> },
        {
          label: "Curiosity",
          score: 9,
          icon: <ThumbsUp className="w-4 h-4" />,
        },
        { label: "Uncertainty", score: 6, icon: <Meh className="w-4 h-4" /> },
      ],
      goals: [
        { title: "Brand Awareness", progress: 85, target: "90%" },
        { title: "Traffic Growth", progress: 75, target: "10K monthly" },
        { title: "Social Engagement", progress: 90, target: "5K shares" },
      ],
      insights: {
        positive: [
          "Strong organic search presence",
          "High social media engagement",
          "Effective content strategy",
        ],
        negative: [
          "Mobile bounce rate needs improvement",
          "Limited regional reach",
        ],
      },
      timeframe: {
        average: "2-3 days",
        range: "1-7 days",
      },
    },
    {
      id: 2,
      icon: <MousePointer className="w-6 h-6" />,
      title: "Evaluation",
      description:
        "Deep exploration of features and comparison with competitors as users assess the platform's value proposition",
      metrics: [
        { label: "Demo Requests", value: "5K+", trend: "up", change: "+40%" },
        { label: "Feature Views", value: "15K", trend: "up", change: "+30%" },
        {
          label: "Compare Rate",
          value: "45%",
          trend: "neutral",
          change: "+5%",
        },
        {
          label: "Support Queries",
          value: "1.2K",
          trend: "down",
          change: "-15%",
        },
      ],
      touchpoints: [
        { name: "Product Demo", type: "digital", impact: 95 },
        { name: "Feature Pages", type: "digital", impact: 85 },
        { name: "Comparison Tool", type: "digital", impact: 90 },
        { name: "Customer Reviews", type: "social", impact: 88 },
      ],
      emotions: [
        {
          label: "Confidence",
          score: 8,
          icon: <ThumbsUp className="w-4 h-4" />,
        },
        { label: "Trust", score: 7, icon: <Smile className="w-4 h-4" /> },
        { label: "Excitement", score: 9, icon: <Star className="w-4 h-4" /> },
      ],
      goals: [
        { title: "Demo Conversion", progress: 65, target: "75%" },
        { title: "Feature Engagement", progress: 80, target: "85%" },
        { title: "Competitor Comparison", progress: 70, target: "80%" },
      ],
      insights: {
        positive: [
          "High demo completion rate",
          "Strong feature differentiation",
          "Positive review sentiment",
        ],
        negative: [
          "Complex pricing structure feedback",
          "Technical query resolution time",
        ],
      },
      timeframe: {
        average: "5-7 days",
        range: "3-14 days",
      },
    },
    {
      id: 3,
      icon: <UserPlus className="w-6 h-6" />,
      title: "Registration",
      description:
        "User commitment through account creation and initial platform setup process",
      metrics: [
        { label: "Sign-ups", value: "2K+", trend: "up", change: "+35%" },
        { label: "Trial Starts", value: "75%", trend: "up", change: "+15%" },
        { label: "Drop-offs", value: "25%", trend: "down", change: "-10%" },
        {
          label: "Support Usage",
          value: "800",
          trend: "neutral",
          change: "0%",
        },
      ],
      touchpoints: [
        { name: "Registration Form", type: "digital", impact: 100 },
        { name: "Welcome Email", type: "digital", impact: 90 },
        { name: "Setup Guide", type: "digital", impact: 85 },
        { name: "Support Chat", type: "digital", impact: 75 },
      ],
      emotions: [
        { label: "Commitment", score: 9, icon: <Star className="w-4 h-4" /> },
        {
          label: "Anticipation",
          score: 8,
          icon: <Smile className="w-4 h-4" />,
        },
        {
          label: "Satisfaction",
          score: 7,
          icon: <ThumbsUp className="w-4 h-4" />,
        },
      ],
      goals: [
        { title: "Registration Rate", progress: 75, target: "85%" },
        { title: "Setup Completion", progress: 80, target: "90%" },
        { title: "Support Satisfaction", progress: 85, target: "95%" },
      ],
      insights: {
        positive: [
          "Streamlined registration flow",
          "Effective onboarding emails",
          "Quick setup process",
        ],
        negative: ["Form abandonment rate", "Verification delays"],
      },
      timeframe: {
        average: "1-2 days",
        range: "1-4 days",
      },
    },
    {
      id: 4,
      icon: <Rocket className="w-6 h-6" />,
      title: "Activation",
      description:
        "First meaningful interactions and value realization through active platform usage",
      metrics: [
        { label: "Feature Usage", value: "85%", trend: "up", change: "+20%" },
        { label: "Session Time", value: "12:30", trend: "up", change: "+25%" },
        { label: "Task Completion", value: "90%", trend: "up", change: "+15%" },
        { label: "Support Needs", value: "15%", trend: "down", change: "-20%" },
      ],
      touchpoints: [
        { name: "First Translation", type: "digital", impact: 100 },
        { name: "Feature Tutorial", type: "digital", impact: 85 },
        { name: "Success Stories", type: "social", impact: 75 },
        { name: "Help Center", type: "digital", impact: 80 },
      ],
      emotions: [
        { label: "Achievement", score: 9, icon: <Star className="w-4 h-4" /> },
        {
          label: "Confidence",
          score: 8,
          icon: <ThumbsUp className="w-4 h-4" />,
        },
        { label: "Mastery", score: 7, icon: <Smile className="w-4 h-4" /> },
      ],
      goals: [
        { title: "Feature Adoption", progress: 85, target: "95%" },
        { title: "User Proficiency", progress: 75, target: "85%" },
        { title: "Task Success", progress: 90, target: "95%" },
      ],
      insights: {
        positive: [
          "High feature adoption rate",
          "Strong user engagement",
          "Low support requirements",
        ],
        negative: ["Advanced feature discovery", "Integration complexity"],
      },
      timeframe: {
        average: "3-5 days",
        range: "2-10 days",
      },
    },
    {
      id: 5,
      icon: <Star className="w-6 h-6" />,
      title: "Retention",
      description:
        "Long-term engagement and advocacy through continued value delivery and relationship building",
      metrics: [
        { label: "Retention Rate", value: "85%", trend: "up", change: "+10%" },
        { label: "Usage Frequency", value: "89%", trend: "up", change: "+15%" },
        { label: "Referral Rate", value: "45%", trend: "up", change: "+25%" },
        { label: "Churn Risk", value: "5%", trend: "down", change: "-15%" },
      ],
      touchpoints: [
        { name: "Regular Updates", type: "digital", impact: 90 },
        { name: "Premium Features", type: "digital", impact: 95 },
        { name: "Community", type: "social", impact: 85 },
        { name: "Loyalty Program", type: "digital", impact: 80 },
      ],
      emotions: [
        { label: "Loyalty", score: 9, icon: <Star className="w-4 h-4" /> },
        { label: "Advocacy", score: 8, icon: <ThumbsUp className="w-4 h-4" /> },
        {
          label: "Satisfaction",
          score: 9,
          icon: <Smile className="w-4 h-4" />,
        },
      ],
      goals: [
        { title: "Monthly Retention", progress: 90, target: "95%" },
        { title: "Feature Usage", progress: 85, target: "90%" },
        { title: "Referral Growth", progress: 75, target: "85%" },
      ],
      insights: {
        positive: [
          "Strong loyalty metrics",
          "High referral rates",
          "Active community engagement",
        ],
        negative: ["Premium upgrade friction", "Feature request backlog"],
      },
      timeframe: {
        average: "Ongoing",
        range: "3+ months",
      },
    },
  ];

  const renderMetricTrend = (
    trend: "up" | "down" | "neutral",
    change: string
  ) => {
    const trendColors = {
      up: "text-green-500",
      down: "text-red-500",
      neutral: "text-gray-500",
    };

    return (
      <div className="flex items-center">
        <TrendingUp
          className={`w-4 h-4 ${trendColors[trend]} ${
            trend === "down" ? "transform rotate-180" : ""
          }`}
        />
        <span className={`ml-1 text-sm ${trendColors[trend]}`}>{change}</span>
      </div>
    );
  };

  const renderEmotionBar = (score: number) => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${score * 10}%` }}
        ></div>
      </div>
    );
  };

  const renderGoalProgress = (progress: number, target: string) => {
    return (
      <div className="mt-2">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium">
            {progress}% of {target}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const renderTouchpointImpact = (
    impact: number,
    type: "digital" | "physical" | "social"
  ) => {
    const typeColors = {
      digital: "bg-blue-500",
      physical: "bg-green-500",
      social: "bg-purple-500",
    };

    return (
      <div className="flex items-center gap-2">
        <div className="flex-grow">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full transition-all duration-500 ${typeColors[type]}`}
              style={{ width: `${impact}%` }}
            ></div>
          </div>
        </div>
        <span className="text-sm font-medium">{impact}%</span>
      </div>
    );
  };

  return (
    <div className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Customer Journey Map
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore how users discover, evaluate, and embrace our translation
            platform through their journey from first contact to loyal customer.
          </p>
        </div>

        {/* Journey Progress Bar */}
        <div className="relative mb-16">
          <div className="hidden sm:block absolute top-1/2 w-full h-0.5 bg-gray-200 -translate-y-1/2"></div>
          <div className="relative flex justify-between max-w-4xl mx-auto">
            {journeyStages.map((stage, index) => (
              <div
                key={stage.id}
                className="flex flex-col items-center relative"
                onMouseEnter={() => setHoveredStage(stage.id)}
                onMouseLeave={() => setHoveredStage(null)}
                onClick={() => setActiveStage(stage.id)}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-300 cursor-pointer
                    ${
                      activeStage === stage.id
                        ? "bg-blue-600 text-white scale-110 shadow-lg"
                        : "bg-white text-gray-500 border-2 border-gray-200 hover:border-blue-500 hover:text-blue-500"
                    }`}
                >
                  {stage.icon}
                </div>
                <div className="absolute top-16 text-center w-32">
                  <p
                    className={`font-medium ${
                      activeStage === stage.id
                        ? "text-blue-600"
                        : "text-gray-600"
                    }`}
                  >
                    {stage.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {stage.timeframe.average}
                  </p>
                </div>
                {index < journeyStages.length - 1 && (
                  <ArrowRight className="absolute left-full top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stage Details */}
        <div className="mt-24">
          {journeyStages.map((stage) => (
            <div
              key={stage.id}
              className={`transition-all duration-500 ${
                activeStage === stage.id
                  ? "opacity-100 h-auto"
                  : "opacity-0 h-0 overflow-hidden"
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Metrics */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <BarChart className="w-5 h-5 text-blue-500 mr-2" />
                    Key Metrics
                  </h3>
                  <div className="space-y-4">
                    {stage.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedMetric(metric.label)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">{metric.label}</span>
                          <div className="flex items-center">
                            <span className="font-semibold mr-2">
                              {metric.value}
                            </span>
                            {renderMetricTrend(metric.trend, metric.change)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Touchpoints */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Target className="w-5 h-5 text-blue-500 mr-2" />
                    Touchpoints & Impact
                  </h3>
                  <div className="space-y-4">
                    {stage.touchpoints.map((touchpoint, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-white rounded-lg shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{touchpoint.name}</span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              touchpoint.type === "digital"
                                ? "bg-blue-100 text-blue-700"
                                : touchpoint.type === "physical"
                                ? "bg-green-100 text-green-700"
                                : "bg-purple-100 text-purple-700"
                            }`}
                          >
                            {touchpoint.type}
                          </span>
                        </div>
                        {renderTouchpointImpact(
                          touchpoint.impact,
                          touchpoint.type
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Emotional Journey */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Heart className="w-5 h-5 text-blue-500 mr-2" />
                    Emotional Journey
                  </h3>
                  <div className="space-y-4">
                    {stage.emotions.map((emotion, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-white rounded-lg shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            {emotion.icon}
                            <span className="ml-2 text-gray-600">
                              {emotion.label}
                            </span>
                          </div>
                          <span className="text-sm font-medium">
                            {emotion.score}/10
                          </span>
                        </div>
                        {renderEmotionBar(emotion.score)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Goals Section */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {stage.goals.map((goal, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Target className="w-4 h-4 text-blue-500 mr-2" />
                      {goal.title}
                    </h4>
                    {renderGoalProgress(goal.progress, goal.target)}
                  </div>
                ))}
              </div>

              {/* Insights Toggle */}
              <div className="mt-8">
                <button
                  onClick={() => setShowInsights(!showInsights)}
                  className="flex items-center justify-center w-full bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <Lightbulb className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="font-medium">
                    {showInsights ? "Hide Insights" : "Show Insights"}
                  </span>
                </button>

                {showInsights && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-50 rounded-xl p-6">
                      <h4 className="font-semibold mb-4 text-green-800">
                        Positive Insights
                      </h4>
                      <ul className="space-y-2">
                        {stage.insights.positive.map((insight, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-red-50 rounded-xl p-6">
                      <h4 className="font-semibold mb-4 text-red-800">
                        Areas for Improvement
                      </h4>
                      <ul className="space-y-2">
                        {stage.insights.negative.map((insight, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-red-700"
                          >
                            <Activity className="w-4 h-4 mr-2" />
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Stage Description */}
              <div className="mt-8 bg-blue-50 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-blue-900">
                      Stage Overview
                    </h4>
                    <p className="mt-2 text-blue-800">{stage.description}</p>
                    <div className="mt-4 flex items-center text-blue-700">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Typical timeframe: {stage.timeframe.range}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Elements */}
        <div className="mt-16 flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-4">
            <button className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
              <LineChart className="w-4 h-4 mr-2" />
              View Detailed Analytics
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
              <Share2 className="w-4 h-4 mr-2" />
              Share Journey Map
            </button>
          </div>
          <p className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerJourneyMap;
