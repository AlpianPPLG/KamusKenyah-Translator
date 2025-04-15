import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Briefcase, Users, ClipboardList, MessageSquare, CheckCircle } from 'lucide-react';

interface FormData {
  companyName: string;
  contactName: string;
  email: string;
  phoneNumber: string;
  employeeCount: string;
  industry: string;
  requirements: string;
  expectedBudget: string;
  preferredContactMethod: string;
}

const EnterpriseCustomPlan = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactName: '',
    email: '',
    phoneNumber: '',
    employeeCount: '',
    industry: '',
    requirements: '',
    expectedBudget: '',
    preferredContactMethod: 'email',
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setShowSuccessMessage(true);
      toast.success("Your enterprise request has been submitted successfully! Our team will contact you shortly.");
    }, 1500);
  };

  const enterpriseFeatures = [
    { icon: <Briefcase className="h-5 w-5" />, title: "Dedicated Account Manager", description: "Get personalized guidance from our expert team" },
    { icon: <Users className="h-5 w-5" />, title: "Unlimited Team Members", description: "Add as many users as your organization needs" },
    { icon: <ClipboardList className="h-5 w-5" />, title: "Custom Integrations", description: "Tailored solutions for your specific workflows" },
    { icon: <MessageSquare className="h-5 w-5" />, title: "Priority Support", description: "24/7 dedicated assistance for your business" },
  ];

  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Acme Corporation"
                />
              </div>
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">Industry *</label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select your industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Education">Education</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Retail">Retail</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="employeeCount" className="block text-sm font-medium text-gray-700 mb-1">Number of Employees *</label>
                <select
                  id="employeeCount"
                  name="employeeCount"
                  value={formData.employeeCount}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select employee count</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-500">201-500</option>
                  <option value="501-1000">501-1000</option>
                  <option value="1001+">1001+</option>
                </select>
              </div>
              <div>
                <label htmlFor="expectedBudget" className="block text-sm font-medium text-gray-700 mb-1">Expected Monthly Budget</label>
                <select
                  id="expectedBudget"
                  name="expectedBudget"
                  value={formData.expectedBudget}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select a budget range</option>
                  <option value="$1,000-$5,000">$1,000-$5,000</option>
                  <option value="$5,001-$10,000">$5,001-$10,000</option>
                  <option value="$10,001-$25,000">$10,001-$25,000</option>
                  <option value="$25,001+">$25,001+</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">Contact Name *</label>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="john.doe@company.com"
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label htmlFor="preferredContactMethod" className="block text-sm font-medium text-gray-700 mb-1">Preferred Contact Method</label>
                <select
                  id="preferredContactMethod"
                  name="preferredContactMethod"
                  value={formData.preferredContactMethod}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Project Requirements</h3>
            <div>
              <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">Specific Requirements *</label>
              <textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Please describe your business needs, challenges, and what you're looking to achieve with our enterprise solution."
              />
            </div>
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="privacy-policy"
                name="privacy-policy"
                required
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label htmlFor="privacy-policy" className="ml-2 text-sm text-gray-600">
                I agree to the <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a> and <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a>
              </label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderProgressBar = () => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div 
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Enterprise Custom Solutions</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Tailored pricing and features designed for organizations with complex needs and large teams.
            Get in touch with our dedicated enterprise team to discuss your requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-7xl mx-auto">
          {/* Features Column */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-white rounded-xl shadow-xl p-8 h-full transform hover:scale-[1.02] transition-transform duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Enterprise Benefits</h3>
              
              <div className="space-y-6">
                {enterpriseFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1 bg-indigo-100 rounded-full p-2 text-indigo-600">
                      {feature.icon}
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900">{feature.title}</h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <p className="ml-2 text-sm font-medium text-gray-700">
                    Our enterprise clients typically save 40% compared to our standard pricing when they have more than 50 users.
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center mb-3">
                  <div className="h-px bg-gray-200 flex-grow"></div>
                  <span className="px-4 text-sm text-gray-500 font-medium">Our Enterprise Clients</span>
                  <div className="h-px bg-gray-200 flex-grow"></div>
                </div>
  
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((_logo, i) => (
                    <div key={i} className="h-10 bg-gray-100 rounded-md flex items-center justify-center">
                      <div className="w-16 h-5 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Form Column */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="bg-white rounded-xl shadow-xl p-8 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute -right-20 -top-20 w-40 h-40 bg-indigo-100 rounded-full opacity-70"></div>
              <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-purple-100 rounded-full opacity-70"></div>
              
              <div className="relative">
                {showSuccessMessage ? (
                  <div className="text-center py-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-green-100">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                    <p className="text-gray-600 mb-6">
                      Your enterprise request has been submitted successfully. Our dedicated enterprise team will contact you within 24 hours to discuss your requirements.
                    </p>
                    <button
                      onClick={() => {
                        setShowSuccessMessage(false);
                        setFormData({
                          companyName: '',
                          contactName: '',
                          email: '',
                          phoneNumber: '',
                          employeeCount: '',
                          industry: '',
                          requirements: '',
                          expectedBudget: '',
                          preferredContactMethod: 'email',
                        });
                        setCurrentStep(1);
                      }}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Request Custom Enterprise Quote</h3>
                    
                    {renderProgressBar()}
                    {renderStepContent()}
                    
                    <div className="mt-8 flex justify-between">
                      {currentStep > 1 && (
                        <button
                          type="button"
                          onClick={goToPreviousStep}
                          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Previous
                        </button>
                      )}
                      
                      <div className="ml-auto">
                        {currentStep < totalSteps ? (
                          <button
                            type="button"
                            onClick={goToNextStep}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                          >
                            Next
                          </button>
                        ) : (
                          <button
                            type="submit"
                            disabled={submitting}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                          >
                            {submitting ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                              </>
                            ) : (
                              'Submit Request'
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseCustomPlan;
