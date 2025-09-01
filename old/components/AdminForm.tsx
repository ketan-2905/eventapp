"use client"
import { useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'ADMIN' | 'SUPERADMIN';
  profileCompleted: boolean;
  adminProfile?: any | null;
};

type AdminFormProps = {
  user: User;
  onSubmit: () => void;
};

type FormErrors = {
  [key: string]: string;
};

export default function AdminForm({ user, onSubmit }: AdminFormProps) {
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    adminId: '',
    department: '',
    applyForAdmin: false
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [adminApplicationStatus, setAdminApplicationStatus] = useState<string | null>(null);
  
  const validate = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.adminId.trim()) {
      newErrors.adminId = 'Admin ID is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (formData.applyForAdmin) {
      setAdminApplicationStatus('PENDING');
    }
    
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onSubmit();
    }, 2000);
  };
  
  const handleApplyForAdmin = () => {
    setShowModal(true);
  };
  
  const confirmAdminApplication = () => {
    setFormData(prev => ({ ...prev, applyForAdmin: true }));
    setShowModal(false);
    setAdminApplicationStatus('PENDING');
  };
  
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Complete Your Admin Profile</h2>
      
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
          
          {/* Admin ID */}
          <div>
            <label htmlFor="adminId" className="block text-sm font-medium text-gray-700 mb-1">
              Admin ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="adminId"
              name="adminId"
              value={formData.adminId}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${errors.adminId ? 'border-red-500' : 'border-gray-300'}`}
              aria-invalid={!!errors.adminId}
              aria-describedby={errors.adminId ? 'adminId-error' : undefined}
            />
            {errors.adminId && (
              <p id="adminId-error" className="mt-1 text-sm text-red-500">{errors.adminId}</p>
            )}
          </div>
          
          {/* Department */}
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
        </div>
        
        {/* Admin Application Status Card */}
        {adminApplicationStatus && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-lg font-medium text-blue-800">Admin Application Status</h3>
            <div className="mt-2 flex items-center">
              <span className="inline-block w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
              <span className="text-gray-700">Status: <strong>PENDING</strong></span>
            </div>
            <p className="mt-2 text-sm text-gray-600">Your application for admin privileges is pending approval. You'll be notified once it's reviewed.</p>
          </div>
        )}
        
        <div className="flex justify-end space-x-4 mt-8">
          {!adminApplicationStatus && (
            <button
              type="button"
              onClick={handleApplyForAdmin}
              className="px-6 py-2 border border-pink-500 text-pink-600 rounded-lg hover:bg-pink-50 transition-colors"
            >
              Apply for Admin
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>
      
      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirm Admin Application</h3>
            <p className="text-gray-600 mb-6">This will submit an admin application to Superadmin.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmAdminApplication}
                className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          Profile saved successfully!
        </div>
      )}
    </div>
  );
}