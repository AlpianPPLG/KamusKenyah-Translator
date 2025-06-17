"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import {
  Globe,
  Search,
  ChevronDown,
  Check,
  X,
  ArrowUpRight,
  Languages,
  Users,
  Clock,
  Award,
  MessageSquare,
  Heart,
  Sparkles,
  Filter,
  SortAsc,
  SortDesc,
} from "lucide-react"

// Custom utility function to replace cn
const classNames = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ")
}

// Types
interface Language {
  id: string
  name: string
  nativeName: string
  flag: string
  completionPercentage: number
  contributors: number
  status: "complete" | "in-progress" | "needs-help" | "coming-soon"
  recentActivity?: {
    date: string
    action: string
    contributor: string
  }
  region: "asia" | "europe" | "africa" | "americas" | "oceania"
  direction: "ltr" | "rtl"
  featured?: boolean
}

interface Contributor {
  id: string
  name: string
  avatar: string
  languages: string[]
  contributions: number
  joinedDate: string
}

interface LocalizationStats {
  totalLanguages: number
  completedLanguages: number
  inProgressLanguages: number
  totalContributors: number
  translationsLastMonth: number
  averageCompletionRate: number
}

// Sample data
const languages: Language[] = [
  {
    id: "en",
    name: "English",
    nativeName: "English",
    flag: "🇬🇧",
    completionPercentage: 100,
    contributors: 12,
    status: "complete",
    recentActivity: {
      date: "2023-11-15",
      action: "Updated 25 strings",
      contributor: "Sarah Johnson",
    },
    region: "europe",
    direction: "ltr",
    featured: true,
  },
  {
    id: "id",
    name: "Indonesian",
    nativeName: "Bahasa Indonesia",
    flag: "🇮🇩",
    completionPercentage: 100,
    contributors: 8,
    status: "complete",
    recentActivity: {
      date: "2023-11-10",
      action: "Completed translation",
      contributor: "Budi Santoso",
    },
    region: "asia",
    direction: "ltr",
    featured: true,
  },
  {
    id: "my",
    name: "Malay",
    nativeName: "Bahasa Melayu",
    flag: "🇲🇾",
    completionPercentage: 92,
    contributors: 6,
    status: "in-progress",
    recentActivity: {
      date: "2023-11-05",
      action: "Translated 50 strings",
      contributor: "Ahmad Razali",
    },
    region: "asia",
    direction: "ltr",
  },
  {
    id: "zh",
    name: "Chinese (Simplified)",
    nativeName: "简体中文",
    flag: "🇨🇳",
    completionPercentage: 85,
    contributors: 7,
    status: "in-progress",
    recentActivity: {
      date: "2023-11-02",
      action: "Updated technical terms",
      contributor: "Li Wei",
    },
    region: "asia",
    direction: "ltr",
  },
  {
    id: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
    completionPercentage: 78,
    contributors: 5,
    status: "in-progress",
    region: "asia",
    direction: "ltr",
  },
  {
    id: "ko",
    name: "Korean",
    nativeName: "한국어",
    flag: "🇰🇷",
    completionPercentage: 72,
    contributors: 4,
    status: "in-progress",
    region: "asia",
    direction: "ltr",
  },
  {
    id: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    completionPercentage: 68,
    contributors: 6,
    status: "in-progress",
    region: "europe",
    direction: "ltr",
  },
  {
    id: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    completionPercentage: 65,
    contributors: 5,
    status: "in-progress",
    region: "europe",
    direction: "ltr",
  },
  {
    id: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    completionPercentage: 60,
    contributors: 4,
    status: "in-progress",
    region: "europe",
    direction: "ltr",
  },
  {
    id: "ar",
    name: "Arabic",
    nativeName: "العربية",
    flag: "🇸🇦",
    completionPercentage: 45,
    contributors: 3,
    status: "needs-help",
    region: "asia",
    direction: "rtl",
  },
  {
    id: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    flag: "🇮🇳",
    completionPercentage: 40,
    contributors: 2,
    status: "needs-help",
    region: "asia",
    direction: "ltr",
  },
  {
    id: "pt",
    name: "Portuguese",
    nativeName: "Português",
    flag: "🇵🇹",
    completionPercentage: 35,
    contributors: 3,
    status: "needs-help",
    region: "europe",
    direction: "ltr",
  },
  {
    id: "ru",
    name: "Russian",
    nativeName: "Русский",
    flag: "🇷🇺",
    completionPercentage: 30,
    contributors: 2,
    status: "needs-help",
    region: "europe",
    direction: "ltr",
  },
  {
    id: "th",
    name: "Thai",
    nativeName: "ไทย",
    flag: "🇹🇭",
    completionPercentage: 25,
    contributors: 1,
    status: "needs-help",
    region: "asia",
    direction: "ltr",
  },
  {
    id: "tr",
    name: "Turkish",
    nativeName: "Türkçe",
    flag: "🇹🇷",
    completionPercentage: 20,
    contributors: 1,
    status: "needs-help",
    region: "europe",
    direction: "ltr",
  },
  {
    id: "vi",
    name: "Vietnamese",
    nativeName: "Tiếng Việt",
    flag: "🇻🇳",
    completionPercentage: 15,
    contributors: 1,
    status: "needs-help",
    region: "asia",
    direction: "ltr",
  },
  {
    id: "sw",
    name: "Swahili",
    nativeName: "Kiswahili",
    flag: "🇹🇿",
    completionPercentage: 0,
    contributors: 0,
    status: "coming-soon",
    region: "africa",
    direction: "ltr",
  },
  {
    id: "bn",
    name: "Bengali",
    nativeName: "বাংলা",
    flag: "🇧🇩",
    completionPercentage: 0,
    contributors: 0,
    status: "coming-soon",
    region: "asia",
    direction: "ltr",
  },
]

const featuredContributors: Contributor[] = [
  {
    id: "c1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    languages: ["en", "fr", "es"],
    contributions: 1245,
    joinedDate: "2022-05-15",
  },
  {
    id: "c2",
    name: "Budi Santoso",
    avatar: "/placeholder.svg?height=40&width=40",
    languages: ["id", "my", "en"],
    contributions: 987,
    joinedDate: "2022-06-22",
  },
  {
    id: "c3",
    name: "Li Wei",
    avatar: "/placeholder.svg?height=40&width=40",
    languages: ["zh", "en"],
    contributions: 756,
    joinedDate: "2022-08-10",
  },
  {
    id: "c4",
    name: "Ahmad Razali",
    avatar: "/placeholder.svg?height=40&width=40",
    languages: ["my", "id", "en"],
    contributions: 612,
    joinedDate: "2022-09-05",
  },
]

// Calculate statistics
const calculateStats = (): LocalizationStats => {
  const completedLanguages = languages.filter((lang) => lang.status === "complete").length
  const inProgressLanguages = languages.filter((lang) => lang.status === "in-progress").length

  const completionRates = languages
    .filter((lang) => lang.completionPercentage > 0)
    .map((lang) => lang.completionPercentage)

  const averageCompletionRate = completionRates.length
    ? Math.round(completionRates.reduce((acc, rate) => acc + rate, 0) / completionRates.length)
    : 0

  return {
    totalLanguages: languages.length,
    completedLanguages,
    inProgressLanguages,
    totalContributors: 42, // Example fixed number
    translationsLastMonth: 3567, // Example fixed number
    averageCompletionRate,
  }
}

const stats = calculateStats()

// Status badge component
const StatusBadge: React.FC<{ status: Language["status"] }> = ({ status }) => {
  const statusConfig = {
    complete: {
      bg: "bg-green-100",
      text: "text-green-700",
      label: "Complete",
      icon: <Check className="w-3 h-3" />,
    },
    "in-progress": {
      bg: "bg-blue-100",
      text: "text-blue-700",
      label: "In Progress",
      icon: <Clock className="w-3 h-3" />,
    },
    "needs-help": {
      bg: "bg-amber-100",
      text: "text-amber-700",
      label: "Needs Help",
      icon: <Users className="w-3 h-3" />,
    },
    "coming-soon": {
      bg: "bg-purple-100",
      text: "text-purple-700",
      label: "Coming Soon",
      icon: <Sparkles className="w-3 h-3" />,
    },
  }

  const config = statusConfig[status]

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      {config.icon}
      {config.label}
    </span>
  )
}

// Progress bar component
const ProgressBar: React.FC<{ percentage: number; size?: "sm" | "md" | "lg" }> = ({ percentage, size = "md" }) => {
  const getColorClass = (percent: number) => {
    if (percent >= 80) return "bg-green-500"
    if (percent >= 50) return "bg-blue-500"
    if (percent >= 20) return "bg-amber-500"
    return "bg-red-500"
  }

  const heightClass = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  }

  return (
    <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${heightClass[size]}`}>
      <div
        className={`${getColorClass(percentage)} h-full rounded-full transition-all duration-500 ease-out`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}

// Main component
const Localization: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<Language["status"] | null>(null)
  const [sortBy, setSortBy] = useState<"name" | "completion" | "contributors">("completion")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [activeTab, setActiveTab] = useState<"languages" | "contribute" | "stats">("languages")
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false)
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  // Filter and sort languages
  const filteredLanguages = languages.filter((language) => {
    const matchesSearch =
      language.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      language.nativeName.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRegion = selectedRegion ? language.region === selectedRegion : true
    const matchesStatus = selectedStatus ? language.status === selectedStatus : true

    return matchesSearch && matchesRegion && matchesStatus
  })

  const sortedLanguages = [...filteredLanguages].sort((a, b) => {
    if (sortBy === "name") {
      return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    } else if (sortBy === "completion") {
      return sortDirection === "asc"
        ? a.completionPercentage - b.completionPercentage
        : b.completionPercentage - a.completionPercentage
    } else {
      return sortDirection === "asc" ? a.contributors - b.contributors : b.contributors - a.contributors
    }
  })

  // Animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { top } = containerRef.current.getBoundingClientRect()
        if (top < window.innerHeight * 0.75) {
          controls.start("visible")
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check on mount

    return () => window.removeEventListener("scroll", handleScroll)
  }, [controls])

  // Toggle sort direction
  const handleSortClick = (newSortBy: typeof sortBy) => {
    if (sortBy === newSortBy) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(newSortBy)
      setSortDirection("desc")
    }
  }

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("")
    setSelectedRegion(null)
    setSelectedStatus(null)
    setSortBy("completion")
    setSortDirection("desc")
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  // Region options
  const regionOptions = [
    { value: "asia", label: "Asia" },
    { value: "europe", label: "Europe" },
    { value: "africa", label: "Africa" },
    { value: "americas", label: "Americas" },
    { value: "oceania", label: "Oceania" },
  ]

  // Status options
  const statusOptions = [
    { value: "complete", label: "Complete" },
    { value: "in-progress", label: "In Progress" },
    { value: "needs-help", label: "Needs Help" },
    { value: "coming-soon", label: "Coming Soon" },
  ]

  return (
    <div className="bg-white py-16 md:py-24" ref={containerRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-2 bg-blue-50 rounded-full mb-4">
            <Globe className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">KamusKenyah Goes Global</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Help us make KamusKenyah accessible to everyone by contributing to our localization efforts. Together, we
            can preserve the Kenyah language and make it available in many languages.
          </p>
        </motion.div>

        {/* Stats overview */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16"
        >
          {[
            {
              label: "Languages",
              value: stats.totalLanguages,
              icon: <Languages className="w-5 h-5" />,
              color: "blue",
            },
            {
              label: "Completed",
              value: stats.completedLanguages,
              icon: <Check className="w-5 h-5" />,
              color: "green",
            },
            {
              label: "In Progress",
              value: stats.inProgressLanguages,
              icon: <Clock className="w-5 h-5" />,
              color: "amber",
            },
            {
              label: "Contributors",
              value: stats.totalContributors,
              icon: <Users className="w-5 h-5" />,
              color: "purple",
            },
            {
              label: "Translations",
              value: stats.translationsLastMonth.toLocaleString(),
              icon: <MessageSquare className="w-5 h-5" />,
              color: "pink",
              subtitle: "Last Month",
            },
            {
              label: "Completion",
              value: `${stats.averageCompletionRate}%`,
              icon: <Award className="w-5 h-5" />,
              color: "indigo",
              subtitle: "Average",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`p-4 rounded-xl border border-${stat.color}-100 bg-${stat.color}-50`}
            >
              <div className={`p-2 rounded-full bg-${stat.color}-100 text-${stat.color}-600 w-fit mb-2`}>
                {stat.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                <span className="text-sm text-gray-600">
                  {stat.label}
                  {stat.subtitle && <span className="block text-xs">{stat.subtitle}</span>}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <div className="flex overflow-x-auto hide-scrollbar">
            {[
              { id: "languages", label: "Languages", icon: <Languages className="w-4 h-4" /> },
              { id: "contribute", label: "How to Contribute", icon: <Heart className="w-4 h-4" /> },
              { id: "stats", label: "Statistics", icon: <Award className="w-4 h-4" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                className={classNames(
                  "flex items-center gap-2 px-4 py-3 font-medium text-sm whitespace-nowrap",
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900",
                )}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Languages Tab Content */}
        {activeTab === "languages" && (
          <>
            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search languages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Region filter */}
                  <div className="relative">
                    <button
                      className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                      onClick={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)}
                    >
                      <span className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-gray-500" />
                        {selectedRegion ? regionOptions.find((r) => r.value === selectedRegion)?.label : "All Regions"}
                      </span>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </button>

                    {isRegionDropdownOpen && (
                      <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <button
                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => {
                              setSelectedRegion(null)
                              setIsRegionDropdownOpen(false)
                            }}
                          >
                            All Regions
                          </button>
                          {regionOptions.map((region) => (
                            <button
                              key={region.value}
                              className={classNames(
                                "block w-full px-4 py-2 text-left text-sm hover:bg-gray-100",
                                selectedRegion === region.value ? "text-blue-600 font-medium" : "text-gray-700",
                              )}
                              onClick={() => {
                                setSelectedRegion(region.value)
                                setIsRegionDropdownOpen(false)
                              }}
                            >
                              {region.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Status filter */}
                  <div className="relative">
                    <button
                      className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                      onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                    >
                      <span className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-gray-500" />
                        {selectedStatus ? statusOptions.find((s) => s.value === selectedStatus)?.label : "All Statuses"}
                      </span>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </button>

                    {isStatusDropdownOpen && (
                      <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <button
                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => {
                              setSelectedStatus(null)
                              setIsStatusDropdownOpen(false)
                            }}
                          >
                            All Statuses
                          </button>
                          {statusOptions.map((status) => (
                            <button
                              key={status.value}
                              className={classNames(
                                "block w-full px-4 py-2 text-left text-sm hover:bg-gray-100",
                                selectedStatus === status.value ? "text-blue-600 font-medium" : "text-gray-700",
                              )}
                              onClick={() => {
                                setSelectedStatus(status.value as Language["status"])
                                setIsStatusDropdownOpen(false)
                              }}
                            >
                              {status.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Reset filters */}
                  {(searchQuery || selectedRegion || selectedStatus) && (
                    <button
                      className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                      onClick={resetFilters}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reset
                    </button>
                  )}
                </div>
              </div>

              {/* Sort options */}
              <div className="flex items-center gap-4 mt-4">
                <span className="text-sm text-gray-500">Sort by:</span>
                <div className="flex gap-2">
                  {[
                    { id: "name", label: "Name" },
                    { id: "completion", label: "Completion" },
                    { id: "contributors", label: "Contributors" },
                  ].map((option) => (
                    <button
                      key={option.id}
                      className={classNames(
                        "flex items-center gap-1 px-3 py-1 text-sm rounded-full",
                        sortBy === option.id
                          ? "bg-blue-100 text-blue-700 font-medium"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                      )}
                      onClick={() => handleSortClick(option.id as typeof sortBy)}
                    >
                      {option.label}
                      {sortBy === option.id &&
                        (sortDirection === "asc" ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />)}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Results count */}
            <div className="mb-4 text-sm text-gray-500">
              Showing {sortedLanguages.length} of {languages.length} languages
            </div>

            {/* Languages grid */}
            {sortedLanguages.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={controls}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {sortedLanguages.map((language) => (
                  <motion.div
                    key={language.id}
                    variants={itemVariants}
                    className={classNames(
                      "relative border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md",
                      language.featured ? "ring-2 ring-blue-500 ring-offset-2" : "",
                    )}
                    onClick={() => setSelectedLanguage(language)}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{language.flag}</span>
                          <div>
                            <h3 className="font-medium text-gray-900">{language.name}</h3>
                            <p className="text-sm text-gray-500">{language.nativeName}</p>
                          </div>
                        </div>
                        <StatusBadge status={language.status} />
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Completion</span>
                          <span className="text-sm font-medium text-gray-900">{language.completionPercentage}%</span>
                        </div>
                        <ProgressBar percentage={language.completionPercentage} />
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                          {language.contributors} contributor{language.contributors !== 1 ? "s" : ""}
                        </span>
                        {language.recentActivity && (
                          <span className="text-gray-500 text-xs">
                            Updated {new Date(language.recentActivity.date).toLocaleDateString()}
                          </span>
                        )}
                      </div>

                      {language.featured && (
                        <div className="absolute top-2 right-2">
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-900">View details</span>
                      <ArrowUpRight className="h-4 w-4 text-gray-500" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12 border rounded-lg bg-gray-50">
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No languages found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
                <button
                  className="mt-4 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                  onClick={resetFilters}
                >
                  Reset all filters
                </button>
              </div>
            )}

            {/* Language detail modal */}
            <AnimatePresence>
              {selectedLanguage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                  onClick={() => setSelectedLanguage(null)}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{selectedLanguage.flag}</span>
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900">{selectedLanguage.name}</h2>
                            <p className="text-gray-600">{selectedLanguage.nativeName}</p>
                          </div>
                        </div>
                        <button
                          title="Close language details"
                          className="p-2 rounded-full hover:bg-gray-100"
                          onClick={() => setSelectedLanguage(null)}
                        >
                          <X className="h-5 w-5 text-gray-500" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h3 className="text-lg font-medium mb-3 text-gray-900">Translation Status</h3>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm text-gray-600">Completion</span>
                                <span className="text-sm font-medium text-gray-900">
                                  {selectedLanguage.completionPercentage}%
                                </span>
                              </div>
                              <ProgressBar percentage={selectedLanguage.completionPercentage} size="lg" />
                            </div>
                            <div className="flex items-center justify-between">
                              <StatusBadge status={selectedLanguage.status} />
                              <span className="text-sm text-gray-600">
                                {selectedLanguage.contributors} contributor
                                {selectedLanguage.contributors !== 1 ? "s" : ""}
                              </span>
                            </div>
                            {selectedLanguage.recentActivity && (
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <h4 className="text-sm font-medium text-gray-900 mb-1">Recent Activity</h4>
                                <p className="text-sm text-gray-600">{selectedLanguage.recentActivity.action}</p>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-xs text-gray-500">
                                    By {selectedLanguage.recentActivity.contributor}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {new Date(selectedLanguage.recentActivity.date).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-3 text-gray-900">Language Information</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-sm text-gray-600">Region</span>
                              <span className="text-sm font-medium text-gray-900">
                                {regionOptions.find((r) => r.value === selectedLanguage.region)?.label}
                              </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-sm text-gray-600">Text Direction</span>
                              <span className="text-sm font-medium text-gray-900">
                                {selectedLanguage.direction === "ltr" ? "Left to Right" : "Right to Left"}
                              </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-sm text-gray-600">ISO Code</span>
                              <span className="text-sm font-medium text-gray-900">{selectedLanguage.id}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 mt-6">
                        <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                          Contribute to Translation
                        </button>
                        <button className="flex-1 px-4 py-2 bg-white text-blue-600 border border-blue-200 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                          View Translation Guide
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* Contribute Tab Content */}
        {activeTab === "contribute" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="max-w-4xl mx-auto">
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">How to Contribute</h2>
                <p className="text-lg text-gray-600">
                  Join our global community of translators and help make KamusKenyah accessible to everyone. No
                  technical skills required - just your language knowledge and passion!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {[
                  {
                    title: "Sign Up",
                    description: "Create an account on our translation platform to get started.",
                    icon: <Users className="h-6 w-6" />,
                    color: "blue",
                  },
                  {
                    title: "Choose a Language",
                    description: "Select a language you're fluent in to start translating.",
                    icon: <Languages className="h-6 w-6" />,
                    color: "purple",
                  },
                  {
                    title: "Start Translating",
                    description: "Translate strings and help review others' translations.",
                    icon: <MessageSquare className="h-6 w-6" />,
                    color: "green",
                  },
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className={`p-6 rounded-xl border border-${step.color}-100 bg-${step.color}-50`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`p-3 rounded-full bg-${step.color}-100 text-${step.color}-600 mb-4`}>
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mb-16">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Translation Guidelines</h3>
                <div className="space-y-4">
                  {[
                    {
                      title: "Be accurate and natural",
                      description: "Ensure translations are accurate but also sound natural in the target language.",
                    },
                    {
                      title: "Maintain consistency",
                      description: "Use consistent terminology throughout the translation.",
                    },
                    {
                      title: "Respect cultural context",
                      description: "Adapt content to be culturally appropriate for the target audience.",
                    },
                    {
                      title: "Keep formatting",
                      description: "Preserve formatting elements like placeholders and special characters.",
                    },
                  ].map((guideline, index) => (
                    <div key={index} className="flex gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">{guideline.title}</h4>
                        <p className="text-gray-600">{guideline.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-16">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Featured Contributors</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {featuredContributors.map((contributor) => (
                    <div key={contributor.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                      <img
                        src={contributor.avatar || "/placeholder.svg"}
                        alt={contributor.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">{contributor.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {contributor.contributions.toLocaleString()} contributions
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {contributor.languages.map((langCode) => {
                            const lang = languages.find((l) => l.id === langCode)
                            return lang ? (
                              <span
                                key={langCode}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800"
                              >
                                {lang.flag} {lang.name}
                              </span>
                            ) : null
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Ready to Start?</h3>
                <p className="text-gray-600 mb-6">
                  Join our translation community today and help make KamusKenyah accessible to everyone.
                </p>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Join Translation Team
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats Tab Content */}
        {activeTab === "stats" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="max-w-4xl mx-auto">
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Translation Statistics</h2>
                <p className="text-lg text-gray-600">
                  Track our progress in making KamusKenyah accessible in multiple languages.
                </p>
              </div>

              <div className="mb-16">
                <h3 className="text-xl font-bold mb-6 text-gray-900">Completion by Language</h3>
                <div className="space-y-4">
                  {languages
                    .filter((lang) => lang.completionPercentage > 0)
                    .sort((a, b) => b.completionPercentage - a.completionPercentage)
                    .slice(0, 10)
                    .map((language) => (
                      <div key={language.id} className="flex items-center gap-4">
                        <div className="flex items-center gap-2 w-40">
                          <span className="text-xl">{language.flag}</span>
                          <span className="font-medium text-gray-900">{language.name}</span>
                        </div>
                        <div className="flex-grow">
                          <ProgressBar percentage={language.completionPercentage} />
                        </div>
                        <div className="w-16 text-right font-medium text-gray-900">
                          {language.completionPercentage}%
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-6 text-gray-900">Languages by Region</h3>
                  <div className="space-y-4">
                    {regionOptions.map((region) => {
                      const count = languages.filter((lang) => lang.region === region.value).length
                      return (
                        <div key={region.value} className="flex items-center justify-between">
                          <span className="text-gray-700">{region.label}</span>
                          <span className="font-medium text-gray-900">{count} languages</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-6 text-gray-900">Languages by Status</h3>
                  <div className="space-y-4">
                    {statusOptions.map((status) => {
                      const count = languages.filter((lang) => lang.status === status.value).length
                      return (
                        <div key={status.value} className="flex items-center justify-between">
                          <span className="text-gray-700">{status.label}</span>
                          <span className="font-medium text-gray-900">{count} languages</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-8 mb-16">
                <h3 className="text-xl font-bold mb-6 text-gray-900">Monthly Contributions</h3>
                <div className="h-64 flex items-end justify-between gap-2">
                  {[65, 78, 92, 86, 110, 132, 145, 139, 152, 178, 195, 210].map((value, index) => {
                    const height = `${(value / 210) * 100}%`
                    const month = new Date(2023, index).toLocaleString("default", { month: "short" })

                    return (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div className="w-full bg-blue-100 rounded-t-sm relative" style={{ height }}>
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-gray-700">
                            {value}
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-gray-600">{month}</div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Help Us Reach Our Goal</h3>
                <p className="text-gray-600 mb-6">
                  We aim to have KamusKenyah available in 25 languages by the end of the year.
                </p>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Current Progress</span>
                    <span className="text-sm font-medium text-gray-900">{stats.completedLanguages} / 25 languages</span>
                  </div>
                  <ProgressBar percentage={(stats.completedLanguages / 25) * 100} size="lg" />
                </div>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Contribute Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Localization
