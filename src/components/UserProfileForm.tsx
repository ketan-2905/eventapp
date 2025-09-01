"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  User,
  Phone,
  GraduationCap,
  Hash,
  Calendar,
  Users,
  Eye,
  EyeOff,
  Lock,
} from "lucide-react";

// TypeScript enums and interfaces
enum UserRole {
  STUDENT = "STUDENT",
  ADMIN = "ADMIN",
}

interface Branch {
  id: number;
  name: string;
  code: string;
}

// Zod validation schema
const userProfileFormSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    phoneno: z
      .string()
      .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmpassword: z.string(),
    role: z.nativeEnum(UserRole),
    branchId: z.number().nullable().optional(),
    studentId: z.string().optional(),
    rollNumber: z.string().optional(),
    year: z.number().min(1).max(4).nullable().optional(),
    section: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmpassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmpassword"],
      });
    }
    if (data.role === UserRole.STUDENT) {
      if (!data.branchId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Branch is required for students",
          path: ["branchId"],
        });
      }
      if (!data.studentId || data.studentId.trim().length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Student ID is required",
          path: ["studentId"],
        });
      }
      if (!data.rollNumber || data.rollNumber.trim().length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Roll number is required",
          path: ["rollNumber"],
        });
      }
      if (!data.year) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Year must be between 1 and 4",
          path: ["year"],
        });
      }
      if (!data.section || data.section.trim().length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Section is required",
          path: ["section"],
        });
      }
    }
  });

type UserProfileFormData = z.infer<typeof userProfileFormSchema>;

// Mock branches data
const branches: Branch[] = [
  { id: 1, name: "Computer Science Engineering", code: "CSE" },
  { id: 2, name: "Information Technology", code: "IT" },
  { id: 3, name: "Electronics & Communication", code: "ECE" },
  { id: 4, name: "Mechanical Engineering", code: "ME" },
  { id: 5, name: "Civil Engineering", code: "CE" },
  { id: 6, name: "Electrical Engineering", code: "EE" },
];

const UserProfileForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<UserProfileFormData>({
    resolver: zodResolver(userProfileFormSchema),
    defaultValues: {
      name: "",
      phoneno: "",
      role: UserRole.STUDENT,
      branchId: null,
      studentId: "",
      rollNumber: "",
      year: null,
      section: "",
    },
    mode: "onChange",
  });

  const selectedRole = watch("role");
  const isStudent = selectedRole === UserRole.STUDENT;

  const [showPassword, setShowPassword] = React.useState(false);
  const [confirmedShowPassword, setConfirmedShowPassword] = React.useState(false);

  const onSubmit: SubmitHandler<UserProfileFormData> = async (data) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Profile completed:", data);
      alert("Profile completed successfully!");

      // Here you would typically:
      // 1. Send data to your API
      // 2. Update profileCompleted to true
      // 3. Redirect to dashboard
    } catch (error) {
      alert("Error updating profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4 text-gray-900">
      <div className="max-w-2xl w-full bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Complete Your Profile
          </h1>
          <p className="text-purple-100 mt-2">
            Help us personalize your campus experience
          </p>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          {/* Basic Information */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="name"
                    type="text"
                    {...register("name")}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-600 focus:border-transparent ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phoneno"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="phoneno"
                    type="tel"
                    {...register("phoneno")}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-600 focus:border-transparent ${
                      errors.phoneno ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                  />
                </div>
                {errors.phoneno && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneno.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-4 md:col-span-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <User className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      {...register("email")}
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-600 focus:border-transparent ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="example@gmail.com"
                      disabled={true}
                      value={"user?.email"}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-600 focus:border-transparent ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
                 <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={confirmedShowPassword ? "text" : "password"}
                      {...register("confirmpassword")}
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-600 focus:border-transparent ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setConfirmedShowPassword(!confirmedShowPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {confirmedShowPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Role Selection */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Role</h2>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                You are a *
              </label>
              <select
                id="role"
                {...register("role")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-600 focus:border-transparent"
              >
                <option value={UserRole.STUDENT}>Student</option>
                <option value={UserRole.ADMIN}>Admin</option>
              </select>
            </div>
          </section>

          {/* Student-specific Fields */}
          
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Academic Information
              </h2>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="branchId"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Branch *
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      id="branchId"
                      {...register("branchId", {
                        setValueAs: (v) => (v === "" ? null : parseInt(v)),
                      })}
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-600 focus:border-transparent ${
                        errors.branchId ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select your branch</option>
                      {branches.map((branch) => (
                        <option key={branch.id} value={branch.id}>
                          {branch.name} ({branch.code})
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.branchId && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.branchId.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="studentId"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Student ID *
                    </label>
                    <div className="relative">
                      <Hash className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="studentId"
                        type="text"
                        {...register("studentId")}
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-600 focus:border-transparent ${
                          errors.studentId
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Student ID"
                      />
                    </div>
                    {errors.studentId && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.studentId.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="rollNumber"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Roll Number *
                    </label>
                    <input
                      id="rollNumber"
                      type="text"
                      {...register("rollNumber")}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-600 focus:border-transparent ${
                        errors.rollNumber ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="eg., D048"
                    />
                    {errors.rollNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.rollNumber.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="year"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Year *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        id="year"
                        {...register("year", {
                          setValueAs: (v) => (v === "" ? null : parseInt(v)),
                        })}
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-600 focus:border-transparent ${
                          errors.year ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="">Select year</option>
                        <option value={1}>1st Year</option>
                        <option value={2}>2nd Year</option>
                        <option value={3}>3rd Year</option>
                        <option value={4}>4th Year</option>
                      </select>
                    </div>
                    {errors.year && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.year.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="section"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Section *
                    </label>
                    <div className="relative">
                      <Users className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="section"
                        type="text"
                        {...register("section")}
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-600 focus:border-transparent ${
                          errors.section ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="e.g., D1"
                        maxLength={2}
                      />
                    </div>
                    {errors.section && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.section.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>
          

          {/* Submit Section */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
            <button
              type="button"
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isSubmitting}
            >
              Save as Draft
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 px-8 py-3 rounded-lg font-semibold transition-colors ${
                isSubmitting
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-purple-600 text-gray-800 hover:bg-purple-700"
              }`}
            >
              {isSubmitting ? "Completing Profile..." : "Complete Profile"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default UserProfileForm;
