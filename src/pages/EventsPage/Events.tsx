import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Tag,
  Filter,
  Search,
  ChevronDown,
  ArrowRight,
  Star,
  CalendarCheck,
  Bell,
  Share2,
  Ticket,
  Globe,
  MessageCircle,
  BookOpen,
  Sparkles,
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: "workshop" | "webinar" | "conference" | "meetup";
  category: string;
  price: string | "Free";
  capacity: number;
  registered: number;
  speaker: {
    name: string;
    role: string;
    image: string;
  };
  tags: string[];
  featured?: boolean;
}

const events: Event[] = [
  {
    id: "1",
    title: "Advanced Translation Techniques Workshop",
    description:
      "Learn advanced techniques for accurate cultural translation and context preservation.",
    date: "2024-04-15",
    time: "10:00 AM - 2:00 PM",
    location: "Virtual Event",
    type: "workshop",
    category: "Translation",
    price: "$49",
    capacity: 50,
    registered: 35,
    speaker: {
      name: "Dr. Sarah Chen",
      role: "Lead Linguist",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    },
    tags: ["translation", "cultural", "advanced"],
    featured: true,
  },
  {
    id: "2",
    title: "Introduction to Dayak Kenyah Language",
    description:
      "A beginner-friendly session introducing the basics of Dayak Kenyah language.",
    date: "2024-04-20",
    time: "3:00 PM - 5:00 PM",
    location: "Online Webinar",
    type: "webinar",
    category: "Language Learning",
    price: "Free",
    capacity: 100,
    registered: 78,
    speaker: {
      name: "Prof. Michael Wong",
      role: "Language Expert",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    },
    tags: ["beginners", "basics", "language"],
  },
  {
    id: "3",
    title: "Cultural Preservation Conference 2024",
    description:
      "Annual conference focusing on indigenous language preservation through technology.",
    date: "2024-05-10",
    time: "9:00 AM - 6:00 PM",
    location: "Grand Convention Center, Jakarta",
    type: "conference",
    category: "Cultural",
    price: "$199",
    capacity: 300,
    registered: 245,
    speaker: {
      name: "Dr. Lisa Johnson",
      role: "Cultural Anthropologist",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    },
    tags: ["conference", "culture", "technology"],
    featured: true,
  },
];

const EventsPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid">(
    "all"
  );
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const filteredEvents = events.filter((event) => {
    const matchesType = selectedType === "all" || event.type === selectedType;
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "free" && event.price === "Free") ||
      (priceFilter === "paid" && event.price !== "Free");
    return matchesType && matchesSearch && matchesPrice;
  });

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "workshop":
        return "bg-blue-100 text-blue-800";
      case "webinar":
        return "bg-green-100 text-green-800";
      case "conference":
        return "bg-purple-100 text-purple-800";
      case "meetup":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 mb-4"
          >
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Upcoming Events</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Learn and Connect with{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Our Community
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Join our workshops, webinars, and events to enhance your language
            skills and connect with fellow learners and experts.
          </motion.p>
        </div>

        {/* Featured Events Carousel */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Featured Events
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {events
              .filter((event) => event.featured)
              .map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={event.speaker.image}
                        alt={event.speaker.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getEventTypeColor(
                            event.type
                          )}`}
                        >
                          {event.type.charAt(0).toUpperCase() +
                            event.type.slice(1)}
                        </span>
                        <Sparkles className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-gray-600">Featured</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{event.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {event.location}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium text-gray-900">
                            {event.speaker.name}
                          </div>
                          <span className="text-sm text-gray-600">
                            • {event.speaker.role}
                          </span>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
                        >
                          Register Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="pl-4 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">All Types</option>
                  <option value="workshop">Workshops</option>
                  <option value="webinar">Webinars</option>
                  <option value="conference">Conferences</option>
                  <option value="meetup">Meetups</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Filter className="w-5 h-5 text-gray-400" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price
                    </label>
                    <select
                      value={priceFilter}
                      onChange={(e) =>
                        setPriceFilter(
                          e.target.value as "all" | "free" | "paid"
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Prices</option>
                      <option value="free">Free Events</option>
                      <option value="paid">Paid Events</option>
                    </select>
                  </div>
                  {/* Add more filters as needed */}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-blue-200 transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getEventTypeColor(
                      event.type
                    )}`}
                  >
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                  <span className="text-sm text-gray-600">
                    • {event.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-4">{event.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <img
                    src={event.speaker.image}
                    alt={event.speaker.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-gray-900">
                      {event.speaker.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {event.speaker.role}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-gray-900">
                    {event.price}
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Bell className="w-5 h-5" />
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Register
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No events found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters to find events.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Want to Host an Event?
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Share your knowledge with our community. We welcome workshops,
              webinars, and other educational events.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center"
              >
                Submit Event Proposal
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center"
              >
                Learn More
                <BookOpen className="w-5 h-5 ml-2" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsPage;
