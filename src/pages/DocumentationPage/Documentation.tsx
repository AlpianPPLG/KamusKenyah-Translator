import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Code,
  Book,
  GitBranch,
  Star,
  Clock,
  Check,
  AlertTriangle,
  Bug,
  Rocket,
  Zap,
  Info,
  RefreshCw,
} from "lucide-react";

interface Release {
  version: string;
  date: string;
  type: "major" | "minor" | "patch";
  highlights: string[];
  changes: {
    type: "new" | "improvement" | "fix" | "breaking";
    description: string;
  }[];
}

const releases: Release[] = [
  {
    version: "2.1.0",
    date: "2025-04-15",
    type: "minor",
    highlights: [
      "Enhanced translation accuracy for Asian languages",
      "New developer API endpoints",
      "Improved documentation structure",
    ],
    changes: [
      {
        type: "new",
        description: "Added support for Vietnamese regional dialects",
      },
      {
        type: "improvement",
        description: "Optimized translation speed for large documents",
      },
      {
        type: "fix",
        description: "Fixed RTL text rendering in PDF exports",
      },
    ],
  },
  {
    version: "2.0.0",
    date: "2025-03-01",
    type: "major",
    highlights: [
      "Complete architecture redesign",
      "New AI-powered translation engine",
      "Advanced developer tools",
    ],
    changes: [
      {
        type: "breaking",
        description: "Updated API authentication method - requires migration",
      },
      {
        type: "new",
        description: "Introduced real-time collaboration features",
      },
      {
        type: "improvement",
        description: "Enhanced translation memory system",
      },
    ],
  },
];

const Documentation = () => {
  const [selectedVersion, setSelectedVersion] = useState<string>(
    releases[0].version
  );

  const getChangeTypeIcon = (type: string) => {
    switch (type) {
      case "new":
        return <Rocket className="w-4 h-4 text-emerald-500" />;
      case "improvement":
        return <Zap className="w-4 h-4 text-blue-500" />;
      case "fix":
        return <Bug className="w-4 h-4 text-amber-500" />;
      case "breaking":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Documentation & Changelog
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Technical documentation, API references, and detailed changelog for
            developers and advanced users.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link
            to="#api-docs"
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200"
          >
            <Code className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              API Documentation
            </h3>
            <p className="text-gray-600">
              Complete API reference with examples and endpoints.
            </p>
          </Link>
          <Link
            to="#guides"
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200"
          >
            <Book className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Developer Guides
            </h3>
            <p className="text-gray-600">
              Step-by-step guides for implementation and integration.
            </p>
          </Link>
          <Link
            to="#changelog"
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200"
          >
            <GitBranch className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Changelog
            </h3>
            <p className="text-gray-600">
              Detailed release notes and version history.
            </p>
          </Link>
        </div>

        {/* Version Selector */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Clock className="w-6 h-6" />
              Release History
            </h2>
            <div className="flex items-center gap-3">
              <select
                value={selectedVersion}
                onChange={(e) => setSelectedVersion(e.target.value)}
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {releases.map((release) => (
                  <option key={release.version} value={release.version}>
                    Version {release.version}
                  </option>
                ))}
              </select>
              <Link
                to="#latest"
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
              >
                <RefreshCw className="w-4 h-4" />
                Latest
              </Link>
            </div>
          </div>

          {/* Release Notes */}
          {releases
            .filter(
              (release) =>
                !selectedVersion || release.version === selectedVersion
            )
            .map((release) => (
              <div key={release.version} className="mb-8 last:mb-0">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      Version {release.version}
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          release.type === "major"
                            ? "bg-red-100 text-red-800"
                            : release.type === "minor"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {release.type}
                      </span>
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Released on {release.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      <Star className="w-3 h-3 mr-1" />
                      {release.highlights.length} Highlights
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      <Check className="w-3 h-3 mr-1" />
                      {release.changes.length} Changes
                    </span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Release Highlights
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {release.highlights.map((highlight, index) => (
                      <li
                        key={index}
                        className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                      >
                        <Star className="w-5 h-5 text-yellow-500 mb-2" />
                        <p className="text-gray-700">{highlight}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Changes */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Detailed Changes
                  </h4>
                  <div className="space-y-3">
                    {release.changes.map((change, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200"
                      >
                        {getChangeTypeIcon(change.type)}
                        <div>
                          <span
                            className={`inline-block text-xs font-medium mb-1 ${
                              change.type === "new"
                                ? "text-emerald-700"
                                : change.type === "improvement"
                                ? "text-blue-700"
                                : change.type === "fix"
                                ? "text-amber-700"
                                : "text-red-700"
                            }`}
                          >
                            {change.type.toUpperCase()}
                          </span>
                          <p className="text-gray-700">{change.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Documentation;
