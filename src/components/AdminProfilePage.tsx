"use client";
import React, { useState, ChangeEvent } from "react";
import {
  Shield,
  Building,
  CreditCard,
  Settings,
  Crown,
  Check,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

// ---- Types ----
type AccessLevel = "BASIC" | "ADVANCED" | "SUPER";

interface AdminFormData {
  adminId: string;
  department: string;
  isSuper: boolean;
  accessLevel: AccessLevel;
  specialPermissions: string[];
}

interface AccessLevelOption {
  value: AccessLevel;
  label: string;
  description: string;
}

interface Permission {
  id: string;
  label: string;
  description: string;
}

const AdminProfilePage: React.FC = () => {
  const [formData, setFormData] = useState<AdminFormData>({
    adminId: "",
    department: "",
    isSuper: false,
    accessLevel: "BASIC",
    specialPermissions: [],
  });

  const [currentStep, setCurrentStep] = useState<number>(1);

  const departments: string[] = [
    "Academic Affairs",
    "Student Services",
    "Events Management",
    "IT Department",
    "Finance Department",
    "Human Resources",
    "Marketing & Communications",
    "Operations",
    "Security",
    "Maintenance",
  ];

  const accessLevels: AccessLevelOption[] = [
    {
      value: "BASIC",
      label: "Basic Admin",
      description: "Can manage events and basic operations",
    },
    {
      value: "ADVANCED",
      label: "Advanced Admin",
      description: "Full access to most features and settings",
    },
    {
      value: "SUPER",
      label: "Super Admin",
      description: "Complete system access and user management",
    },
  ];

  const permissions: Permission[] = [
    {
      id: "event_management",
      label: "Event Management",
      description: "Create, edit, and delete events",
    },
    {
      id: "user_management",
      label: "User Management",
      description: "Manage user accounts and profiles",
    },
    {
      id: "content_moderation",
      label: "Content Moderation",
      description: "Review and moderate user content",
    },
    {
      id: "analytics_access",
      label: "Analytics Access",
      description: "View detailed analytics and reports",
    },
    {
      id: "system_settings",
      label: "System Settings",
      description: "Modify system configurations",
    },
    {
      id: "financial_reports",
      label: "Financial Reports",
      description: "Access financial data and reports",
    },
  ];

  // ---- Handlers ----
const handleInputChange = (
  e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value, type } = e.currentTarget;

  setFormData((prev) => ({
    ...prev,
    [name]: type === "checkbox"
      ? (e.currentTarget as HTMLInputElement).checked
      : value,
  }));
};


  const handlePermissionChange = (permissionId: string) => {
    setFormData((prev) => {
      const updatedPermissions = prev.specialPermissions.includes(permissionId)
        ? prev.specialPermissions.filter((p) => p !== permissionId)
        : [...prev.specialPermissions, permissionId];
      return {
        ...prev,
        specialPermissions: updatedPermissions,
      };
    });
  };

  const handleSubmit = () => {
    console.log("Admin profile submitted:", formData);
  };

  // ---- Validation ----
  const isStepComplete = (step: number): boolean => {
    if (step === 1) return !!(formData.adminId && formData.department);
    if (step === 2) return !!formData.accessLevel;
    return true;
  };

  const canProceed = (): boolean => isStepComplete(currentStep);

  // ---- JSX ----
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-white">Where to go?</h1>
            <div className="flex items-center space-x-2 text-white text-sm">
              <Shield className="w-4 h-4" />
              <span>Admin Setup - Step {currentStep} of 3</span>
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
                <h2 className="text-3xl font-bold mb-2">Setup Admin Profile</h2>
                <p className="text-purple-200">
                  Configure your administrative access and permissions
                </p>
              </div>
            </div>
            <div className="flex items-center">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                      step < currentStep
                        ? "bg-green-500 text-white"
                        : step === currentStep
                        ? "bg-purple-600 text-white"
                        : "bg-white/20 text-white"
                    }`}
                  >
                    {step < currentStep ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      step
                    )}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-16 h-1 mx-2 ${
                        step < currentStep ? "bg-green-500" : "bg-white/20"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            {/* Step 1: Basic Admin Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <Shield className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    Admin Credentials
                  </h3>
                  <p className="text-gray-600">
                    Provide your administrative identification details
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin ID *
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="adminId"
                      value={formData.adminId}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Enter your admin ID"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    This will be your unique administrative identifier
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department *
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  >
                    <option value="">Select your department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Access Level */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <Settings className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    Access Level
                  </h3>
                  <p className="text-gray-600">
                    Choose your administrative access level
                  </p>
                </div>

                <div className="space-y-4">
                  {accessLevels.map((level) => (
                    <div
                      key={level.value}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        formData.accessLevel === level.value
                          ? "border-purple-600 bg-purple-50"
                          : "border-gray-200 hover:border-purple-300"
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          accessLevel: level.value,
                        }))
                      }
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {level.value === "SUPER" && (
                            <Crown className="w-5 h-5 text-yellow-500" />
                          )}
                          {level.value === "ADVANCED" && (
                            <Shield className="w-5 h-5 text-blue-500" />
                          )}
                          {level.value === "BASIC" && (
                            <Settings className="w-5 h-5 text-gray-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-gray-900">
                              {level.label}
                            </h4>
                            <input
                              type="radio"
                              name="accessLevel"
                              value={level.value}
                              checked={formData.accessLevel === level.value}
                              onChange={handleInputChange}
                              className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                            />
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {level.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {formData.accessLevel === "SUPER" && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800">
                          Super Admin Access
                        </h4>
                        <p className="text-sm text-yellow-700 mt-1">
                          This level grants complete system access. Please
                          ensure you have proper authorization.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Special Permissions */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <Crown className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    Special Permissions
                  </h3>
                  <p className="text-gray-600">
                    Select additional permissions for your role
                  </p>
                </div>

                <div className="space-y-3">
                  {permissions.map((permission) => (
                    <div
                      key={permission.id}
                      className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        id={permission.id}
                        checked={formData.specialPermissions.includes(
                          permission.id
                        )}
                        onChange={() => handlePermissionChange(permission.id)}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-1"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor={permission.id}
                          className="font-medium text-gray-900 cursor-pointer"
                        >
                          {permission.label}
                        </label>
                        <p className="text-sm text-gray-600 mt-1">
                          {permission.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h4 className="font-medium text-purple-900 mb-4">
                    Profile Summary
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-purple-800">
                        Admin ID:
                      </span>
                      <p className="text-purple-700">{formData.adminId}</p>
                    </div>
                    <div>
                      <span className="font-medium text-purple-800">
                        Department:
                      </span>
                      <p className="text-purple-700">{formData.department}</p>
                    </div>
                    <div>
                      <span className="font-medium text-purple-800">
                        Access Level:
                      </span>
                      <p className="text-purple-700">
                        {
                          accessLevels.find(
                            (l) => l.value === formData.accessLevel
                          )?.label
                        }
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-purple-800">
                        Special Permissions:
                      </span>
                      <p className="text-purple-700">
                        {formData.specialPermissions.length} selected
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  currentStep === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Previous
              </button>

              {currentStep < 3 ? (
                <button
                  onClick={() => canProceed() && setCurrentStep((prev) => prev + 1)}
                  disabled={!canProceed()}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    canProceed()
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Complete Setup
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

export default AdminProfilePage;
