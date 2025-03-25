import React, { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Lightbulb,
  Clock,
  Users,
  Brain,
  Target,
} from 'lucide-react';

interface MistakeExample {
  id: number;
  incorrect: string;
  correct: string;
  explanation: string;
  category: string;
  impact: 'High' | 'Medium' | 'Low';
  frequency: number;
  tips: string[];
}

interface BestPractice {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
  examples: {
    good: string;
    bad: string;
  }[];
}

const CommonMistakes: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showSolution, setShowSolution] = useState<number | null>(null);
  const [activePractice, setActivePractice] = useState<number>(0);

  const categories = [
    'All',
    'Context',
    'Grammar',
    'Cultural',
    'Technical',
    'Workflow',
  ];

  const commonMistakes: MistakeExample[] = [
    {
      id: 1,
      incorrect: "Je suis un avocat",
      correct: "I am a lawyer",
      explanation: "Direct translation could mean 'I am an avocado' in French. Context is crucial for proper translation.",
      category: 'Context',
      impact: 'High',
      frequency: 85,
      tips: [
        'Always provide context in professional translations',
        'Use industry-specific terminology when available',
        'Consider regional variations in meaning'
      ]
    },
    {
      id: 2,
      incorrect: "彼女は私の手を握った",
      correct: "She held my hand",
      explanation: "Word-for-word translation might lose emotional context in Japanese to English translations.",
      category: 'Cultural',
      impact: 'Medium',
      frequency: 75,
      tips: [
        'Consider cultural context',
        'Understand emotional nuances',
        'Research cultural equivalents'
      ]
    },
    {
      id: 3,
      incorrect: "Das Auto von mein Bruder",
      correct: "Das Auto meines Bruders",
      explanation: "Common grammatical mistake in German possessive case.",
      category: 'Grammar',
      impact: 'High',
      frequency: 90,
      tips: [
        'Review grammar rules before translation',
        'Use grammar checking tools',
        'Consult native speakers when unsure'
      ]
    },
    {
      id: 4,
      incorrect: "<string>text</string>",
      correct: "Use proper XML escaping",
      explanation: "Technical content requires proper handling of special characters and markup.",
      category: 'Technical',
      impact: 'High',
      frequency: 70,
      tips: [
        'Use proper escape sequences',
        'Preserve formatting tags',
        'Test in target environment'
      ]
    },
    {
      id: 5,
      incorrect: "Quick translation without review",
      correct: "Implement proper review workflow",
      explanation: "Skipping the review process often leads to quality issues.",
      category: 'Workflow',
      impact: 'High',
      frequency: 80,
      tips: [
        'Always include review step',
        'Use collaborative tools',
        'Maintain glossary and style guide'
      ]
    }
  ];

  const bestPractices: BestPractice[] = [
    {
      id: 1,
      title: "Context-Aware Translation",
      description: "Always provide and consider the full context of the content being translated.",
      icon: <Brain className="w-6 h-6" />,
      benefits: [
        "Improved accuracy",
        "Better cultural adaptation",
        "More natural results"
      ],
      examples: [
        {
          good: "Taking context into account: 'She got the lead role' → 'Elle a obtenu le rôle principal'",
          bad: "Direct translation: 'She got the lead' → 'Elle a obtenu le plomb'"
        }
      ]
    },
    {
      id: 2,
      title: "Quality Assurance Process",
      description: "Implement a robust QA process for all translations.",
      icon: <Target className="w-6 h-6" />,
      benefits: [
        "Reduced errors",
        "Consistent quality",
        "Professional results"
      ],
      examples: [
        {
          good: "Multiple review stages with specialized reviewers",
          bad: "Single-pass translation without review"
        }
      ]
    },
    {
      id: 3,
      title: "Cultural Sensitivity",
      description: "Consider cultural nuances and adaptations in translations.",
      icon: <Users className="w-6 h-6" />,
      benefits: [
        "Better audience connection",
        "Avoided cultural faux pas",
        "Increased engagement"
      ],
      examples: [
        {
          good: "Adapting idioms to local equivalents",
          bad: "Direct translation of culture-specific phrases"
        }
      ]
    }
  ];

  const filteredMistakes = selectedCategory === 'All'
    ? commonMistakes
    : commonMistakes.filter(mistake => mistake.category === selectedCategory);

  const getImpactColor = (impact: 'High' | 'Medium' | 'Low') => {
    switch (impact) {
      case 'High':
        return 'text-red-500';
      case 'Medium':
        return 'text-yellow-500';
      case 'Low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Common Translation Mistakes & Best Practices
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn from common mistakes and discover best practices to improve your translation quality and efficiency.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-8 h-8 text-blue-500 mr-3" />
              <h3 className="text-xl font-semibold">Most Common Issues</h3>
            </div>
            <p className="text-4xl font-bold text-blue-600 mb-2">78%</p>
            <p className="text-gray-600">of mistakes are context-related</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-500 mr-3" />
              <h3 className="text-xl font-semibold">Success Rate</h3>
            </div>
            <p className="text-4xl font-bold text-green-600 mb-2">95%</p>
            <p className="text-gray-600">with best practices applied</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Brain className="w-8 h-8 text-purple-500 mr-3" />
              <h3 className="text-xl font-semibold">AI Assistance</h3>
            </div>
            <p className="text-4xl font-bold text-purple-600 mb-2">60%</p>
            <p className="text-gray-600">faster translation process</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Common Mistakes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {filteredMistakes.map((mistake) => (
            <div
              key={mistake.id}
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <XCircle className="w-5 h-5 text-red-500 mr-2" />
                    <h3 className="text-lg font-semibold">Common Mistake #{mistake.id}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getImpactColor(mistake.impact)}`}>
                    {mistake.impact} Impact
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="bg-red-50 rounded-lg p-4">
                    <p className="text-red-700 font-medium">Incorrect:</p>
                    <p className="text-red-600">{mistake.incorrect}</p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-green-700 font-medium">Correct:</p>
                    <p className="text-green-600">{mistake.correct}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">{mistake.explanation}</p>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={() => setShowSolution(showSolution === mistake.id ? null : mistake.id)}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <Lightbulb className="w-4 h-4 mr-2" />
                      {showSolution === mistake.id ? 'Hide Tips' : 'Show Tips'}
                    </button>

                    {showSolution === mistake.id && (
                      <div className="mt-4 space-y-2">
                        {mistake.tips.map((tip, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 mr-2" />
                            <p className="text-gray-600">{tip}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Frequency: {mistake.frequency}%
                  </span>
                  <span className="flex items-center">
                    <Target className="w-4 h-4 mr-1" />
                    Category: {mistake.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Best Practices Carousel */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">Best Practices</h3>
          
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activePractice * 100}%)` }}>
                {bestPractices.map((practice) => (
                  <div key={practice.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <div className="flex items-center mb-6">
                        <div className="p-3 bg-blue-100 rounded-lg mr-4">
                          {practice.icon}
                        </div>
                        <h4 className="text-xl font-semibold">{practice.title}</h4>
                      </div>
                      
                      <p className="text-gray-600 mb-6">{practice.description}</p>
                      
                      <div className="mb-6">
                        <h5 className="font-semibold mb-3">Benefits:</h5>
                        <ul className="space-y-2">
                          {practice.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-center">
                              <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-semibold mb-3">Examples:</h5>
                        {practice.examples.map((example, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center text-green-600">
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              <p>{example.good}</p>
                            </div>
                            <div className="flex items-center text-red-600">
                              <XCircle className="w-4 h-4 mr-2" />
                              <p>{example.bad}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-6 space-x-2">
              {bestPractices.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActivePractice(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activePractice === index ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to practice ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Improve Your Translations?</h3>
          <p className="text-gray-600 mb-8">
            Start applying these best practices and avoid common mistakes in your next translation project.
          </p>
          <button className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300">
            Get Started
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommonMistakes;