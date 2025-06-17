import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  DollarSign,
  Trophy,
  Share2,
  ArrowRight,
  Copy,
  CheckCircle2,
  Sparkles,
  Target,
  Award,
  TrendingUp,
  Zap,
  Star,
} from "lucide-react";

interface RewardTier {
  name: string;
  referrals: number;
  rewards: string[];
  icon: React.ReactNode;
  color: string;
}

const rewardTiers: RewardTier[] = [
  {
    name: "Bronze",
    referrals: 5,
    rewards: [
      "1 month free Premium access",
      "Special badge on profile",
      "Access to exclusive community events",
    ],
    icon: <Trophy className="w-6 h-6" />,
    color: "from-amber-500 to-orange-600",
  },
  {
    name: "Silver",
    referrals: 15,
    rewards: [
      "3 months free Premium access",
      "Priority customer support",
      "Early access to new features",
      "Custom profile themes",
    ],
    icon: <Award className="w-6 h-6" />,
    color: "from-slate-400 to-slate-600",
  },
  {
    name: "Gold",
    referrals: 30,
    rewards: [
      "6 months free Premium access",
      "Exclusive merchandise pack",
      "Featured user spotlight",
      "Private consultation session",
      "Custom badge design",
    ],
    icon: <Star className="w-6 h-6" />,
    color: "from-yellow-400 to-orange-500",
  },
];

const AffiliateAndReferralProgram: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const referralCode = "KAMUS2024";

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const features = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Earn Rewards",
      description:
        "Get premium features and exclusive perks for each successful referral",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Build Community",
      description: "Help grow the KamusKenyah community while earning rewards",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Track Progress",
      description: "Monitor your referrals and rewards in real-time",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Benefits",
      description: "Rewards are credited immediately upon successful referral",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 mb-4"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Program Referral</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            Ajak Teman, Dapatkan{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Hadiah Menarik
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Bagikan KamusKenyah kepada teman-teman Anda dan dapatkan reward
            eksklusif untuk setiap referral yang berhasil
          </motion.p>
        </div>

        {/* Referral Code Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 mb-16"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Kode Referral Anda
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="relative flex-1 max-w-md">
                <input
                  aria-label="Referral Code"
                  placeholder="Your referral code"
                  title="Your referral code"
                  type="text"
                  value={referralCode}
                  readOnly
                  className="w-full px-6 py-4 text-lg font-mono text-center bg-white rounded-lg border-2 border-blue-100 focus:outline-none focus:border-blue-300"
                />
                <button
                  onClick={handleCopyCode}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-md transition-colors"
                >
                  {copiedCode ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
              <button
                onClick={() => setShowShareOptions(!showShareOptions)}
                className="flex items-center px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Bagikan
              </button>
            </div>

            <AnimatePresence>
              {showShareOptions && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 flex flex-wrap justify-center gap-4"
                >
                  {["WhatsApp", "Telegram", "Email", "Facebook", "Twitter"].map(
                    (platform) => (
                      <button
                        key={platform}
                        className="px-4 py-2 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        {platform}
                      </button>
                    )
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-200 transition-colors"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                {feature.icon}
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Reward Tiers */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            Tingkatkan Level, Dapatkan Reward Lebih Besar
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {rewardTiers.map((tier) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`bg-white rounded-xl border-2 ${
                  selectedTier === tier.name
                    ? "border-blue-500 shadow-lg"
                    : "border-gray-200"
                } p-6 cursor-pointer hover:border-blue-200 transition-all`}
                onClick={() => setSelectedTier(tier.name)}
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${tier.color} flex items-center justify-center text-white mb-4`}
                >
                  {tier.icon}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {tier.name}
                </h4>
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">
                    {tier.referrals} referrals
                  </span>
                </div>
                <ul className="space-y-2">
                  {tier.rewards.map((reward, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{reward}</span>
                    </li>
                  ))}
                </ul>
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
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Mulai Bagikan Sekarang
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Ajak teman Anda bergabung dan nikmati berbagai reward menarik
              bersama-sama
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            >
              Mulai Program Referral
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
            <p className="text-blue-100 text-sm mt-4">
              Syarat dan ketentuan berlaku
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AffiliateAndReferralProgram;
