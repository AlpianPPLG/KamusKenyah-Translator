import React, { useState, useEffect } from "react";
import { 
  Globe, 
  Search, 
  Layers, 
  Users, 
  ChevronRight, 
  ChevronDown,
  Home,
  Settings,
  FileText,
  FolderTree,
  Info,
  ShoppingCart,
  Clock,
  Eye,
  Filter
} from "lucide-react";

// Site structure data
interface SiteSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  pages: SitePage[];
  expanded?: boolean;
}

interface SitePage {
  id: string;
  title: string;
  url: string;
  description: string;
  status: 'live' | 'development' | 'planned';
  lastUpdated: string;
  analytics?: {
    visits: number;
    conversion: number;
  };
  seo?: {
    score: number;
    keywords: string[];
  };
  responsiveness: number; // 1-5 scale
  dependencies?: string[];
  tags: string[];
}

interface SiteStats {
  totalPages: number;
  totalSections: number;
  averageSeoScore: number;
  averageResponsiveness: number;
  pagesInDevelopment: number;
  lastSiteUpdate: string;
}

// Demo data
const siteSections: SiteSection[] = [
  {
    id: "homepage",
    title: "Homepage & Landing",
    description: "Main entry points and landing pages for the site",
    icon: <Home className="h-5 w-5 text-blue-500" />,
    pages: [
      {
        id: "main-home",
        title: "Main Homepage",
        url: "/",
        description: "Primary landing page with product highlights and CTAs",
        status: "live",
        lastUpdated: "2023-11-05",
        analytics: {
          visits: 45800,
          conversion: 3.2,
        },
        seo: {
          score: 92,
          keywords: ["product", "solution", "homepage", "main"],
        },
        responsiveness: 5,
        tags: ["featured", "high-traffic", "conversion-focused"],
      },
      {
        id: "product-landing",
        title: "Product Landing Page",
        url: "/products",
        description: "Showcases main product features and benefits",
        status: "live",
        lastUpdated: "2023-10-28",
        analytics: {
          visits: 32400,
          conversion: 4.7,
        },
        seo: {
          score: 88,
          keywords: ["product features", "benefits", "solutions"],
        },
        responsiveness: 5,
        tags: ["featured", "product-focused"],
      },
      {
        id: "campaign-landing",
        title: "Campaign Landing",
        url: "/special-offer",
        description: "Time-limited campaign with special offers",
        status: "development",
        lastUpdated: "2023-11-10",
        analytics: {
          visits: 0,
          conversion: 0,
        },
        seo: {
          score: 75,
          keywords: ["special offer", "limited time", "discount"],
        },
        responsiveness: 4,
        tags: ["campaign", "conversion-focused"],
      }
    ]
  },
  {
    id: "products",
    title: "Products & Services",
    description: "Product listings, categories, and service details",
    icon: <ShoppingCart className="h-5 w-5 text-emerald-500" />,
    pages: [
      {
        id: "product-catalog",
        title: "Product Catalog",
        url: "/products/catalog",
        description: "Complete listing of all available products",
        status: "live",
        lastUpdated: "2023-11-02",
        analytics: {
          visits: 28900,
          conversion: 3.5,
        },
        seo: {
          score: 90,
          keywords: ["products", "catalog", "listing"],
        },
        responsiveness: 5,
        tags: ["high-traffic", "product-focused"],
      },
      {
        id: "product-details",
        title: "Product Details Template",
        url: "/products/[id]",
        description: "Template for individual product details",
        status: "live",
        lastUpdated: "2023-10-30",
        analytics: {
          visits: 24500,
          conversion: 5.2,
        },
        seo: {
          score: 87,
          keywords: ["product details", "specifications", "features"],
        },
        responsiveness: 5,
        dependencies: ["Catalog API", "Review System"],
        tags: ["template", "conversion-focused"],
      },
      {
        id: "services-page",
        title: "Services Overview",
        url: "/services",
        description: "Overview of available services and packages",
        status: "live",
        lastUpdated: "2023-10-15",
        analytics: {
          visits: 15200,
          conversion: 2.8,
        },
        seo: {
          score: 84,
          keywords: ["services", "packages", "support"],
        },
        responsiveness: 4,
        tags: ["service-focused"],
      },
      {
        id: "comparison-tool",
        title: "Product Comparison Tool",
        url: "/products/compare",
        description: "Tool for comparing multiple products side by side",
        status: "development",
        lastUpdated: "2023-11-08",
        responsiveness: 3,
        dependencies: ["Catalog API", "Feature Comparison Engine"],
        tags: ["tool", "development"],
      }
    ]
  },
  {
    id: "account",
    title: "User Account & Dashboard",
    description: "User management, dashboard, and account settings",
    icon: <Users className="h-5 w-5 text-indigo-500" />,
    pages: [
      {
        id: "login",
        title: "Login Page",
        url: "/account/login",
        description: "User authentication page",
        status: "live",
        lastUpdated: "2023-10-25",
        analytics: {
          visits: 18700,
          conversion: 82.5,
        },
        seo: {
          score: 75,
          keywords: ["login", "sign in", "account"],
        },
        responsiveness: 5,
        dependencies: ["Authentication Service"],
        tags: ["account", "authentication"],
      },
      {
        id: "dashboard",
        title: "User Dashboard",
        url: "/account/dashboard",
        description: "Main user dashboard with account overview",
        status: "live",
        lastUpdated: "2023-11-01",
        analytics: {
          visits: 12400,
          conversion: 100,
        },
        seo: {
          score: 65,
          keywords: ["dashboard", "account management"],
        },
        responsiveness: 4,
        dependencies: ["Authentication Service", "User API"],
        tags: ["account", "dashboard"],
      },
      {
        id: "settings",
        title: "Account Settings",
        url: "/account/settings",
        description: "User profile and account settings management",
        status: "live",
        lastUpdated: "2023-10-28",
        analytics: {
          visits: 8500,
          conversion: 100,
        },
        seo: {
          score: 60,
          keywords: ["account settings", "profile settings"],
        },
        responsiveness: 4,
        dependencies: ["User API", "Preferences Service"],
        tags: ["account", "settings"],
      }
    ]
  },
  {
    id: "resources",
    title: "Resources & Support",
    description: "Help center, documentation, FAQs and resources",
    icon: <FileText className="h-5 w-5 text-amber-500" />,
    pages: [
      {
        id: "help-center",
        title: "Help Center",
        url: "/help",
        description: "Central hub for support resources",
        status: "live",
        lastUpdated: "2023-10-20",
        analytics: {
          visits: 9600,
          conversion: 45.3,
        },
        seo: {
          score: 82,
          keywords: ["help", "support", "assistance"],
        },
        responsiveness: 5,
        tags: ["support", "help"],
      },
      {
        id: "documentation",
        title: "Documentation",
        url: "/docs",
        description: "Comprehensive product documentation",
        status: "live",
        lastUpdated: "2023-11-03",
        analytics: {
          visits: 7800,
          conversion: 32.1,
        },
        seo: {
          score: 88,
          keywords: ["documentation", "guides", "manuals"],
        },
        responsiveness: 4,
        dependencies: ["Documentation CMS"],
        tags: ["documentation", "technical"],
      },
      {
        id: "faqs",
        title: "Frequently Asked Questions",
        url: "/faq",
        description: "Common questions and answers",
        status: "live",
        lastUpdated: "2023-10-18",
        analytics: {
          visits: 11200,
          conversion: 28.7,
        },
        seo: {
          score: 90,
          keywords: ["FAQ", "questions", "answers"],
        },
        responsiveness: 5,
        tags: ["support", "faq"],
      },
      {
        id: "knowledge-base",
        title: "Knowledge Base",
        url: "/knowledge-base",
        description: "Searchable knowledge repository",
        status: "planned",
        lastUpdated: "2023-11-05",
        responsiveness: 3,
        dependencies: ["Knowledge Base Engine", "Search API"],
        tags: ["planned", "knowledge"],
      }
    ]
  },
  {
    id: "company",
    title: "Company & Legal",
    description: "About us, policies, legal information, and company details",
    icon: <Info className="h-5 w-5 text-purple-500" />,
    pages: [
      {
        id: "about",
        title: "About Us",
        url: "/about",
        description: "Company information and history",
        status: "live",
        lastUpdated: "2023-09-15",
        analytics: {
          visits: 6500,
          conversion: 12.5,
        },
        seo: {
          score: 86,
          keywords: ["about", "company", "history"],
        },
        responsiveness: 5,
        tags: ["company"],
      },
      {
        id: "team",
        title: "Our Team",
        url: "/team",
        description: "Team members and leadership",
        status: "live",
        lastUpdated: "2023-10-10",
        analytics: {
          visits: 4800,
          conversion: 8.2,
        },
        seo: {
          score: 78,
          keywords: ["team", "leadership", "employees"],
        },
        responsiveness: 4,
        tags: ["company"],
      },
      {
        id: "privacy",
        title: "Privacy Policy",
        url: "/privacy",
        description: "Privacy policy and data handling practices",
        status: "live",
        lastUpdated: "2023-09-30",
        analytics: {
          visits: 3200,
          conversion: 5.1,
        },
        seo: {
          score: 70,
          keywords: ["privacy", "policy", "data protection"],
        },
        responsiveness: 5,
        tags: ["legal", "policy"],
      },
      {
        id: "terms",
        title: "Terms of Service",
        url: "/terms",
        description: "Terms and conditions for using our services",
        status: "live",
        lastUpdated: "2023-09-30",
        analytics: {
          visits: 2800,
          conversion: 4.8,
        },
        seo: {
          score: 68,
          keywords: ["terms", "conditions", "service"],
        },
        responsiveness: 5,
        tags: ["legal", "policy"],
      },
      {
        id: "cookies",
        title: "Cookie Policy",
        url: "/cookies",
        description: "Information about our use of cookies",
        status: "live",
        lastUpdated: "2023-09-30",
        analytics: {
          visits: 1900,
          conversion: 3.5,
        },
        seo: {
          score: 72,
          keywords: ["cookies", "policy", "tracking"],
        },
        responsiveness: 5,
        tags: ["legal", "policy"],
      }
    ]
  },
  {
    id: "other",
    title: "Other Pages",
    description: "Miscellaneous pages that don't fit other categories",
    icon: <FolderTree className="h-5 w-5 text-gray-500" />,
    pages: [
      {
        id: "sitemap",
        title: "Sitemap",
        url: "/sitemap",
        description: "Site structure overview",
        status: "live",
        lastUpdated: "2023-11-05",
        analytics: {
          visits: 980,
          conversion: 2.1,
        },
        seo: {
          score: 95,
          keywords: ["sitemap", "site structure", "navigation"],
        },
        responsiveness: 5,
        tags: ["utility"],
      },
      {
        id: "error-404",
        title: "404 Error Page",
        url: "/404",
        description: "Page not found error handling",
        status: "live",
        lastUpdated: "2023-10-01",
        analytics: {
          visits: 3400,
          conversion: 15.2,
        },
        seo: {
          score: 60,
          keywords: ["error", "not found", "404"],
        },
        responsiveness: 5,
        tags: ["error", "utility"],
      },
      {
        id: "maintenance",
        title: "Maintenance Page",
        url: "/maintenance",
        description: "Temporary page during site maintenance",
        status: "planned",
        lastUpdated: "2023-11-01",
        responsiveness: 4,
        tags: ["utility", "planned"],
      }
    ]
  }
];

// Calculate site statistics
const calculateStats = (): SiteStats => {
  const allPages = siteSections.flatMap(section => section.pages);
  const totalPages = allPages.length;
  const totalSections = siteSections.length;
  
  // SEO and responsiveness calculations
  const pagesWithSeoScore = allPages.filter(page => page.seo?.score);
  const totalSeoScore = pagesWithSeoScore.reduce((sum, page) => sum + (page.seo?.score || 0), 0);
  const averageSeoScore = pagesWithSeoScore.length > 0 ? totalSeoScore / pagesWithSeoScore.length : 0;
  
  const totalResponsiveness = allPages.reduce((sum, page) => sum + page.responsiveness, 0);
  const averageResponsiveness = totalResponsiveness / totalPages;
  
  // Pages in development
  const pagesInDevelopment = allPages.filter(page => page.status === 'development' || page.status === 'planned').length;
  
  // Find the most recently updated page
  const lastUpdatedPage = allPages.reduce((latest, page) => {
    return new Date(page.lastUpdated) > new Date(latest.lastUpdated) ? page : latest;
  }, allPages[0]);
  
  return {
    totalPages,
    totalSections,
    averageSeoScore: Math.round(averageSeoScore * 10) / 10,
    averageResponsiveness: Math.round(averageResponsiveness * 10) / 10,
    pagesInDevelopment,
    lastSiteUpdate: lastUpdatedPage.lastUpdated
  };
};

const Site = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'live' | 'development' | 'planned'>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'title' | 'lastUpdated' | 'visits' | 'seo'>('lastUpdated');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [stats] = useState<SiteStats>(calculateStats());
  const [isMapView, setIsMapView] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Get all unique tags from pages
  const allTags = Array.from(
    new Set(siteSections.flatMap(section => section.pages.flatMap(page => page.tags)))
  ).sort();

  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  // Filter pages based on search, status, and tags
  const filteredSections = siteSections.map(section => {
    const filteredPages = section.pages.filter(page => {
      // Search filter
      const matchesSearch = 
        searchQuery === "" || 
        page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.url.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Status filter
      const matchesStatus = 
        selectedStatus === 'all' || 
        page.status === selectedStatus;
      
      // Tags filter
      const matchesTags = 
        selectedTags.length === 0 || 
        selectedTags.some(tag => page.tags.includes(tag));
      
      return matchesSearch && matchesStatus && matchesTags;
    });

    // Sort pages
    const sortedPages = [...filteredPages].sort((a, b) => {
      if (sortBy === 'title') {
        return sortDirection === 'asc' 
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (sortBy === 'lastUpdated') {
        return sortDirection === 'asc'
          ? new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()
          : new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      } else if (sortBy === 'visits') {
        const visitsA = a.analytics?.visits || 0;
        const visitsB = b.analytics?.visits || 0;
        return sortDirection === 'asc' 
          ? visitsA - visitsB
          : visitsB - visitsA;
      } else if (sortBy === 'seo') {
        const seoA = a.seo?.score || 0;
        const seoB = b.seo?.score || 0;
        return sortDirection === 'asc' 
          ? seoA - seoB
          : seoB - seoA;
      }
      return 0;
    });

    return {
      ...section,
      pages: sortedPages
    };
  }).filter(section => section.pages.length > 0);

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedStatus('all');
    setSelectedTags([]);
    setSortBy('lastUpdated');
    setSortDirection('desc');
  };

  // Toggle sort direction
  const toggleSort = (field: 'title' | 'lastUpdated' | 'visits' | 'seo') => {
    if (sortBy === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('desc');
    }
  };

  // Expand all sections
  useEffect(() => {
    const allExpanded = siteSections.reduce((acc, section) => {
      acc[section.id] = true;
      return acc;
    }, {} as Record<string, boolean>);

    setExpandedSections(allExpanded);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-2 bg-white bg-opacity-10 rounded-full mb-4">
              <Globe className="w-6 h-6 mr-2 text-gray-900" />
              <span className="text-sm font-medium text-gray-900">Site Structure</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Site Architecture & Pages</h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              Complete overview of our website structure, pages, and their performance metrics
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search pages by title, description or URL..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsMapView(!isMapView)}
                className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                  isMapView 
                    ? "bg-indigo-100 text-indigo-700 border-indigo-200" 
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                <Layers className="w-5 h-5 mr-1.5" />
                <span>{isMapView ? "Card View" : "Map View"}</span>
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-5 h-5 mr-1.5" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-2">Page Status</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedStatus('all')}
                      className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                        selectedStatus === 'all'
                          ? "bg-indigo-100 text-indigo-800 border border-indigo-200"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      All Pages
                    </button>
                    <button
                      onClick={() => setSelectedStatus('live')}
                      className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                        selectedStatus === 'live'
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      Live
                    </button>
                    <button
                      onClick={() => setSelectedStatus('development')}
                      className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                        selectedStatus === 'development'
                          ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      Development
                    </button>
                    <button
                      onClick={() => setSelectedStatus('planned')}
                      className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                        selectedStatus === 'planned'
                          ? "bg-blue-100 text-blue-800 border border-blue-200"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      Planned
                    </button>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-2">Sort By</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => toggleSort('title')}
                      className={`flex items-center px-3 py-1.5 text-sm rounded-full transition-colors ${
                        sortBy === 'title'
                          ? "bg-indigo-100 text-indigo-800 border border-indigo-200"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <span>Title</span>
                      {sortBy === 'title' && (
                        sortDirection === 'asc' 
                          ? <ChevronDown className="ml-1 w-4 h-4" /> 
                          : <ChevronRight className="ml-1 w-4 h-4 transform rotate-90" />
                      )}
                    </button>
                    <button
                      onClick={() => toggleSort('lastUpdated')}
                      className={`flex items-center px-3 py-1.5 text-sm rounded-full transition-colors ${
                        sortBy === 'lastUpdated'
                          ? "bg-indigo-100 text-indigo-800 border border-indigo-200"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <span>Updated</span>
                      {sortBy === 'lastUpdated' && (
                        sortDirection === 'asc' 
                          ? <ChevronDown className="ml-1 w-4 h-4" /> 
                          : <ChevronRight className="ml-1 w-4 h-4 transform rotate-90" />
                      )}
                    </button>
                    <button
                      onClick={() => toggleSort('visits')}
                      className={`flex items-center px-3 py-1.5 text-sm rounded-full transition-colors ${
                        sortBy === 'visits'
                          ? "bg-indigo-100 text-indigo-800 border border-indigo-200"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <span>Visits</span>
                      {sortBy === 'visits' && (
                        sortDirection === 'asc' 
                          ? <ChevronDown className="ml-1 w-4 h-4" /> 
                          : <ChevronRight className="ml-1 w-4 h-4 transform rotate-90" />
                      )}
                    </button>
                    <button
                      onClick={() => toggleSort('seo')}
                      className={`flex items-center px-3 py-1.5 text-sm rounded-full transition-colors ${
                        sortBy === 'seo'
                          ? "bg-indigo-100 text-indigo-800 border border-indigo-200"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <span>SEO Score</span>
                      {sortBy === 'seo' && (
                        sortDirection === 'asc' 
                          ? <ChevronDown className="ml-1 w-4 h-4" /> 
                          : <ChevronRight className="ml-1 w-4 h-4 transform rotate-90" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-medium text-gray-900 mb-2">Filter by Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                        selectedTags.includes(tag)
                          ? "bg-indigo-100 text-indigo-800 border border-indigo-200"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          )}

          {/* Results Summary */}
          {(searchQuery || selectedStatus !== 'all' || selectedTags.length > 0) && (
            <div className="text-sm text-gray-600 mt-2">
              Found {filteredSections.reduce((total, section) => total + section.pages.length, 0)} page(s) matching your criteria
              {searchQuery && <span> containing "<strong>{searchQuery}</strong>"</span>}
              {selectedStatus !== 'all' && <span> with status <strong>{selectedStatus}</strong></span>}
              {selectedTags.length > 0 && (
                <span> tagged with {selectedTags.map((tag, i) => (
                  <span key={tag}>
                    {i > 0 && i < selectedTags.length - 1 && ", "}
                    {i === selectedTags.length - 1 && i !== 0 && " and "}
                    <strong>{tag}</strong>
                  </span>
                ))}</span>
              )}
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-10">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm mb-1">Total Pages</div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalPages}</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm mb-1">Sections</div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalSections}</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm mb-1">Avg. SEO Score</div>
            <div className="text-2xl font-bold text-gray-900">{stats.averageSeoScore}/100</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm mb-1">Responsiveness</div>
            <div className="text-2xl font-bold text-gray-900">{stats.averageResponsiveness}/5</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm mb-1">In Development</div>
            <div className="text-2xl font-bold text-gray-900">{stats.pagesInDevelopment}</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm mb-1">Last Updated</div>
            <div className="text-2xl font-bold text-gray-900">{new Date(stats.lastSiteUpdate).toLocaleDateString()}</div>
          </div>
        </div>

        {/* Main Content - Either Card View or Map View */}
        {!isMapView ? (
          // Card View
          <div className="space-y-10">
            {filteredSections.map((section) => (
              <div key={section.id} id={section.id} className="scroll-mt-24">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-gray-100 mr-3">
                      {section.icon}
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                    <span className="ml-3 text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                      {section.pages.length} page{section.pages.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    {expandedSections[section.id] ? (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                </div>
                
                <p className="text-gray-600 mb-4">{section.description}</p>
                
                {expandedSections[section.id] && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {section.pages.map(page => (
                      <div 
                        key={page.id}
                        className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
                      >
                        <div className="p-5 flex-grow">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-lg text-gray-900 mb-1">
                              {page.title}
                            </h3>
                            <div 
                              className={`text-xs px-2 py-1 rounded-full font-medium ${
                                page.status === 'live'
                                  ? 'bg-green-100 text-green-800'
                                  : page.status === 'development'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {page.status.charAt(0).toUpperCase() + page.status.slice(1)}
                            </div>
                          </div>
                          
                          <div className="text-gray-500 mb-2">
                            <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">
                              {page.url}
                            </code>
                          </div>
                          
                          <p className="text-gray-600 text-sm mb-4">{page.description}</p>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {page.tags.map(tag => (
                              <span 
                                key={tag} 
                                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          {page.seo && (
                            <div className="flex items-center mb-2">
                              <div 
                                className={`w-16 h-2 rounded-full mr-2 ${
                                  page.seo.score >= 80 ? 'bg-green-500' : 
                                  page.seo.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                              >
                                <div 
                                  className="h-full bg-gray-200 rounded-full" 
                                  style={{ width: `${100 - page.seo.score}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-600">
                                SEO: {page.seo.score}/100
                              </span>
                            </div>
                          )}
                          
                          {page.analytics && (
                            <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                              <div className="bg-gray-50 p-2 rounded">
                                <div className="text-gray-500">Monthly Visits</div>
                                <div className="font-medium">{page.analytics.visits.toLocaleString()}</div>
                              </div>
                              <div className="bg-gray-50 p-2 rounded">
                                <div className="text-gray-500">Conversion</div>
                                <div className="font-medium">{page.analytics.conversion}%</div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="bg-gray-50 px-5 py-3 text-xs text-gray-600 flex justify-between items-center">
                          <div className="flex items-center">
                            <Clock className="w-3.5 h-3.5 mr-1" />
                            <span>Updated: {new Date(page.lastUpdated).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center">
                            <Eye className="w-3.5 h-3.5 mr-1" />
                            <span>Responsive: {page.responsiveness}/5</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          // Visual Sitemap View
          <div className="bg-white rounded-xl shadow-md p-6 overflow-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Visual Sitemap</h2>
            <div className="relative min-w-[800px]">
              {/* Center root node */}
              <div className="flex justify-center mb-12">
                <div className="bg-indigo-100 text-indigo-800 font-medium px-4 py-2 rounded-full border-2 border-indigo-300 inline-flex items-center">
                  <Home className="w-4 h-4 mr-2" />
                  <span>Homepage</span>
                </div>
              </div>
              
              {/* Main sections */}
              <div className="flex justify-center mb-8">
                <div className="border-t-2 border-gray-300 w-4/5"></div>
              </div>
              
              <div className="flex justify-between mb-12">
                {filteredSections.map((section) => (
                  <div key={section.id} className="flex flex-col items-center">
                    {/* Vertical connector from main line */}
                    <div className="h-8 border-l-2 border-gray-300 mb-2"></div>
                    
                    {/* Section node */}
                    <div className="bg-gray-100 text-gray-800 font-medium px-3 py-1.5 rounded-full border border-gray-300 flex items-center mb-6 whitespace-nowrap">
                      {section.icon}
                      <span className="ml-2">{section.title}</span>
                      <span className="ml-2 text-xs bg-gray-200 px-1.5 py-0.5 rounded-full">
                        {section.pages.length}
                      </span>
                    </div>
                    
                    {/* Vertical connector to pages */}
                    <div className="h-8 border-l-2 border-gray-300 mb-2"></div>
                    
                    {/* Pages container */}
                    <div className="grid grid-cols-1 gap-2">
                      {section.pages.slice(0, 3).map(page => (
                        <div 
                          key={page.id}
                          className={`px-3 py-1.5 rounded-lg border text-sm whitespace-nowrap ${
                            page.status === 'live'
                              ? 'bg-green-50 border-green-200 text-green-800'
                              : page.status === 'development'
                              ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
                              : 'bg-blue-50 border-blue-200 text-blue-800'
                          }`}
                        >
                          {page.title}
                        </div>
                      ))}
                      
                      {section.pages.length > 3 && (
                        <div className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 text-center">
                          + {section.pages.length - 3} more pages
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Legend */}
              <div className="mt-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Legend</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-xs text-gray-600">Live Pages</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-xs text-gray-600">In Development</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-xs text-gray-600">Planned</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Additional Resources */}
        <div className="mt-16 bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a 
              href="/sitemap"
              className="bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-200 hover:shadow-md transition-all flex items-start"
            >
              <div className="p-2 rounded-lg bg-indigo-100 mr-3">
                <FolderTree className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Interactive Sitemap</h3>
                <p className="text-sm text-gray-600">Explore our site structure in an interactive format</p>
              </div>
            </a>
            
            <a 
              href="/sitemap.xml"
              className="bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-200 hover:shadow-md transition-all flex items-start"
            >
              <div className="p-2 rounded-lg bg-amber-100 mr-3">
                <FileText className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">XML Sitemap</h3>
                <p className="text-sm text-gray-600">Download the XML sitemap for SEO purposes</p>
              </div>
            </a>
            
            <a 
              href="/help"
              className="bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-200 hover:shadow-md transition-all flex items-start"
            >
              <div className="p-2 rounded-lg bg-emerald-100 mr-3">
                <Settings className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Site Documentation</h3>
                <p className="text-sm text-gray-600">Technical documentation for developers</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Site;
