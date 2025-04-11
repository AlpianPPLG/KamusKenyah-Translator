import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  Check,
  Shield,
  Lock,
  FileText,
  AlertTriangle,
  Clock,
  Globe,
  Mail,
  MessageSquare,
  Calendar,
  CreditCard,
  UserCheck,
  Filter,
  ChevronRight,
} from "lucide-react";

// Define interface for term data
interface TermData {
  id: number;
  title: string;
  content: React.ReactNode;
}

const TermsPage: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredTerms, setFilteredTerms] = useState<TermData[]>([]);
  const [lastUpdated] = useState<string>("September 15, 2023");
  const [highlightedTerms, setHighlightedTerms] = useState<{
    [key: string]: boolean;
  }>({});
  const [showFloatingToc, setShowFloatingToc] = useState<boolean>(false);

  // Terms sections data
  const termsData = [
    {
      id: 1,
      title: "Introduction and Acceptance of Terms",
      content: (
        <div className="space-y-4">
          <p>
            Welcome to our platform. These Terms of Service ("Terms") govern
            your access to and use of our website, services, applications, and
            content (collectively, the "Services"). By accessing or using our
            Services, you agree to be bound by these Terms.
          </p>
          <p>
            Please read these Terms carefully before using our Services. If you
            do not agree to these Terms, you may not access or use our Services.
            By using our Services, you represent and warrant that you are at
            least 18 years old and have the legal capacity to enter into these
            Terms.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 mt-4">
            <p className="text-blue-800">
              Our Services are constantly evolving. As such, these Terms may be
              modified from time to time. We will notify you of any material
              changes via email or through our platform.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Account Registration and Security",
      content: (
        <div className="space-y-4">
          <p>
            To access certain features of our Services, you may need to create
            an account. When you register for an account, you agree to provide
            accurate, current, and complete information and to update such
            information to keep it accurate, current, and complete.
          </p>
          <p>
            You are solely responsible for safeguarding your account credentials
            and for all activities that occur under your account. You agree to
            notify us immediately of any unauthorized use of your account or any
            other breach of security.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold flex items-center">
                <Lock className="w-4 h-4 mr-2 text-indigo-600" />
                Account Security
              </h4>
              <p className="text-sm mt-2">
                You are responsible for maintaining the confidentiality of your
                password and for all activities that occur under your account.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold flex items-center">
                <UserCheck className="w-4 h-4 mr-2 text-indigo-600" />
                Accurate Information
              </h4>
              <p className="text-sm mt-2">
                You must provide accurate and complete information when creating
                an account and keep your account information updated.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "User Content and Conduct",
      content: (
        <div className="space-y-4">
          <p>
            Our Services may allow you to create, upload, post, send, receive,
            store, share, or otherwise provide content, including messages,
            text, photos, videos, and other materials ("User Content").
          </p>
          <p>
            You retain ownership rights in your User Content. However, by
            submitting User Content to us, you grant us a worldwide,
            non-exclusive, royalty-free, sublicensable, and transferable license
            to use, reproduce, modify, adapt, publish, translate, create
            derivative works from, distribute, and display such User Content in
            any media format.
          </p>
          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500 mt-4">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800">
                  Prohibited Content
                </h4>
                <p className="text-yellow-800 mt-1">
                  You agree not to post content that is illegal, harmful,
                  threatening, abusive, harassing, defamatory, vulgar, obscene,
                  or otherwise objectionable.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">You are prohibited from:</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Violating any applicable laws or regulations</li>
              <li>Impersonating any person or entity</li>
              <li>Interfering with or disrupting the Services</li>
              <li>Engaging in any automated use of the system</li>
              <li>
                Attempting to gain unauthorized access to any portion of the
                Services
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: "Privacy and Data Protection",
      content: (
        <div className="space-y-4">
          <p>
            We respect your privacy and are committed to protecting your
            personal data. Our Privacy Policy describes how we collect, use, and
            share information about you when you use our Services. By using our
            Services, you agree to our collection, use, and sharing of
            information as described in our Privacy Policy.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h4 className="font-semibold flex items-center text-indigo-800">
                <Shield className="w-4 h-4 mr-2" />
                Data Security
              </h4>
              <p className="text-sm mt-2 text-indigo-700">
                We implement appropriate technical and organizational measures
                to protect your personal data against unauthorized or unlawful
                processing and accidental loss, destruction, or damage.
              </p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h4 className="font-semibold flex items-center text-indigo-800">
                <Globe className="w-4 h-4 mr-2" />
                International Transfers
              </h4>
              <p className="text-sm mt-2 text-indigo-700">
                Your information may be transferred to and processed in
                countries other than your country of residence, which may have
                different data protection laws.
              </p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 mt-4">
            <h4 className="font-semibold">Your Data Protection Rights</h4>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start">
                <div className="bg-indigo-100 p-1.5 rounded-full mr-3">
                  <Check className="w-3 h-3 text-indigo-700" />
                </div>
                <p className="text-sm">Right to access your personal data</p>
              </div>
              <div className="flex items-start">
                <div className="bg-indigo-100 p-1.5 rounded-full mr-3">
                  <Check className="w-3 h-3 text-indigo-700" />
                </div>
                <p className="text-sm">
                  Right to rectification of inaccurate data
                </p>
              </div>
              <div className="flex items-start">
                <div className="bg-indigo-100 p-1.5 rounded-full mr-3">
                  <Check className="w-3 h-3 text-indigo-700" />
                </div>
                <p className="text-sm">
                  Right to erasure ("right to be forgotten")
                </p>
              </div>
              <div className="flex items-start">
                <div className="bg-indigo-100 p-1.5 rounded-full mr-3">
                  <Check className="w-3 h-3 text-indigo-700" />
                </div>
                <p className="text-sm">Right to restriction of processing</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      title: "Subscription and Payment Terms",
      content: (
        <div className="space-y-4">
          <p>
            Some of our Services may require payment or offer subscription
            options. By subscribing to our paid Services, you agree to pay all
            fees and charges associated with your subscription.
          </p>
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mt-4">
            <h4 className="font-semibold flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-indigo-600" />
              Payment Processing
            </h4>
            <p className="mt-2">
              We use third-party payment processors to process payments. By
              providing your payment information, you authorize us to charge
              your payment method for all fees incurred.
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <h5 className="text-sm font-medium">Billing Cycle</h5>
                <p className="text-sm text-gray-600 mt-1">
                  Subscription fees are billed in advance on a monthly or annual
                  basis, depending on your subscription plan.
                </p>
              </div>
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <h5 className="text-sm font-medium">Automatic Renewal</h5>
                <p className="text-sm text-gray-600 mt-1">
                  All subscriptions automatically renew unless canceled at least
                  24 hours before the end of the current period.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Cancellation and Refunds</h4>
            <p>
              You may cancel your subscription at any time through your account
              settings or by contacting our customer support. Upon cancellation:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2 text-gray-700">
              <li>
                You will continue to have access to the paid Services until the
                end of your current billing period.
              </li>
              <li>
                We do not provide refunds for partial subscription periods
                unless required by law.
              </li>
              <li>
                Some subscription plans may be eligible for a prorated refund as
                specified in the plan details.
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 6,
      title: "Intellectual Property Rights",
      content: (
        <div className="space-y-4">
          <p>
            The Services and all content, features, and functionality thereof,
            including but not limited to text, graphics, logos, icons, images,
            audio clips, digital downloads, data compilations, software, and the
            design, are owned by us, our licensors, or other providers and are
            protected by copyright, trademark, patent, and other intellectual
            property laws.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold">Our Intellectual Property</h4>
              <p className="text-sm mt-2">
                Our name, logo, and all related names, logos, product and
                service names, designs, and slogans are our trademarks or our
                affiliates or licensors. You may not use such marks without our
                prior written permission.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold">License to Use Our Services</h4>
              <p className="text-sm mt-2">
                We grant you a limited, non-exclusive, non-transferable, and
                revocable license to use our Services for their intended
                purposes in accordance with these Terms.
              </p>
            </div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500 mt-6">
            <div className="flex">
              <AlertTriangle className="w-5 h-5 text-red-700 mr-3" />
              <div>
                <h4 className="font-semibold text-red-800">
                  Copyright Infringement
                </h4>
                <p className="text-red-700 mt-1">
                  If you believe that your copyrighted work has been copied in a
                  way that constitutes copyright infringement, please notify our
                  copyright agent as set forth in the Digital Millennium
                  Copyright Act.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 7,
      title: "Disclaimers and Limitations of Liability",
      content: (
        <div className="space-y-4">
          <div className="bg-gray-100 p-5 rounded-lg">
            <h4 className="font-semibold uppercase tracking-wider text-gray-900 text-center">
              Disclaimer of Warranties
            </h4>
            <p className="mt-3 text-gray-700">
              THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS
              WITHOUT ANY WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES,
              INCLUDING, BUT NOT LIMITED TO, THE WARRANTY OF TITLE,
              MERCHANTABILITY, NON-INFRINGEMENT OF THIRD PARTIES' RIGHTS, AND
              FITNESS FOR A PARTICULAR PURPOSE.
            </p>
          </div>

          <div className="bg-gray-100 p-5 rounded-lg mt-6">
            <h4 className="font-semibold uppercase tracking-wider text-gray-900 text-center">
              Limitation of Liability
            </h4>
            <p className="mt-3 text-gray-700">
              IN NO EVENT WILL WE, OUR AFFILIATES, OR THEIR LICENSORS, SERVICE
              PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR
              DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN
              CONNECTION WITH YOUR USE OF THE SERVICES, INCLUDING ANY DIRECT,
              INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.
            </p>
          </div>

          <div className="mt-6">
            <p className="text-gray-600 text-sm">
              Some jurisdictions do not allow the exclusion of warranties or the
              exclusion or limitation of liability for consequential or
              incidental damages, so the above limitations may not apply to you.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 8,
      title: "Termination and Suspension",
      content: (
        <div className="space-y-4">
          <p>
            We may terminate or suspend your account and access to the Services
            immediately, without prior notice or liability, for any reason
            whatsoever, including without limitation if you breach these Terms.
          </p>

          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mt-4">
            <h4 className="font-semibold">Effects of Termination</h4>
            <div className="mt-3 space-y-3">
              <div className="flex items-start">
                <div className="bg-indigo-100 p-1.5 rounded-full mr-3 mt-0.5">
                  <Check className="w-3 h-3 text-indigo-700" />
                </div>
                <p>
                  Upon termination, your right to use the Services will
                  immediately cease.
                </p>
              </div>
              <div className="flex items-start">
                <div className="bg-indigo-100 p-1.5 rounded-full mr-3 mt-0.5">
                  <Check className="w-3 h-3 text-indigo-700" />
                </div>
                <p>
                  We may delete or archive your User Content and account
                  information.
                </p>
              </div>
              <div className="flex items-start">
                <div className="bg-indigo-100 p-1.5 rounded-full mr-3 mt-0.5">
                  <Check className="w-3 h-3 text-indigo-700" />
                </div>
                <p>
                  All provisions of these Terms which by their nature should
                  survive termination shall survive, including ownership
                  provisions, warranty disclaimers, and limitations of
                  liability.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500 mt-6">
            <div className="flex">
              <AlertTriangle className="w-5 h-5 text-yellow-700 mr-3" />
              <div>
                <h4 className="font-semibold text-yellow-800">Reinstatement</h4>
                <p className="text-yellow-700 mt-1">
                  We reserve the right, but are not obligated, to reinstate your
                  account or restore your User Content following termination or
                  suspension.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 9,
      title: "Governing Law and Dispute Resolution",
      content: (
        <div className="space-y-4">
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of [Your Jurisdiction], without regard to its conflict of
            law provisions.
          </p>

          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mt-4">
            <h4 className="font-semibold">Dispute Resolution</h4>
            <p className="mt-2">
              Any dispute arising out of or relating to these Terms or the
              Services shall be resolved as follows:
            </p>

            <div className="mt-4 space-y-4">
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <h5 className="text-sm font-medium">1. Informal Negotiation</h5>
                <p className="text-sm text-gray-600 mt-1">
                  We encourage you to contact us first to attempt to resolve any
                  disputes informally.
                </p>
              </div>

              <div className="bg-white p-3 rounded-md border border-gray-200">
                <h5 className="text-sm font-medium">2. Mediation</h5>
                <p className="text-sm text-gray-600 mt-1">
                  If informal negotiations are unsuccessful, either party may
                  initiate mediation by a mutually acceptable mediator.
                </p>
              </div>

              <div className="bg-white p-3 rounded-md border border-gray-200">
                <h5 className="text-sm font-medium">3. Arbitration</h5>
                <p className="text-sm text-gray-600 mt-1">
                  If mediation is unsuccessful, disputes shall be resolved by
                  binding arbitration in accordance with the rules of
                  [Arbitration Association].
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold mb-2">Class Action Waiver</h4>
            <p className="text-gray-700">
              YOU AND WE AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY
              IN YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR
              CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 10,
      title: "Miscellaneous Provisions",
      content: (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold">Entire Agreement</h4>
              <p className="text-sm mt-2">
                These Terms constitute the entire agreement between you and us
                regarding the Services and supersede all prior and
                contemporaneous written or oral agreements.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold">Severability</h4>
              <p className="text-sm mt-2">
                If any provision of these Terms is found to be unenforceable or
                invalid, that provision will be limited or eliminated to the
                minimum extent necessary so that the Terms will otherwise remain
                in full force and effect.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold">No Waiver</h4>
              <p className="text-sm mt-2">
                Our failure to enforce any right or provision of these Terms
                will not be considered a waiver of those rights.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold">Assignment</h4>
              <p className="text-sm mt-2">
                You may not assign or transfer these Terms without our prior
                written consent, but we may assign or transfer these Terms
                without restriction.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 mt-6">
            <div className="flex">
              <MessageSquare className="w-5 h-5 text-blue-700 mr-3" />
              <div>
                <h4 className="font-semibold text-blue-800">Contact Us</h4>
                <p className="text-blue-700 mt-1">
                  If you have any questions about these Terms, please contact us
                  at{" "}
                  <a
                    href="mailto:legal@example.com"
                    className="underline font-medium"
                  >
                    legal@example.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  // Filter terms based on search term
  // Update the filtering logic to handle ReactNode content
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredTerms(termsData);
    } else {
      const searchTermLower = searchTerm.toLowerCase();
      const filtered = termsData.filter((term) => {
        const titleMatch = term.title.toLowerCase().includes(searchTermLower);
        // For content, we can only search the title since content is ReactNode
        return titleMatch;
      });
      setFilteredTerms(filtered);

      // Highlight terms that match the search
      const highlighted: { [key: string]: boolean } = {};
      filtered.forEach((term) => {
        highlighted[term.id.toString()] = true;
      });
      setHighlightedTerms(highlighted);
    }
  }, [searchTerm]);

  // Handle scroll to show floating TOC
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowFloatingToc(true);
      } else {
        setShowFloatingToc(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle accordion
  const toggleAccordion = (id: number) => {
    if (activeAccordion === id) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(id);
    }
  };

  // Scroll to section
  const scrollToSection = (id: number) => {
    const element = document.getElementById(`term-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveAccordion(id);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-indigo-600 to-purple-600 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-[10%] w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
          <div className="absolute right-[10%] w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[10%] left-[20%] w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-indigo-100 mb-8">
              Please read these terms carefully before using our platform
            </p>
            <div className="flex items-center justify-center space-x-2 text-indigo-100">
              <Clock className="w-5 h-5" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar */}
            <div className="w-full lg:w-1/4 space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 sticky top-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-indigo-600" />
                  Table of Contents
                </h3>

                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Search terms..."
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Filter className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                </div>

                <nav className="space-y-1.5">
                  {filteredTerms.map((term) => (
                    <button
                      key={term.id}
                      onClick={() => scrollToSection(term.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center
                        ${
                          activeAccordion === term.id
                            ? "bg-indigo-100 text-indigo-800"
                            : "text-gray-700 hover:bg-gray-100"
                        }
                        ${
                          highlightedTerms[term.id.toString()] && searchTerm
                            ? "bg-yellow-50 border border-yellow-200"
                            : ""
                        }
                      `}
                    >
                      {term.id}. {term.title}
                    </button>
                  ))}
                </nav>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    If you have any questions about these terms, please{" "}
                    <Link
                      to="/contact"
                      className="text-indigo-600 font-medium hover:text-indigo-800"
                    >
                      contact us
                    </Link>
                    .
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <h4 className="font-semibold text-blue-800 mb-3">Need Help?</h4>
                <p className="text-blue-700 text-sm mb-4">
                  Our support team is available to assist you with any questions
                  about our Terms of Service.
                </p>
                <div className="flex items-center text-sm text-blue-800 font-medium">
                  <Mail className="w-4 h-4 mr-2" />
                  <a
                    href="mailto:support@example.com"
                    className="hover:underline"
                  >
                    support@example.com
                  </a>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="w-full lg:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8 border border-gray-100">
                <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                      Terms of Service
                    </h2>
                    <p className="text-gray-600 mt-2">
                      Effective Date: {lastUpdated}
                    </p>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Updated {lastUpdated}</span>
                  </div>
                </div>

                <div className="prose prose-indigo max-w-none">
                  <p className="text-lg text-gray-700 mb-6">
                    Thank you for using our platform. These Terms of Service
                    ("Terms") are a legal agreement between you and our company
                    that governs your use of our website, services,
                    applications, and content (collectively, the "Services").
                  </p>

                  {/* Accordion Terms */}
                  <div className="space-y-6 mt-8">
                    {filteredTerms.map((term) => (
                      <div
                        key={term.id}
                        id={`term-${term.id}`}
                        className={`border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 
                          ${
                            activeAccordion === term.id
                              ? "shadow-md"
                              : "hover:shadow-sm"
                          }
                          ${
                            highlightedTerms[term.id.toString()] && searchTerm
                              ? "ring-2 ring-yellow-200"
                              : ""
                          }
                        `}
                      >
                        <button
                          onClick={() => toggleAccordion(term.id)}
                          className="w-full flex justify-between items-center p-5 bg-gray-50 text-left"
                        >
                          <h3 className="text-lg md:text-xl font-semibold text-gray-900 flex items-center">
                            <span className="bg-indigo-100 text-indigo-800 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                              {term.id}
                            </span>
                            {term.title}
                          </h3>
                          {activeAccordion === term.id ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </button>

                        {activeAccordion === term.id && (
                          <div className="p-5 pt-0 mt-4 text-gray-700">
                            {term.content}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Have Questions?
                  </h3>
                  <p className="text-gray-700 mb-4">
                    If you have any questions or concerns about our Terms of
                    Service, please don't hesitate to contact our support team.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800"
                  >
                    Contact Support
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Privacy Matters
                  </h3>
                  <p className="text-gray-700 mb-4">
                    We care about your privacy. Learn more about how we collect,
                    use, and protect your personal information.
                  </p>
                  <Link
                    to="/privacy"
                    className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800"
                  >
                    View Privacy Policy
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Table of Contents */}
      {showFloatingToc && (
        <div className="fixed bottom-5 right-5 z-50">
          <button
            className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
            onClick={() =>
              document
                .getElementById("term-1")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <FileText className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Print and Download Options */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Save Terms for Your Reference
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
                Print Terms
              </button>

              <button className="inline-flex items-center px-6 py-3 bg-indigo-600 rounded-lg shadow-sm text-white font-medium hover:bg-indigo-700 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Acknowledgment */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">
                Acknowledge Our Terms
              </h3>
              <p className="text-gray-700 text-center mb-8">
                By using our services, you acknowledge that you have read and
                understood our Terms of Service and agree to be bound by them.
              </p>

              <div className="flex justify-center">
                <button className="px-8 py-3 bg-indigo-600 rounded-lg text-white font-medium hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg">
                  I Acknowledge
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;
