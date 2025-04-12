"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Globe,
  Users,
  Star,
  Heart,
  Trophy,
  Code,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Rocket,
  Coffee,
  ExternalLink,
} from "lucide-react";

interface Contributor {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  contributions: string[];
  stats: {
    commits: number;
    issues: number;
    prs: number;
  };
  badges: string[];
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
    website?: string;
  };
  team: "core" | "contributor" | "translator" | "community";
}

const contributors: Contributor[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Lead Developer",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    bio: "Full-stack developer with a passion for language preservation and cultural heritage.",
    contributions: [
      "Core architecture design",
      "Translation engine implementation",
      "Performance optimization",
      "API development",
    ],
    stats: {
      commits: 847,
      issues: 132,
      prs: 256,
    },
    badges: ["Top Contributor", "Core Team", "Technical Lead"],
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "mailto:sarah@example.com",
      website: "https://example.com",
    },
    team: "core",
  },
  {
    id: 2,
    name: "David Chen",
    role: "UI/UX Designer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "Designer focused on creating intuitive and beautiful user experiences.",
    contributions: [
      "User interface design",
      "Design system creation",
      "User research",
      "Accessibility improvements",
    ],
    stats: {
      commits: 324,
      issues: 89,
      prs: 167,
    },
    badges: ["Design Lead", "UI Expert", "Accessibility Champion"],
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    team: "core",
  },
  {
    id: 3,
    name: "Maria Garcia",
    role: "Language Expert",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    bio: "Linguist specializing in Austronesian languages and digital preservation.",
    contributions: [
      "Language data curation",
      "Translation verification",
      "Cultural context addition",
      "Documentation",
    ],
    stats: {
      commits: 156,
      issues: 243,
      prs: 98,
    },
    badges: ["Language Expert", "Cultural Advisor", "Documentation Lead"],
    social: {
      linkedin: "https://linkedin.com",
      email: "mailto:maria@example.com",
    },
    team: "translator",
  },
];

const teamCategories = [
  { id: "all", label: "All Teams", icon: <Users className="w-5 h-5" /> },
  { id: "core", label: "Core Team", icon: <Star className="w-5 h-5" /> },
  {
    id: "contributor",
    label: "Contributors",
    icon: <Code className="w-5 h-5" />,
  },
  {
    id: "translator",
    label: "Translators",
    icon: <Globe className="w-5 h-5" />,
  },
  { id: "community", label: "Community", icon: <Heart className="w-5 h-5" /> },
];

const ContributorsPage: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<string>("all");
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  const filteredContributors =
    selectedTeam === "all"
      ? contributors
      : contributors.filter((contributor) => contributor.team === selectedTeam);

  const stats = {
    totalContributors: contributors.length,
    totalCommits: contributors.reduce(
      (acc, curr) => acc + curr.stats.commits,
      0
    ),
    totalPRs: contributors.reduce((acc, curr) => acc + curr.stats.prs, 0),
    activeTeams: new Set(contributors.map((c) => c.team)).size,
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 mb-4"
          >
            <Trophy className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Our Amazing Team</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Meet the{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Contributors
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Dedicated individuals working together to preserve and promote the
            Dayak Kenyah language through technology and innovation.
          </motion.p>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            {
              label: "Contributors",
              value: stats.totalContributors,
              icon: <Users className="w-6 h-6" />,
            },
            {
              label: "Total Commits",
              value: stats.totalCommits,
              icon: <Code className="w-6 h-6" />,
            },
            {
              label: "Pull Requests",
              value: stats.totalPRs,
              icon: <MessageSquare className="w-6 h-6" />,
            },
            {
              label: "Active Teams",
              value: stats.activeTeams,
              icon: <Rocket className="w-6 h-6" />,
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:border-blue-200 transition-colors"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {teamCategories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTeam(category.id)}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedTeam === category.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {category.icon}
              <span className="ml-2">{category.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Contributors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredContributors.map((contributor) => (
            <motion.div
              key={contributor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className={`bg-white rounded-xl border overflow-hidden transition-all duration-300 ${
                hoveredMember === contributor.id
                  ? "border-blue-400 shadow-lg shadow-blue-100"
                  : "border-gray-200 hover:border-blue-200"
              }`}
              onMouseEnter={() => setHoveredMember(contributor.id)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <div className="relative">
                <img
                  src={contributor.image || "/placeholder.svg"}
                  alt={contributor.name}
                  className={`w-full h-64 object-cover transition-transform duration-500 ${
                    hoveredMember === contributor.id ? "scale-105" : ""
                  }`}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${
                    hoveredMember === contributor.id
                      ? "opacity-80"
                      : "opacity-60"
                  }`}
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {contributor.name}
                  </h3>
                  <p className="text-white/80">{contributor.role}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {contributor.badges.map((badge, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 text-sm rounded-full flex items-center transition-colors duration-300 ${
                        hoveredMember === contributor.id
                          ? "bg-blue-100 text-blue-700"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      <Sparkles className="w-3 h-3 mr-1" />
                      {badge}
                    </span>
                  ))}
                </div>

                <p className="text-gray-600 mb-6">{contributor.bio}</p>

                <div className="space-y-4 mb-6">
                  <h4 className="font-medium text-gray-900">
                    Key Contributions:
                  </h4>
                  <ul className="space-y-2">
                    {contributor.contributions.map((contribution, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-600"
                      >
                        <ArrowRight
                          className={`w-4 h-4 mr-2 transition-colors duration-300 ${
                            hoveredMember === contributor.id
                              ? "text-blue-700"
                              : "text-blue-600"
                          }`}
                        />
                        {contribution}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                  <div className="flex space-x-4">
                    {contributor.social.github && (
                      <a
                        href={contributor.social.github}
                        className={`transition-colors duration-300 ${
                          hoveredMember === contributor.id
                            ? "text-gray-800"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                        aria-label="GitHub"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {contributor.social.linkedin && (
                      <a
                        href={contributor.social.linkedin}
                        className={`transition-colors duration-300 ${
                          hoveredMember === contributor.id
                            ? "text-blue-600"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {contributor.social.twitter && (
                      <a
                        href={contributor.social.twitter}
                        className={`transition-colors duration-300 ${
                          hoveredMember === contributor.id
                            ? "text-blue-400"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                        aria-label="Twitter"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                    {contributor.social.email && (
                      <a
                        href={contributor.social.email}
                        className={`transition-colors duration-300 ${
                          hoveredMember === contributor.id
                            ? "text-red-500"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                        aria-label="Email"
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    )}
                    {contributor.social.website && (
                      <a
                        href={contributor.social.website}
                        className={`transition-colors duration-300 ${
                          hoveredMember === contributor.id
                            ? "text-green-500"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                        aria-label="Website"
                      >
                        <Globe className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Code className="w-4 h-4" />
                    <span>{contributor.stats.commits} commits</span>
                    {hoveredMember === contributor.id && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        className="ml-2 flex items-center text-blue-600"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View profile
                      </motion.span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Want to Contribute?
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join our community of contributors and help us preserve the Dayak
              Kenyah language for future generations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="https://github.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
              >
                <Github className="w-5 h-5 mr-2" />
                View on GitHub
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-300"
              >
                <Coffee className="w-5 h-5 mr-2" />
                Support Project
              </motion.a>
            </div>
            <p className="text-blue-100 text-sm mt-6">
              Every contribution matters, no matter how small
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContributorsPage;
