import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Rocket,
  Star,
  Zap,
  Users,
  MessageSquare,
  Bug,
  Gift,
  ArrowRight,
  Globe,
  Send,
  Terminal,
  Sparkles,
} from 'lucide-react';

interface BetaFeature {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'upcoming' | 'completed';
  testers: number;
  feedback: number;
  completion: number;
  icon: React.ReactNode;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  content: string;
  feature: string;
}

const betaFeatures: BetaFeature[] = [
  {
    id: 'ai-translation',
    title: 'AI-Powered Translation',
    description: 'Advanced neural network translation with context awareness and dialect support.',
    status: 'active',
    testers: 156,
    feedback: 89,
    completion: 75,
    icon: <Zap className="w-6 h-6" />
  },
  {
    id: 'voice-recognition',
    title: 'Voice Recognition',
    description: 'Real-time speech recognition and translation for Dayak Kenyah language.',
    status: 'upcoming',
    testers: 0,
    feedback: 0,
    completion: 0,
    icon: <Terminal className="w-6 h-6" />
  },
  {
    id: 'collaborative-translation',
    title: 'Collaborative Translation',
    description: 'Community-driven translation review and improvement system.',
    status: 'active',
    testers: 234,
    feedback: 167,
    completion: 60,
    icon: <Users className="w-6 h-6" />
  },
  {
    id: 'offline-mode',
    title: 'Offline Mode',
    description: 'Full translation capabilities without internet connection.',
    status: 'completed',
    testers: 312,
    feedback: 245,
    completion: 100,
    icon: <Globe className="w-6 h-6" />
  }
];

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Language Researcher',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    content: 'The AI translation feature has revolutionized our research work. The accuracy and context awareness is impressive.',
    feature: 'AI-Powered Translation'
  },
  {
    id: '2',
    name: 'Michael Wong',
    role: 'Community Leader',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    content: 'Being part of the beta program has allowed us to shape the future of language preservation technology.',
    feature: 'Collaborative Translation'
  },
  {
    id: '3',
    name: 'Lisa Johnson',
    role: 'Language Teacher',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    content: 'The offline mode has been crucial for our fieldwork in remote areas. It works flawlessly.',
    feature: 'Offline Mode'
  }
];

const BetaProgram: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: '',
    interests: [] as string[],
    agreement: false
  });

  const getStatusColor = (status: BetaFeature['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    setShowApplicationForm(false);
    // Show success message or redirect
  };

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 mb-4"
          >
            <Rocket className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Beta Program</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Help Shape the Future of{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Language Technology
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          >
            Join our beta testing program and get early access to cutting-edge features
            while helping us improve the translation experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button
              onClick={() => setShowApplicationForm(true)}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
            >
              Apply for Beta Access
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="px-8 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
              Learn More
              <Star className="w-5 h-5 ml-2" />
            </button>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: <Users className="w-6 h-6" />, value: '500+', label: 'Beta Testers' },
            { icon: <Bug className="w-6 h-6" />, value: '1,200+', label: 'Bugs Fixed' },
            { icon: <MessageSquare className="w-6 h-6" />, value: '3,000+', label: 'Feedback Items' },
            { icon: <Gift className="w-6 h-6" />, value: '15+', label: 'Features Launched' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:border-blue-200 transition-all duration-300"
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
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Beta Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {betaFeatures.map((feature) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-xl border ${
                  selectedFeature === feature.id ? 'border-blue-500 shadow-lg' : 'border-gray-200'
                } p-6 hover:border-blue-200 transition-all duration-300 cursor-pointer`}
                onClick={() => setSelectedFeature(feature.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-50 rounded-lg text-blue-600 mr-4">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {feature.title}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${getStatusColor(feature.status)}`}>
                        {feature.status.charAt(0).toUpperCase() + feature.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  {feature.status === 'active' && (
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                  )}
                </div>

                <p className="text-gray-600 mb-4">{feature.description}</p>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="font-semibold text-gray-900">{feature.testers}</div>
                    <div className="text-gray-600">Testers</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="font-semibold text-gray-900">{feature.feedback}</div>
                    <div className="text-gray-600">Feedback</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="font-semibold text-gray-900">{feature.completion}%</div>
                    <div className="text-gray-600">Complete</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Beta Tester Feedback</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-200 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{testimonial.content}</p>
                <div className="text-sm text-blue-600 font-medium">
                  Testing: {testimonial.feature}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white mb-16">
          <h2 className="text-2xl font-bold mb-8">Beta Tester Benefits</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Rocket className="w-6 h-6" />,
                title: 'Early Access',
                description: 'Be the first to try new features and shape their development'
              },
              {
                icon: <Gift className="w-6 h-6" />,
                title: 'Exclusive Rewards',
                description: 'Earn points, badges, and premium features for your contributions'
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: 'Direct Impact',
                description: 'Your feedback directly influences product development'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="text-center"
              >
                <div className="bg-white/10 p-4 rounded-lg inline-block mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-blue-100">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Application Form Modal */}
        <AnimatePresence>
          {showApplicationForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-xl p-6 max-w-lg w-full"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Beta Program Application
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience Level
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select experience level</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interested Features
                    </label>
                    <div className="space-y-2">
                      {betaFeatures.map((feature) => (
                        <label key={feature.id} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.interests.includes(feature.id)}
                            onChange={(e) => {
                              const interests = e.target.checked
                                ? [...formData.interests, feature.id]
                                : formData.interests.filter(id => id !== feature.id);
                              setFormData({ ...formData, interests });
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-gray-700">{feature.title}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      checked={formData.agreement}
                      onChange={(e) => setFormData({ ...formData, agreement: e.target.checked })}
                      className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      required
                    />
                    <label className="ml-2 text-sm text-gray-600">
                      I agree to participate in the beta testing program and provide feedback
                      when requested. I understand that beta features may not be stable.
                    </label>
                  </div>

                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowApplicationForm(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
                    >
                      Submit Application
                      <Send className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: 'How long does the beta program last?',
                answer: 'The beta program typically runs for 3-6 months per feature, though this can vary based on the complexity and feedback received.'
              },
              {
                question: 'What are the requirements to join?',
                answer: 'We welcome users of all experience levels. The main requirements are regular app usage and willingness to provide detailed feedback.'
              },
              {
                question: 'Will I get access to all beta features?',
                answer: 'Access to beta features is granted based on your interests and experience level. You can choose which features youd like to test.'
              },
              {
                question: 'Is there any cost to join the program?',
                answer: 'No, the beta program is completely free. In fact, beta testers often receive exclusive rewards and premium features.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gray-900 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Shape the Future?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our beta program today and help us create the best language
              translation experience for everyone.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowApplicationForm(true)}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
              >
                Apply Now
                <Rocket className="w-5 h-5 ml-2" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center"
              >
                Learn More
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BetaProgram;
