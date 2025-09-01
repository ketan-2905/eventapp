// "use client";
// import React, { useState } from 'react';
// import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

// const LoginPage = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     role: 'STUDENT'
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle form submission
//     console.log('Form submitted:', formData);
//   };

//   const handleGoogleLogin = () => {
//     // Handle Google OAuth
//     console.log('Google login clicked');
//   };

//   return (
//     <div className="relative min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 bg-black bg-opacity-20"></div>
//       <div 
//         className="absolute inset-0 opacity-10"
//         style={{
//           backgroundImage: "url('https://picsum.photos/1920/1080?random=bg')",
//           backgroundSize: 'cover',
//           backgroundPosition: 'center'
//         }}
//       ></div>

//       <div className="relative w-full max-w-md">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-white mb-2">Where to go?</h1>
//           <p className="text-purple-200">
//             {isLogin ? 'Welcome back! Sign in to your account' : 'Create your account to get started'}
//           </p>
//         </div>

//         {/* Auth Card */}
//         <div className="bg-white rounded-2xl shadow-2xl p-8">
//           {/* Toggle Buttons */}
//           <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
//             <button
//               onClick={() => setIsLogin(true)}
//               className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
//                 isLogin 
//                   ? 'bg-purple-600 text-white shadow-sm' 
//                   : 'text-gray-600 hover:text-purple-600'
//               }`}
//             >
//               Sign In
//             </button>
//             <button
//               onClick={() => setIsLogin(false)}
//               className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
//                 !isLogin 
//                   ? 'bg-purple-600 text-white shadow-sm' 
//                   : 'text-gray-600 hover:text-purple-600'
//               }`}
//             >
//               Sign Up
//             </button>
//           </div>

//           {/* Google Login */}
//           <button
//             onClick={handleGoogleLogin}
//             className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors mb-6"
//           >
//             <svg className="w-5 h-5" viewBox="0 0 24 24">
//               <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//               <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//               <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//               <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//             </svg>
//             Continue with Google
//           </button>

//           {/* Divider */}
//           <div className="relative mb-6">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-white text-gray-500">Or continue with email</span>
//             </div>
//           </div>

//           {/* Form */}
//           <div className="space-y-6">
//             {/* Name Field (Sign Up Only) */}
//             {!isLogin && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Full Name
//                 </label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//                     placeholder="Enter your full name"
//                     required={!isLogin}
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Email Field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//                   placeholder="Enter your email"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Role Selection (Sign Up Only) */}
//             {!isLogin && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   I am a
//                 </label>
//                 <div className="flex gap-4">
//                   <label className="flex items-center">
//                     <input
//                       type="radio"
//                       name="role"
//                       value="STUDENT"
//                       checked={formData.role === 'STUDENT'}
//                       onChange={handleInputChange}
//                       className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
//                     />
//                     <span className="ml-2 text-sm text-gray-700">Student</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input
//                       type="radio"
//                       name="role"
//                       value="ADMIN"
//                       checked={formData.role === 'ADMIN'}
//                       onChange={handleInputChange}
//                       className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
//                     />
//                     <span className="ml-2 text-sm text-gray-700">Admin</span>
//                   </label>
//                 </div>
//               </div>
//             )}

//             {/* Password Field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//                   placeholder="Enter your password"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                 </button>
//               </div>
//             </div>

//             {/* Confirm Password (Sign Up Only) */}
//             {!isLogin && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Confirm Password
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleInputChange}
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//                     placeholder="Confirm your password"
//                     required={!isLogin}
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Forgot Password (Login Only) */}
//             {isLogin && (
//               <div className="flex items-center justify-between">
//                 <label className="flex items-center">
//                   <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
//                   <span className="ml-2 text-sm text-gray-700">Remember me</span>
//                 </label>
//                 <button type="button" className="text-sm text-purple-600 hover:text-purple-700">
//                   Forgot password?
//                 </button>
//               </div>
//             )}

//             {/* Submit Button */}
//             <button
//               type="button"
//               onClick={handleSubmit}
//               className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 transition-colors"
//             >
//               {isLogin ? 'Sign In' : 'Create Account'}
//             </button>
//           </div>

//           {/* Terms (Sign Up Only) */}
//           {!isLogin && (
//             <p className="mt-4 text-xs text-gray-500 text-center">
//               By creating an account, you agree to our{' '}
//               <a href="#" className="text-purple-600 hover:text-purple-700">Terms of Service</a>
//               {' '}and{' '}
//               <a href="#" className="text-purple-600 hover:text-purple-700">Privacy Policy</a>
//             </p>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="text-center mt-8">
//           <p className="text-purple-200 text-sm">
//             {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
//             <button
//               onClick={() => setIsLogin(!isLogin)}
//               className="text-white font-medium hover:underline"
//             >
//               {isLogin ? 'Sign up' : 'Sign in'}
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


"use client";
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

// Define validation schemas with Zod
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowconfirmPassword] = useState(false);
  // Initialize forms based on login/signup mode
  const { 
    register: loginRegister, 
    handleSubmit: handleLoginSubmit, 
    formState: { errors: loginErrors },
    reset: resetLogin
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false
    }
  });

  const { 
    register: signupRegister, 
    handleSubmit: handleSignupSubmit, 
    formState: { errors: signupErrors },
    watch: signupWatch,
    reset: resetSignup
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const handleFormToggle = (newIsLogin: boolean) => {
    if (newIsLogin !== isLogin) {
      // Reset both forms when toggling
      resetLogin();
      resetSignup();
      setIsLogin(newIsLogin);
    }
  };

  const onLogin: SubmitHandler<LoginFormData> = (data) => {
    console.log('Login data:', data);
    // Handle login API call
  };

  const onSignup: SubmitHandler<SignupFormData> = (data) => {
    console.log('Signup data:', data);
    // Handle signup API call
  };

  const handleGoogleLogin = () => {
    // Handle Google OAuth
    console.log('Google login clicked');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('/Event.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Where to go?</h1>
          <p className="text-purple-200">
            {isLogin ? 'Welcome back! Sign in to your account' : 'Create your account to get started'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Toggle Buttons */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
            <button
              onClick={() => handleFormToggle(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                isLogin 
                  ? 'bg-purple-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => handleFormToggle(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                !isLogin 
                  ? 'bg-purple-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors mb-6 text-gray-700"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Forms */}
          {isLogin ? (
            <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="login-email"
                    type="email"
                    {...loginRegister('email')}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 ${
                      loginErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {loginErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{loginErrors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    {...loginRegister('password')}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 ${
                      loginErrors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {loginErrors.password && (
                  <p className="text-red-500 text-sm mt-1">{loginErrors.password.message}</p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="flex items-center justify-between">
                <button type="button" className="text-sm text-purple-600 hover:text-purple-700">
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 transition-colors"
              >
                Sign In
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit(onSignup)} className="space-y-6">
              {/* Name Field */}

              {/* Email Field */}
              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="signup-email"
                    type="email"
                    {...signupRegister('email')}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 ${
                      signupErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {signupErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{signupErrors.email.message}</p>
                )}
              </div>

              {/* Role Selection */}


              {/* Password Field */}
              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    {...signupRegister('password')}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 ${
                      signupErrors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {signupErrors.password && (
                  <p className="text-red-500 text-sm mt-1">{signupErrors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
             <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="signup-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    {...signupRegister('confirmPassword')}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 ${
                      signupErrors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowconfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {signupErrors.password && (
                  <p className="text-red-500 text-sm mt-1">{signupErrors.password.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 transition-colors"
              >
                Create Account
              </button>

              {/* Terms */}
              <p className="mt-4 text-xs text-gray-500 text-center">
                By creating an account, you agree to our{' '}
                <a href="#" className="text-purple-600 hover:text-purple-700">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-purple-600 hover:text-purple-700">Privacy Policy</a>
              </p>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-purple-200 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              onClick={() => handleFormToggle(!isLogin)}
              className="text-white font-medium hover:underline"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;