"use client";
import React, { useState } from 'react';
import { Search, Calendar, MapPin, Filter } from 'lucide-react';
import { mockEvents } from '@/mockdata/event';

// Enums as per schema
type EventCategory = "TECHNICAL" | "CULTURAL" | "SPORTS" | "WORKSHOP" | "SEMINAR" | "FEST" | "OTHER";
type EventStatus = "DRAFT" | "PUBLISHED" | "CANCELLED";
type AttachmentType = "IMAGE" | "VIDEO" | "BROCHURE";

interface Attchment {
  id: string;
  eventId: string;
  url: string;
  type: AttachmentType;
}

interface Event {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  status: EventStatus;
  venue?: string;
  startAt: string; // DateTime ISO string
  endAt: string;
  isPaid: boolean;
  price?: number;
  attchments: Attchment[];
}

const EventsListing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  // ===== MOCK DATA as per schema =====
  const events: Event[] = mockEvents

  const getStatusColor = (status: EventStatus) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-500";
      case "DRAFT":
        return "bg-yellow-500";
      case "CANCELLED":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (locationFilter === '' || event.venue?.toLowerCase().includes(locationFilter.toLowerCase())) &&
    (typeFilter === '' || event.category === typeFilter)
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br text-white">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div
          className="relative h-80 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://picsum.photos/1200/400?random=hero')"
          }}
        >
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <h2 className="text-5xl font-bold mb-4">
              Campus Events
            </h2>
            <p className="text-lg mb-8 max-w-md">
              Explore cultural nights, technical summits, and hands-on workshops happening on campus.
            </p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 -mt-16 relative z-10">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name"
                className="w-full pl-10 pr-4 py-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <select
                className="px-4 py-3 border border-gray-300 text-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="TECHNICAL">Technical</option>
                <option value="CULTURAL">Cultural</option>
                <option value="WORKSHOP">Workshop</option>
                <option value="SPORTS">Sports</option>
                <option value="SEMINAR">Seminar</option>
                <option value="FEST">Fest</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900">New events</h3>
          <button className="flex items-center text-gray-600 hover:text-purple-600">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative">
                <img
                  src={event.attchments[0]?.url}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="bg-white text-gray-800 px-2 py-1 rounded text-sm font-medium">
                    {new Date(event.startAt).toLocaleDateString()}
                  </span>
                  <span className={`${getStatusColor(event.status)} text-white px-2 py-1 rounded text-sm font-medium`}>
                    {event.status}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                    {`${new Date(event.startAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(event.endAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {event.title}
                </h4>
                <p className="text-gray-600 text-sm mb-2">
                  {event.description}
                </p>
                <p className="text-sm text-gray-500">{event.venue}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No events found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsListing;
