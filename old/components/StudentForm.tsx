"use client"
import { useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'ADMIN' | 'SUPERADMIN';
  profileCompleted: boolean;
  studentProfile?: any | null;
};

type StudentFormProps = {
  user: User;
  onSubmit: () => void;
};

type FormErrors = {
  [key: string]: string;
};

export default function StudentForm({ user, onSubmit }: StudentFormProps) {
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phoneno: '',
    studentId: '',
    trade: '',
    year: '',
    college: '',
    rollNumber: '',
    emergencyContact: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const trades = ['CSE', 'ECE', 'MECH', 'CIVIL', 'IT', 'OTHER'];
  
  const validate = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required';
    } else if (formData.studentId.length < 3 || !/^[a-zA-Z0-9]+$/.test(formData.studentId)) {
      newErrors.studentId = 'Student ID must be alphanumeric and at least 3 characters';
    }
    
    if (!formData.trade) {
      newErrors.trade = 'Trade is required';
    }
    
    if (!formData.year) {
      newErrors.year = 'Year is required';
    } else {
      const yearNum = parseInt(formData.year);
      if (isNaN(yearNum) || yearNum < 1 || yearNum > 5) {
        newErrors.year = 'Year must be a number between 1 and 5';
      }
    }
    
    if (!formData.college.trim()) {
      newErrors.college = 'College name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onSubmit();
    }, 2000);
  };
  
  const handleSkip = () => {
    // Just set a local flag, don't update server
    localStorage.setItem('profileSkipped', 'true');
    onSubmit();
  };
  
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Complete Your Student Profile</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
              aria-label="Email (provided by Google)"
            />
            <p className="mt-1 text-xs text-gray-500">Provided by Google login</p>
          </div>
          
          {/* Phone Number */}
          <div>
            <label htmlFor="phoneno" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneno"
              name="phoneno"
              value={formData.phoneno}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
          
          {/* Student ID */}
          <div>
            <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
              Student ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${errors.studentId ? 'border-red-500' : 'border-gray-300'}`}
              aria-invalid={!!errors.studentId}
              aria-describedby={errors.studentId ? 'studentId-error' : undefined}
            />
            {errors.studentId && (
              <p id="studentId-error" className="mt-1 text-sm text-red-500">{errors.studentId}</p>
            )}
          </div>
          
          {/* Trade */}
          <div>
            <label htmlFor="trade" className="block text-sm font-medium text-gray-700 mb-1">
              Trade <span className="text-red-500">*</span>
            </label>
            <select
              id="trade"
              name="trade"
              value={formData.trade}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${errors.trade ? 'border-red-500' : 'border-gray-300'}`}
              aria-invalid={!!errors.trade}
              aria-describedby={errors.trade ? 'trade-error' : undefined}
            >
              <option value="">Select Trade</option>
              {trades.map(trade => (
                <option key={trade} value={trade}>{trade}</option>
              ))}
            </select>
            {errors.trade && (
              <p id="trade-error" className="mt-1 text-sm text-red-500">{errors.trade}</p>
            )}
          </div>
          
          {/* Year */}
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
              Year <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="year"
              name="year"
              min="1"
              max="5"
              value={formData.year}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${errors.year ? 'border-red-500' : 'border-gray-300'}`}
              aria-invalid={!!errors.year}
              aria-describedby={errors.year ? 'year-error' : undefined}
            />
            {errors.year && (
              <p id="year-error" className="mt-1 text-sm text-red-500">{errors.year}</p>
            )}
          </div>
          
          {/* College */}
          <div>
            <label htmlFor="college" className="block text-sm font-medium text-gray-700 mb-1">
              College <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="college"
              name="college"
              value={formData.college}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${errors.college ? 'border-red-500' : 'border-gray-300'}`}
              aria-invalid={!!errors.college}
              aria-describedby={errors.college ? 'college-error' : undefined}
            />
            {errors.college && (
              <p id="college-error" className="mt-1 text-sm text-red-500">{errors.college}</p>
            )}
          </div>
          
          {/* Roll Number */}
          <div>
            <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Roll Number
            </label>
            <input
              type="text"
              id="rollNumber"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
          
          {/* Emergency Contact */}
          <div>
            <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 mb-1">
              Emergency Contact
            </label>
            <input
              type="tel"
              id="emergencyContact"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-4 mt-8">
          <button
            type="button"
            onClick={handleSkip}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Skip for now
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Save & Continue'}
          </button>
        </div>
      </form>
      
      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          Profile saved successfully!
        </div>
      )}
    </div>
  );
}