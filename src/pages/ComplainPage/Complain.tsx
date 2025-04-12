import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Send,
  CheckCircle,
  Clock,
  Search,
  Filter,
  ChevronDown,
  ArrowRight,
  FileText,
  Paperclip,
  X,
  HelpCircle,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";

interface Complaint {
  id: string;
  subject: string;
  description: string;
  status: "pending" | "in-progress" | "resolved";
  priority: "low" | "medium" | "high";
  date: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
}

const categories: Category[] = [
  {
    id: "technical",
    name: "Technical Issues",
    description: "Problems with app functionality, bugs, or technical errors",
  },
  {
    id: "translation",
    name: "Translation Accuracy",
    description: "Issues with translation quality or accuracy",
  },
  {
    id: "account",
    name: "Account & Billing",
    description: "Account access, subscription, or payment issues",
  },
  {
    id: "feature",
    name: "Feature Request",
    description: "Suggestions for new features or improvements",
  },
];

const sampleComplaints: Complaint[] = [
  {
    id: "1",
    subject: "App Crashes on Translation",
    description: "The app crashes when trying to translate long paragraphs",
    status: "in-progress",
    priority: "high",
    date: "2024-03-15",
    category: "technical",
  },
  {
    id: "2",
    subject: "Incorrect Translation Result",
    description: "Some cultural terms are not being translated correctly",
    status: "pending",
    priority: "medium",
    date: "2024-03-14",
    category: "translation",
  },
  {
    id: "3",
    subject: "Billing Issue",
    description: "Double charged for premium subscription",
    status: "resolved",
    priority: "high",
    date: "2024-03-13",
    category: "account",
  },
];

const ComplainPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"new" | "history">("new");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    priority: "medium",
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleFileAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setAttachments([...attachments, ...Array.from(event.target.files)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const filteredComplaints = sampleComplaints.filter((complaint) => {
    const matchesSearch =
      complaint.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || complaint.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-orange-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
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
            <MessageCircle className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Support Center</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            How can we{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              help you?
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Submit your concerns or check the status of your previous
            complaints. We're here to help you resolve any issues.
          </motion.p>
        </div>

        {/* Quick Contact Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: <Mail className="w-6 h-6" />,
              title: "Email Support",
              description: "support@kamuskenyah.com",
              action: "Send email",
            },
            {
              icon: <Phone className="w-6 h-6" />,
              title: "Phone Support",
              description: "+62 123 456 789",
              action: "Call now",
            },
            {
              icon: <MessageSquare className="w-6 h-6" />,
              title: "Live Chat",
              description: "Available 24/7",
              action: "Start chat",
            },
          ].map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-200 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600 mr-4">
                  {option.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {option.title}
                  </h3>
                  <p className="text-gray-600">{option.description}</p>
                </div>
              </div>
              <button className="text-blue-600 font-medium hover:text-blue-700 flex items-center">
                {option.action}
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Main Content Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("new")}
              className={`flex-1 px-6 py-4 text-center font-medium ${
                activeTab === "new"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              New Complaint
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 px-6 py-4 text-center font-medium ${
                activeTab === "history"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Complaint History
            </button>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === "new" ? (
                <motion.form
                  key="new-complaint"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Category Selection */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setShowCategoryDropdown(!showCategoryDropdown)
                        }
                        className="w-full px-4 py-3 text-left border border-gray-200 rounded-lg flex items-center justify-between hover:border-blue-300 transition-colors"
                      >
                        <span className="text-gray-600">
                          {selectedCategory
                            ? categories.find(
                                (cat) => cat.id === selectedCategory
                              )?.name
                            : "Select a category"}
                        </span>
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </button>

                      <AnimatePresence>
                        {showCategoryDropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg"
                          >
                            {categories.map((category) => (
                              <button
                                key={category.id}
                                type="button"
                                onClick={() => {
                                  setSelectedCategory(category.id);
                                  setShowCategoryDropdown(false);
                                }}
                                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                              >
                                <div className="font-medium text-gray-900">
                                  {category.name}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {category.description}
                                </div>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Brief description of the issue"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Detailed explanation of your issue..."
                    />
                  </div>

                  {/* Priority Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <div className="flex gap-4">
                      {["low", "medium", "high"].map((priority) => (
                        <label key={priority} className="flex-1">
                          <input
                            type="radio"
                            name="priority"
                            value={priority}
                            checked={formData.priority === priority}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                priority: e.target.value,
                              })
                            }
                            className="sr-only"
                          />
                          <div
                            className={`text-center px-4 py-3 rounded-lg cursor-pointer transition-all ${
                              formData.priority === priority
                                ? "bg-blue-50 text-blue-600 border-2 border-blue-200"
                                : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
                            }`}
                          >
                            {priority.charAt(0).toUpperCase() +
                              priority.slice(1)}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* File Attachments */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Attachments
                    </label>
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        multiple
                        onChange={handleFileAttachment}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer text-blue-600 hover:text-blue-700"
                      >
                        <Paperclip className="w-6 h-6 mx-auto mb-2" />
                        <span>Click to upload files</span>
                      </label>
                      <p className="text-sm text-gray-500 mt-1">
                        Support for images, documents up to 10MB
                      </p>
                    </div>

                    {/* Attached Files List */}
                    {attachments.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {attachments.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg"
                          >
                            <div className="flex items-center">
                              <FileText className="w-4 h-4 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-600">
                                {file.name}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeAttachment(index)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
                    >
                      Submit Complaint
                      <Send className="w-4 h-4 ml-2" />
                    </motion.button>
                  </div>

                  {/* Success Message */}
                  <AnimatePresence>
                    {submitSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-4 right-4 bg-green-100 text-green-800 px-6 py-3 rounded-lg flex items-center"
                      >
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Complaint submitted successfully!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.form>
              ) : (
                <motion.div
                  key="complaint-history"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Search and Filters */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search complaints..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="relative">
                      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                      >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </div>
                  </div>

                  {/* Complaints List */}
                  <div className="space-y-4">
                    {filteredComplaints.map((complaint) => (
                      <motion.div
                        key={complaint.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-200 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {complaint.subject}
                            </h3>
                            <p className="text-gray-600 mt-1">
                              {complaint.description}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              complaint.status
                            )}`}
                          >
                            {complaint.status.charAt(0).toUpperCase() +
                              complaint.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <span className="text-gray-500">
                              <Clock className="w-4 h-4 inline mr-1" />
                              {new Date(complaint.date).toLocaleDateString()}
                            </span>
                            <span
                              className={`font-medium ${getPriorityColor(
                                complaint.priority
                              )}`}
                            >
                              {complaint.priority.charAt(0).toUpperCase() +
                                complaint.priority.slice(1)}{" "}
                              Priority
                            </span>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                            View Details
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Empty State */}
                  {filteredComplaints.length === 0 && (
                    <div className="text-center py-12">
                      <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No complaints found
                      </h3>
                      <p className="text-gray-600">
                        Try adjusting your search or filters to find what you're
                        looking for.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplainPage;
