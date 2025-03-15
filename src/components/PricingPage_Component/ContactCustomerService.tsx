import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MessageCircle,
  Clock,
  CheckCircle,
  MapPin,
  HelpCircle,
  ArrowRight,
  Send,
} from "lucide-react";

// Type for contact options
type ContactOption = {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  color: string;
  hoverColor: string;
};

// Type for form fields
type FormField = {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  required: boolean;
  value: string;
  error: string;
};

const ContactCustomerService: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("support");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [, setIsMobile] = useState<boolean>(false);
  const [formFields, setFormFields] = useState<FormField[]>([
    {
      id: "name",
      label: "Full Name",
      placeholder: "Enter your full name",
      type: "text",
      required: true,
      value: "",
      error: "",
    },
    {
      id: "email",
      label: "Email Address",
      placeholder: "Enter your email address",
      type: "email",
      required: true,
      value: "",
      error: "",
    },
    {
      id: "subject",
      label: "Subject",
      placeholder: "What is this regarding?",
      type: "text",
      required: true,
      value: "",
      error: "",
    },
    {
      id: "message",
      label: "Message",
      placeholder: "How can we help you?",
      type: "textarea",
      required: true,
      value: "",
      error: "",
    },
  ]);

  // Check if screen is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Contact options data
  const contactOptions: ContactOption[] = [
    {
      id: "support",
      icon: <HelpCircle className="h-7 w-7" />,
      title: "General Support",
      description:
        "Get help with your account, subscriptions, or general inquiries.",
      buttonText: "Contact Support",
      color: "bg-purple-100",
      hoverColor: "hover:bg-purple-200",
    },
    {
      id: "sales",
      icon: <Phone className="h-7 w-7" />,
      title: "Sales Team",
      description:
        "Talk to our sales team about enterprise plans and custom solutions.",
      buttonText: "Contact Sales",
      color: "bg-blue-100",
      hoverColor: "hover:bg-blue-200",
    },
    {
      id: "billing",
      icon: <Dollar className="h-7 w-7" />,
      title: "Billing Inquiries",
      description: "Questions about your invoice, payment methods, or refunds.",
      buttonText: "Contact Billing",
      color: "bg-green-100",
      hoverColor: "hover:bg-green-200",
    },
  ];

  // Available times
  const availableTimes = [
    { day: "Monday - Friday", hours: "8:00 AM - 8:00 PM EST" },
    { day: "Saturday", hours: "10:00 AM - 6:00 PM EST" },
    { day: "Sunday", hours: "Closed" },
  ];

  // Handle form input changes
  const handleInputChange = (id: string, value: string) => {
    setFormFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, value, error: "" } : field
      )
    );
  };

  // Validate form
  const validateForm = (): boolean => {
    let isValid = true;
    const updatedFields = formFields.map((field) => {
      let error = "";
      if (field.required && !field.value.trim()) {
        error = `${field.label} is required`;
        isValid = false;
      } else if (
        field.id === "email" &&
        field.value &&
        !/\S+@\S+\.\S+/.test(field.value)
      ) {
        error = "Please enter a valid email address";
        isValid = false;
      }
      return { ...field, error };
    });

    setFormFields(updatedFields);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError("");

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Reset form after successful submission
      setFormFields((prevFields) =>
        prevFields.map((field) => ({ ...field, value: "", error: "" }))
      );

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex justify-center">
            <span className="px-4 py-1.5 text-sm font-semibold rounded-full bg-purple-100 text-purple-800 mb-5">
              Customer Support
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            We're Here to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              Help You
            </span>
          </h2>
          <p className="text-xl text-gray-600 mt-4">
            Our dedicated customer service team is available to assist you with
            any questions or concerns you may have.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactOptions.map((option) => (
            <div
              key={option.id}
              className={`relative rounded-xl p-6 border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer ${
                activeTab === option.id ? "ring-2 ring-purple-500" : ""
              }`}
              onClick={() => setActiveTab(option.id)}
            >
              <div
                className={`${option.color} p-3 rounded-full inline-block mb-4`}
              >
                {option.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {option.title}
              </h3>
              <p className="text-gray-600 mb-4">{option.description}</p>
              <button
                className={`${
                  activeTab === option.id
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                } px-4 py-2 rounded-lg font-medium transition-colors duration-300 w-full flex justify-center items-center`}
              >
                {option.buttonText}
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
              {activeTab === option.id && (
                <div className="absolute -top-1 -right-1">
                  <span className="flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="bg-gray-50 rounded-2xl p-6 md:p-8 lg:p-10 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Send us a message
                </h3>
                <p className="text-gray-600 mb-6">
                  Fill out the form below and our team will get back to you
                  within 24 hours.
                </p>

                {submitSuccess && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>
                      Your message has been sent successfully! We'll get back to
                      you soon.
                    </span>
                  </div>
                )}

                {submitError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>{submitError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formFields.map((field) => (
                      <div key={field.id} className="space-y-2">
                        <label
                          htmlFor={field.id}
                          className="block text-sm font-medium text-gray-700"
                        >
                          {field.label}{" "}
                          {field.required && (
                            <span className="text-red-500">*</span>
                          )}
                        </label>
                        {field.type === "textarea" ? (
                          <textarea
                            id={field.id}
                            placeholder={field.placeholder}
                            value={field.value}
                            onChange={(e) =>
                              handleInputChange(field.id, e.target.value)
                            }
                            rows={4}
                            className={`w-full px-4 py-2 border ${
                              field.error ? "border-red-500" : "border-gray-300"
                            } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                          />
                        ) : (
                          <input
                            type={field.type}
                            id={field.id}
                            placeholder={field.placeholder}
                            value={field.value}
                            onChange={(e) =>
                              handleInputChange(field.id, e.target.value)
                            }
                            className={`w-full px-4 py-2 border ${
                              field.error ? "border-red-500" : "border-gray-300"
                            } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                          />
                        )}
                        {field.error && (
                          <p className="text-red-500 text-sm">{field.error}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex justify-center items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                        isSubmitting
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:from-purple-700 hover:to-indigo-700"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Send Message <Send className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Side - Contact Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-900">
                        Phone
                      </h4>
                      <p className="text-gray-600 mt-1">+1 (800) 123-4567</p>
                      <p className="text-gray-500 text-sm mt-1">
                        For immediate assistance
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-purple-100 p-2 rounded-full">
                      <Mail className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-900">
                        Email
                      </h4>
                      <p className="text-gray-600 mt-1">
                        support@translatepro.com
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        We'll respond within 24 hours
                      </p>
                    </div>
                  </div>

                  {/* Live Chat */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-green-100 p-2 rounded-full">
                      <MessageCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-900">
                        Live Chat
                      </h4>
                      <p className="text-gray-600 mt-1">
                        Available on our website
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        During business hours
                      </p>
                    </div>
                  </div>

                  {/* Office Location */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-orange-100 p-2 rounded-full">
                      <MapPin className="h-5 w-5 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-900">
                        Office
                      </h4>
                      <p className="text-gray-600 mt-1">
                        123 Translation Ave, Suite 100
                      </p>
                      <p className="text-gray-600">New York, NY 10001</p>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
                    <Clock className="h-5 w-5 mr-2 text-gray-600" />
                    Business Hours
                  </h3>
                  <div className="space-y-3">
                    {availableTimes.map((time, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-gray-600">{time.day}</span>
                        <span
                          className={`font-medium ${
                            time.day === "Sunday"
                              ? "text-red-500"
                              : "text-gray-900"
                          }`}
                        >
                          {time.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Media */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Follow Us
                  </h3>
                  <div className="flex space-x-3">
                    <a
                      href="#"
                      className="bg-gray-100 p-2 rounded-full hover:bg-blue-100 transition-colors"
                    >
                      <svg
                        className="h-5 w-5 text-gray-600 hover:text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="bg-gray-100 p-2 rounded-full hover:bg-blue-100 transition-colors"
                    >
                      <svg
                        className="h-5 w-5 text-gray-600 hover:text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.029 10.029 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.871 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="bg-gray-100 p-2 rounded-full hover:bg-red-100 transition-colors"
                    >
                      <svg
                        className="h-5 w-5 text-gray-600 hover:text-red-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="bg-gray-100 p-2 rounded-full hover:bg-blue-100 transition-colors"
                    >
                      <svg
                        className="h-5 w-5 text-gray-600 hover:text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Dollar icon since it's not part of the standard lucide-react icons
const Dollar: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

export default ContactCustomerService;
