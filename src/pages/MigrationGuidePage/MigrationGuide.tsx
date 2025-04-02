import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileCode,
  Database,
  Settings,
  Users,
  Layers,
  RefreshCw,
  Download,
  Upload,
  Clock,
  Shield,
  Zap,
  ChevronRight,
  PlayCircle,
  BookOpen,
  FileText,
  Terminal,
  GitBranch,
  Box,
  Server,
  MessageSquare,
} from "lucide-react";

interface MigrationStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
  complexity: "Easy" | "Medium" | "Complex";
  requirements: string[];
  steps: {
    title: string;
    description: string;
    code?: string;
    warning?: string;
    tip?: string;
  }[];
}

interface ComparisonFeature {
  name: string;
  description: string;
  currentPlatform: boolean;
  competitors: {
    [key: string]: boolean;
  };
}

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const MigrationGuide: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("All");
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [showComparison, setShowComparison] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"guide" | "comparison" | "faq">(
    "guide"
  );

  const platforms = [
    "All",
    "Google Translate",
    "Microsoft Translator",
    "DeepL",
    "Other Services",
  ];

  const migrationSteps: MigrationStep[] = [
    {
      id: 1,
      title: "Export Your Data",
      description:
        "Learn how to safely export your translation data from your current platform.",
      icon: <Download className="w-6 h-6" />,
      duration: "30-60 minutes",
      complexity: "Easy",
      requirements: [
        "Access to your current platform",
        "Storage space for exported data",
        "Admin privileges (if applicable)",
      ],
      steps: [
        {
          title: "Access Export Tools",
          description: "Navigate to your current platform's export section",
          tip: "Most platforms offer data export in JSON or CSV format",
        },
        {
          title: "Select Data Range",
          description: "Choose the date range and content types to export",
          warning: "Ensure you have enough storage space for the export",
        },
        {
          title: "Export Configuration",
          description: "Export your custom settings and configurations",
          code: `{
  "exportConfig": {
    "dateRange": "2023-01-01/2024-01-01",
    "contentTypes": ["translations", "glossary", "tm"],
    "format": "json"
  }
}`,
        },
      ],
    },
    {
      id: 2,
      title: "Prepare Your Environment",
      description:
        "Set up your new environment and configure initial settings.",
      icon: <Settings className="w-6 h-6" />,
      duration: "15-30 minutes",
      complexity: "Medium",
      requirements: [
        "API access credentials",
        "Admin account on new platform",
        "System requirements documentation",
      ],
      steps: [
        {
          title: "Configure API Access",
          description: "Set up your API credentials and authentication",
          code: `const config = {
  apiKey: 'your-api-key',
  endpoint: 'https://api.platform.com',
  version: 'v2'
};`,
        },
        {
          title: "Initialize Settings",
          description: "Configure your basic platform settings",
          tip: "Start with default settings and customize as needed",
        },
      ],
    },
    {
      id: 3,
      title: "Data Import",
      description: "Import your exported data into the new platform.",
      icon: <Upload className="w-6 h-6" />,
      duration: "1-2 hours",
      complexity: "Complex",
      requirements: [
        "Exported data files",
        "Data mapping documentation",
        "Backup of current data",
      ],
      steps: [
        {
          title: "Validate Data Format",
          description: "Ensure your data matches the required format",
          code: `// Example data structure
{
  "translations": [{
    "source": "Hello",
    "target": "Bonjour",
    "language": "fr",
    "context": "greeting"
  }]
}`,
        },
        {
          title: "Run Import Process",
          description: "Execute the data import process",
          warning: "This process may take several hours for large datasets",
        },
      ],
    },
  ];

  const comparisonFeatures: ComparisonFeature[] = [
    {
      name: "Neural Machine Translation",
      description: "Advanced AI-powered translation engine",
      currentPlatform: true,
      competitors: {
        "Google Translate": true,
        "Microsoft Translator": true,
        DeepL: true,
      },
    },
    {
      name: "Custom Terminology",
      description: "Maintain consistent terminology across translations",
      currentPlatform: true,
      competitors: {
        "Google Translate": false,
        "Microsoft Translator": true,
        DeepL: true,
      },
    },
    {
      name: "Batch Processing",
      description: "Process multiple documents simultaneously",
      currentPlatform: true,
      competitors: {
        "Google Translate": false,
        "Microsoft Translator": true,
        DeepL: false,
      },
    },
  ];

  const faqs: FAQ[] = [
    {
      question: "How long does the migration process typically take?",
      answer:
        "The migration process duration varies depending on your data volume and complexity. Small projects typically take 1-2 hours, while enterprise migrations might take several days.",
      category: "General",
    },
    {
      question: "Can I migrate my translation memory?",
      answer:
        "Yes, we support importing translation memory in TMX and XLIFF formats. Our system will automatically validate and clean the data during import.",
      category: "Technical",
    },
    {
      question: "Will my existing integrations continue to work?",
      answer:
        "We provide compatibility layers for most common integration patterns. Our team can help you adapt your existing integrations to work with our API.",
      category: "Integration",
    },
  ];

  const getComplexityColor = (complexity: "Easy" | "Medium" | "Complex") => {
    switch (complexity) {
      case "Easy":
        return "text-green-500";
      case "Medium":
        return "text-yellow-500";
      case "Complex":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Migration Guide</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Follow our comprehensive guide to seamlessly transition from your
            current translation service to our platform.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
            <div className="flex items-center mb-2">
              <Clock className="w-6 h-6 text-blue-500 mr-2" />
              <h3 className="font-semibold">Average Time</h3>
            </div>
            <p className="text-3xl font-bold text-blue-600">2-4 hrs</p>
            <p className="text-sm text-gray-600 mt-1">For standard migration</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
            <div className="flex items-center mb-2">
              <CheckCircle2 className="w-6 h-6 text-green-500 mr-2" />
              <h3 className="font-semibold">Success Rate</h3>
            </div>
            <p className="text-3xl font-bold text-green-600">99.9%</p>
            <p className="text-sm text-gray-600 mt-1">Migration completion</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
            <div className="flex items-center mb-2">
              <Shield className="w-6 h-6 text-purple-500 mr-2" />
              <h3 className="font-semibold">Data Security</h3>
            </div>
            <p className="text-3xl font-bold text-purple-600">100%</p>
            <p className="text-sm text-gray-600 mt-1">Encrypted transfer</p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6">
            <div className="flex items-center mb-2">
              <Users className="w-6 h-6 text-amber-500 mr-2" />
              <h3 className="font-semibold">Support</h3>
            </div>
            <p className="text-3xl font-bold text-amber-600">24/7</p>
            <p className="text-sm text-gray-600 mt-1">Expert assistance</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-gray-50">
            <button
              onClick={() => setActiveTab("guide")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === "guide"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Migration Steps
            </button>
            <button
              onClick={() => setActiveTab("comparison")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === "comparison"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Platform Comparison
            </button>
            <button
              onClick={() => setActiveTab("faq")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === "faq"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              FAQ
            </button>
          </div>
        </div>

        {/* Platform Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Choose Your Current Platform
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {platforms.map((platform) => (
              <button
                key={platform}
                onClick={() => setSelectedPlatform(platform)}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                  selectedPlatform === platform
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "guide" && (
          /* Migration Steps */
          <div className="space-y-8">
            {migrationSteps.map((step) => (
              <div
                key={step.id}
                className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300"
              >
                <div
                  className="p-6 cursor-pointer"
                  onClick={() =>
                    setExpandedStep(expandedStep === step.id ? null : step.id)
                  }
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="bg-blue-100 rounded-lg p-3 mr-4">
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-1">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">
                        {step.duration}
                      </span>
                      <span
                        className={`text-sm font-medium ${getComplexityColor(
                          step.complexity
                        )}`}
                      >
                        {step.complexity}
                      </span>
                      <ChevronRight
                        className={`w-5 h-5 text-gray-400 transition-transform ${
                          expandedStep === step.id ? "rotate-90" : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {expandedStep === step.id && (
                  <div className="border-t border-gray-100 p-6 bg-gray-50">
                    {/* Requirements */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Requirements</h4>
                      <ul className="space-y-2">
                        {step.requirements.map((req, index) => (
                          <li
                            key={index}
                            className="flex items-center text-gray-600"
                          >
                            <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Detailed Steps */}
                    <div className="space-y-6">
                      {step.steps.map((substep, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-lg p-4 shadow-sm"
                        >
                          <h5 className="font-semibold mb-2">
                            {substep.title}
                          </h5>
                          <p className="text-gray-600 mb-3">
                            {substep.description}
                          </p>

                          {substep.code && (
                            <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm overflow-x-auto mb-3">
                              <code>{substep.code}</code>
                            </pre>
                          )}

                          {substep.warning && (
                            <div className="flex items-start bg-red-50 text-red-700 rounded-lg p-3 text-sm">
                              <AlertCircle className="w-4 h-4 mr-2 mt-0.5" />
                              {substep.warning}
                            </div>
                          )}

                          {substep.tip && (
                            <div className="flex items-start bg-blue-50 text-blue-700 rounded-lg p-3 text-sm">
                              <Zap className="w-4 h-4 mr-2 mt-0.5" />
                              {substep.tip}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "comparison" && (
          /* Platform Comparison */
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Feature
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      Our Platform
                    </th>
                    {Object.keys(comparisonFeatures[0].competitors).map(
                      (competitor) => (
                        <th
                          key={competitor}
                          className="px-6 py-4 text-center text-sm font-semibold text-gray-900"
                        >
                          {competitor}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisonFeatures.map((feature, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {feature.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {feature.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {feature.currentPlatform ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                        )}
                      </td>
                      {Object.entries(feature.competitors).map(
                        ([competitor, supported]) => (
                          <td
                            key={competitor}
                            className="px-6 py-4 text-center"
                          >
                            {supported ? (
                              <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                            )}
                          </td>
                        )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "faq" && (
          /* FAQ Section */
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
              >
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-2 mr-4">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">{faq.answer}</p>
                    <span className="inline-block mt-3 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {faq.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Start Your Migration?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our team of experts is ready to help you transition smoothly to our
            platform. Start your migration journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300">
              Start Migration
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
            <button className="inline-flex items-center px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:border-blue-500 hover:text-blue-500 transition-all duration-300">
              Contact Support
              <MessageSquare className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MigrationGuide;
