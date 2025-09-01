"use client"
import { useState, useEffect } from 'react';
import MainShellStub from './MainShellStub';
import ProfileCompletion from './ProfileCompletion';

enum Role {
  STUDENT = "STUDENT",
  ADMIN = "ADMIN",
  SUPERADMIN = "SUPERADMIN"
}

// Mock user data as specified in requirements
const mockUsers = {
  'u-student-001': {
    id: "u-student-001",
    name: "Asha Rao",
    email: "asha@example.com",
    role: Role.STUDENT,
    profileCompleted: false,
    studentProfile: null
  },
  'u-admin-001': {
    id: "u-admin-001",
    name: "Ravi Menon",
    email: "ravi@example.com",
    role: Role.ADMIN,
    profileCompleted: false,
    adminProfile: null
  },
  'u-student-002': {
    id: "u-student-002",
    name: "Neha Patel",
    email: "neha@example.com",
    role: Role.STUDENT,
    profileCompleted: true,
    studentProfile: { studentId:"STU123", trade:"CSE", year:3 }
  }
};

type UserID = keyof typeof mockUsers;

export default function ParentServer({ userId = 'u-student-001' as UserID }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<typeof mockUsers[UserID] | null>(null);
  
  // Simulate fetching user data
  const fetchUser = async (id: UserID) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate error (10% chance)
      if (Math.random() < 0.1) {
        throw new Error('Failed to fetch user data');
      }
      
      const userData = mockUsers[id];
      if (!userData) {
        throw new Error('User not found');
      }
      
      setUser(userData);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };
  
  // Update user profile completion status
  const updateUserProfile = (completed: boolean) => {
    if (user) {
      setUser({
        ...user,
        profileCompleted: completed
      });
    }
  };
  
  useEffect(() => {
    fetchUser(userId);
  }, [userId]);
  
  // Loading state
  if (loading) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6 mb-6"></div>
          <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
        <div className="text-red-500 text-xl font-semibold mb-4">Error</div>
        <p className="text-gray-700 mb-6">{error}</p>
        <button 
          onClick={() => fetchUser(userId)}
          className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }
  
  // No user data
  if (!user) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
        <p className="text-gray-700">No user data available.</p>
      </div>
    );
  }
  
  // User has completed profile
  if (user && user.profileCompleted) {
    return <MainShellStub user={user} />;
  }
  
  // User needs to complete profile
  return (
    <ProfileCompletion 
      user={user} 
      onProfileComplete={() => updateUserProfile(true)} 
    />
  );
}