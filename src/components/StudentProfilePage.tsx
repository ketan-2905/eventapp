"use client";
import React, { useState, ChangeEvent } from 'react';
import { 
  User, 
  GraduationCap, 
  Building, 
  Phone, 
  CreditCard, 
  ArrowRight, 
  Check 
} from 'lucide-react';

// Define type for form state
interface StudentFormData {
  studentId: string;
  trade: string;
  year: number | null;
  college: string;
  rollNumber: string;
  emergencyContact: string;
}

const StudentProfilePage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<StudentFormData>({
    studentId: '',
    trade: '',
    year: null,
    college: '',
    rollNumber: '',
    emergencyContact: ''
  });

  const trades: string[] = [
    'Computer Engineering',
    'Mechanical Engineering', 
    'Electrical Engineering',
    'Civil Engineering',
    'Electronics Engineering',
    'Information Technology',
    'Automobile Engineering',
    'Chemical Engineering'
  ];

  const years: number[] = [1, 2, 3, 4];

  // Input change handler
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle submission
  const handleSubmit = (): void => {
    console.log('Student profile submitted:', formData);
    // You can add API call here
  };

  // Check if each step is complete
  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case 1:
        return Boolean(formData.studentId && formData.trade);
      case 2:
        return Boolean(formData.year && formData.college);
      case 3:
        return Boolean(formData.rollNumber && formData.emergencyContact);
      default:
        return false;
    }
  };

  const canProceed = (): boolean => isStepComplete(currentStep);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-white">Where to go?</h1>
            <div className="text-white text-sm">
              Step {currentStep} of 3
            </div>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <div className="w-full max-w-2xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="text-white">
                <h2 className="text-3xl font-bold mb-2">Complete Your Student Profile</h2>
                <p className="text-purple-200">Please fill in your academic details to get started</p>
              </div>
            </div>
            <div className="flex items-center">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                      step < currentStep
                        ? 'bg-green-500 text-white'
                        : step === currentStep
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/20 text-white'
                    }`}
                  >
                    {step < currentStep ? <Check className="w-5 h-5" /> : step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-16 h-1 mx-2 ${
                        step < currentStep ? 'bg-green-500' : 'bg-white/20'
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <GraduationCap className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900">Basic Information</h3>
                  <p className="text-gray-600">Let's start with your student ID and trade</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student ID *
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Enter your student ID"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trade/Course *
                  </label>
                  <select
                    name="trade"
                    value={formData.trade}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  >
                    <option value="">Select your trade</option>
                    {trades.map((trade) => (
                      <option key={trade} value={trade}>{trade}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Academic Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <Building className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900">Academic Details</h3>
                  <p className="text-gray-600">Tell us about your year and college</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Year *
                  </label>
                  <div className="grid grid-cols-4 gap-4">
                    {years.map((year) => (
                      <button
                        key={year}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, year }))}
                        className={`py-3 px-4 border-2 rounded-lg font-medium transition-colors ${
                          formData.year === year
                            ? 'border-purple-600 bg-purple-50 text-purple-600'
                            : 'border-gray-300 hover:border-purple-300 text-gray-700'
                        }`}
                      >
                        {year}{year === 1 ? 'st' : year === 2 ? 'nd' : year === 3 ? 'rd' : 'th'} Year
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    College/Institute *
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="college"
                      value={formData.college}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Enter your college name"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Additional Information */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <Phone className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900">Additional Information</h3>
                  <p className="text-gray-600">Final details to complete your profile</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Roll Number
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="rollNumber"
                      value={formData.rollNumber}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Enter your roll number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Contact
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Enter emergency contact number"
                    />
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-medium text-purple-900 mb-2">Profile Summary</h4>
                  <div className="text-sm text-purple-800 space-y-1">
                    <p><span className="font-medium">Student ID:</span> {formData.studentId}</p>
                    <p><span className="font-medium">Trade:</span> {formData.trade}</p>
                    <p><span className="font-medium">Year:</span> {formData.year ?? '-'}</p>
                    <p><span className="font-medium">College:</span> {formData.college}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Previous
              </button>

              {currentStep < 3 ? (
                <button
                  onClick={() => canProceed() && setCurrentStep(currentStep + 1)}
                  disabled={!canProceed()}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    canProceed()
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed()}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    canProceed()
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Complete Profile
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePage;
