"use client";
import React, { useEffect } from "react";
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
import axiosClient from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// TypeScript enums and interfaces
enum UserRole {
  STUDENT = "STUDENT",
  ADMIN = "ADMIN",
}

interface Branch {
  id: string;
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
    branchId: z.string().nullable().optional(),
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
  {
    id: "43027b57-2f42-4a13-8b29-bda953629295",
    name: "Electronics and Telecommunication Engg",
    code: "ENTC",
  },
  {
    id: "f24b8f5f-423f-428f-8919-63f6031f51ee",
    name: "Information Technology",
    code: "IT",
  },
  {
    id: "4862c605-694b-4cd6-be47-b5771fd7315c",
    name: "Computer Engineering",
    code: "CE",
  },
  {
    id: "fc622a83-c5b6-4f8f-87d5-440694c96972",
    name: "Mechanical Engineering",
    code: "ME",
  },
  {
    id: "dec310cb-e727-4106-b869-f7aa23122ca0",
    name: "Computer Science and Engineering (Data Science)",
    code: "CSE-DS",
  },
  {
    id: "8921e0bb-1aff-4d2d-b3eb-0f065614f99c",
    name: "Artificial Intelligence and Machine Learning",
    code: "AIML",
  },
  {
    id: "56135db1-74b8-4fc8-a716-cf9a756bfd3c",
    name: "Artificial Intelligence (AI) and Data Science",
    code: "AI-DS",
  },
  {
    id: "bb0a9a71-2a71-47b7-b9a1-60ef5c883e0e",
    name: "Computer Science and Engineering",
    code: "CSE",
  },
  {
    id: "b952ad2a-dd24-4879-9a96-565888fb5e69",
    name: "IOT and Cyber Security with Block Chain Technology",
    code: "CSE-IOT-CS-BC",
  },
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
      branchId: "",
      studentId: "",
      rollNumber: "",
      year: undefined,
      section: "",
    },
    mode: "onChange",
  });

  const selectedRole = watch("role");
  const isStudent = selectedRole === UserRole.STUDENT;

  const [showPassword, setShowPassword] = React.useState(false);
  const [confirmedShowPassword, setConfirmedShowPassword] =
    React.useState(false);

  const router = useRouter();

  const { data: session } = useSession();

  useEffect(() => {
  if (session?.user?.email) {
    setValue("email", session.user.email);
  }
}, [session, setValue]);


  const onSubmit: SubmitHandler<UserProfileFormData> = async (data) => {
    console.log("Signup data:", data);

    try {
      const payload = {
        ...data,
        email: session?.user?.email || "", // inject email here
      };

      const response = await axiosClient.post("/auth/register", payload);

      if (response.status === 200) {
        alert("Profile completed successfully!");
        console.log("User registered:", response.data);

        // Example redirect to dashboard after success
        router.push("/campus/events");
      } else {
        alert(response.data.error || "Something went wrong.");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      alert(
        error.response?.data?.error ||
          "Error updating profile. Please try again."
      );
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
                      disabled={true}
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-600 focus:border-transparent ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
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
                      onClick={() =>
                        setConfirmedShowPassword(!confirmedShowPassword)
                      }
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
                {errors.confirmpassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmpassword.message}
                  </p>
                )}
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
                      setValueAs: (v) => (v === "" ? null : v),
                    })}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-600 focus:border-transparent ${
                      errors.branchId ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select your branch</option>
                    {branches.map((branch) => (
                      <option key={branch.id} value={branch.id}>
                        ({branch.code})
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
                        errors.studentId ? "border-red-500" : "border-gray-300"
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
            <input
              type="submit"
              className={`flex-1 px-8 py-3 rounded-lg font-semibold transition-colors ${
                isSubmitting
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-purple-600 text-gray-800 hover:bg-purple-700"
              }`}
              value={
                isSubmitting ? "Completing Profile..." : "Complete Profile"
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfileForm;
