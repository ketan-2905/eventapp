import { useState } from 'react';
import StudentForm from './StudentForm';
import AdminForm from './AdminForm';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'ADMIN' | 'SUPERADMIN';
  profileCompleted: boolean;
  studentProfile?: any | null;
  adminProfile?: any | null;
};

type ProfileCompletionProps = {
  user: User;
  onProfileComplete: () => void;
};

export default function ProfileCompletion({ user, onProfileComplete }: ProfileCompletionProps) {
  const [currentStep, setCurrentStep] = useState(1);
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      {/* Progress Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div className={`w-10 h-10 flex items-center justify-center rounded-full ${currentStep >= step ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                {step}
              </div>
              <div className="text-sm mt-2 text-gray-600">
                {step === 1 ? 'Basic Info' : step === 2 ? 'Role Info' : 'Confirm'}
              </div>
            </div>
          ))}
        </div>
        <div className="relative flex items-center justify-between mt-4">
          <div className="absolute left-0 right-0 h-1 bg-gray-200">
            <div 
              className="absolute h-1 bg-pink-600 transition-all duration-300" 
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Form based on user role */}
      {user.role === 'STUDENT' && (
        <StudentForm 
          user={user} 
          onSubmit={() => {
            setCurrentStep(3); // Move to confirmation step
            setTimeout(() => {
              onProfileComplete();
            }, 1000);
          }} 
        />
      )}
      
      {user.role === 'ADMIN' && (
        <AdminForm 
          user={user} 
          onSubmit={() => {
            setCurrentStep(3); // Move to confirmation step
            setTimeout(() => {
              onProfileComplete();
            }, 1000);
          }} 
        />
      )}
      
      {user.role === 'SUPERADMIN' && (
        <div className="p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Already Complete</h2>
          <p className="text-gray-600">Your profile already has admin rights. No additional information is needed.</p>
        </div>
      )}
    </div>
  );
}