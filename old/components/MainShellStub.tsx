"use client"
import { useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'ADMIN' | 'SUPERADMIN';
  profileCompleted: boolean;
  studentProfile?: any | null;
  adminProfile?: any | null;
};

type MainShellStubProps = {
  user: User;
};

export default function MainShellStub({ user }: MainShellStubProps) {
  const [activeNav, setActiveNav] = useState('dashboard');
  
  // Mock upcoming events
  const upcomingEvents = [
    { id: 'e1', title: 'Tech Symposium 2023', date: '2023-11-15', location: 'Main Auditorium' },
    { id: 'e2', title: 'Cultural Fest', date: '2023-11-20', location: 'College Grounds' },
    { id: 'e3', title: 'Coding Competition', date: '2023-11-25', location: 'CSE Block' },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-pink-600">College Event App</h1>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-medium">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Navigation */}
          <nav className="w-full md:w-64 bg-white rounded-xl shadow-sm p-4">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveNav('dashboard')}
                  className={`w-full text-left px-4 py-2 rounded-lg ${activeNav === 'dashboard' ? 'bg-pink-50 text-pink-600 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveNav('events')}
                  className={`w-full text-left px-4 py-2 rounded-lg ${activeNav === 'events' ? 'bg-pink-50 text-pink-600 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  Events
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveNav('registrations')}
                  className={`w-full text-left px-4 py-2 rounded-lg ${activeNav === 'registrations' ? 'bg-pink-50 text-pink-600 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  My Registrations
                </button>
              </li>
              {(user.role === 'ADMIN' || user.role === 'SUPERADMIN') && (
                <li>
                  <button
                    onClick={() => setActiveNav('admin')}
                    className={`w-full text-left px-4 py-2 rounded-lg ${activeNav === 'admin' ? 'bg-pink-50 text-pink-600 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    Admin Panel
                  </button>
                </li>
              )}
            </ul>
          </nav>
          
          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Dashboard</h2>
              <div className="p-8 text-center text-gray-500 border border-dashed border-gray-300 rounded-lg">
                <p>Welcome to your dashboard! This is a stub to show you've reached the main page.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Events</h2>
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="p-4 border border-gray-200 rounded-lg hover:border-pink-200 transition-colors">
                    <h3 className="font-medium text-gray-800">{event.title}</h3>
                    <div className="mt-2 flex justify-between text-sm text-gray-500">
                      <span>Date: {event.date}</span>
                      <span>Location: {event.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}