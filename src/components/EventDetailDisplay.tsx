"use client";
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, DollarSign, Share2, Heart, Download, Play, Image as ImageIcon, FileText, ArrowLeft, Star } from 'lucide-react';

const EventDetailDisplay = () => {
  // Mock event data - in real app this would come from props or API
  const [eventData] = useState({
    id: 1,
    title: "The Grand Tech Innovation Summit 2024",
    slug: "grand-tech-innovation-summit-2024",
    description: "Join industry leaders and innovators for a day of groundbreaking discussions, networking, and technology showcases.",
    content: `
      <h2>About This Event</h2>
      <p>The <strong>Grand Tech Innovation Summit 2024</strong> brings together the brightest minds in technology, entrepreneurship, and innovation. This premier event will feature:</p>
      
      <h3 style="color: #7c3aed;">Featured Highlights</h3>
      <ul>
        <li><strong>Keynote Speakers:</strong> Industry leaders from top tech companies</li>
        <li><strong>Interactive Workshops:</strong> Hands-on sessions with cutting-edge technologies</li>
        <li><strong>Startup Showcase:</strong> Discover the next big innovations</li>
        <li><strong>Networking Sessions:</strong> Connect with like-minded professionals</li>
      </ul>
      
      <h3 style="color: #059669;">What You'll Learn</h3>
      <p>This summit covers the latest trends in:</p>
      <ol>
        <li><span style="background-color: #fef3c7;">Artificial Intelligence & Machine Learning</span></li>
        <li><span style="background-color: #dbeafe;">Blockchain & Web3 Technologies</span></li>
        <li><span style="background-color: #f3e8ff;">Cloud Computing & DevOps</span></li>
        <li><span style="background-color: #fce7f3;">Cybersecurity & Privacy</span></li>
      </ol>
      
      <blockquote style="border-left: 4px solid #7c3aed; padding-left: 16px; margin: 24px 0; font-style: italic; background-color: #f8fafc; padding: 16px;">
        "Innovation distinguishes between a leader and a follower. Join us to lead the future of technology."
      </blockquote>
      
      <h3>Event Schedule</h3>
      <p><strong>Day 1:</strong> Opening ceremony, keynotes, and technology exhibitions</p>
      <p><strong>Day 2:</strong> Workshops, panel discussions, and startup pitches</p>
      <p><strong>Day 3:</strong> Networking, awards ceremony, and closing remarks</p>
    `,
    category: "Tech Conference",
    startAt: "2024-09-15T09:00:00",
    endAt: "2024-09-17T18:00:00",
    capacity: 500,
    price: 2500,
    currency: "INR",
    thumbnail: "https://picsum.photos/800/400?random=tech",
    venue: {
      id: 1,
      name: "Grand Convention Center",
      address: "123 Innovation Street, Tech City",
      coordinates: { lat: 28.6139, lng: 77.2090 }
    },
    createdBy: {
      name: "TechEvents India",
      image: "https://picsum.photos/40/40?random=organizer"
    },
    attachments: [
      {
        id: 1,
        filename: "event-brochure.pdf",
        mediaType: "DOC",
        tag: "SLIDES",
        url: "#",
        mimeType: "application/pdf"
      },
      {
        id: 2,
        filename: "summit-gallery-1.jpg",
        mediaType: "IMAGE",
        tag: "PAST_IMAGE",
        url: "https://picsum.photos/600/400?random=1",
        mimeType: "image/jpeg"
      },
      {
        id: 3,
        filename: "summit-gallery-2.jpg",
        mediaType: "IMAGE",
        tag: "PAST_IMAGE",
        url: "https://picsum.photos/600/400?random=2",
        mimeType: "image/jpeg"
      },
      {
        id: 4,
        filename: "promo-video.mp4",
        mediaType: "VIDEO",
        tag: "PROMO",
        url: "https://picsum.photos/600/400?random=video",
        mimeType: "video/mp4"
      }
    ],
    registrations: 342,
    status: "PUBLISHED"
  });

  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMediaIcon = (mediaType: string) => {
    switch (mediaType) {
      case 'IMAGE':
        return <ImageIcon className="w-5 h-5" />;
      case 'VIDEO':
        return <Play className="w-5 h-5" />;
      case 'DOC':
        return <FileText className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getAttachmentsByTag = (tag: string) => {
    return eventData.attachments.filter(att => att.tag === tag);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-purple-600">Where to go?</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-lg transition-colors ${
                  isLiked ? 'text-red-500 bg-red-50' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative">
        <div className="h-96 bg-cover bg-center" style={{ backgroundImage: `url(${eventData.thumbnail})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {eventData.category}
              </span>
              <div className="flex items-center text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4" />
                <span className="text-white text-sm ml-2">(4.2/5)</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {eventData.title}
            </h1>
            <p className="text-xl text-gray-200 mb-6 max-w-3xl">
              {eventData.description}
            </p>
            <div className="flex flex-wrap items-center gap-6 text-white">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(eventData.startAt)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>{eventData.venue.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>{eventData.registrations}/{eventData.capacity} registered</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Navigation Tabs */}
            <div className="bg-white rounded-lg shadow-sm border p-1">
              <div className="flex space-x-1">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'schedule', label: 'Schedule' },
                  { id: 'media', label: 'Media' },
                  { id: 'reviews', label: 'Reviews' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-600 hover:text-purple-600'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: eventData.content }}
                  style={{
                    lineHeight: '1.7',
                    color: '#374151'
                  }}
                />
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Event Schedule</h3>
                <div className="space-y-4">
                  {[
                    { time: '09:00 AM', title: 'Registration & Welcome Coffee', duration: '1 hour' },
                    { time: '10:00 AM', title: 'Opening Keynote: Future of Technology', duration: '1.5 hours' },
                    { time: '11:30 AM', title: 'Panel Discussion: AI in Business', duration: '1 hour' },
                    { time: '01:00 PM', title: 'Lunch Break & Networking', duration: '1 hour' },
                    { time: '02:00 PM', title: 'Workshop: Building with AI', duration: '2 hours' },
                    { time: '04:00 PM', title: 'Startup Pitch Competition', duration: '1.5 hours' },
                    { time: '05:30 PM', title: 'Closing Ceremony & Awards', duration: '30 mins' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                        {item.time}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-500">{item.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'media' && (
              <div className="space-y-6">
                {/* Gallery Images */}
                {getAttachmentsByTag('PAST_IMAGE').length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm border p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Photo Gallery</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {getAttachmentsByTag('PAST_IMAGE').map((image) => (
                        <div key={image.id} className="relative group cursor-pointer">
                          <img
                            src={image.url}
                            alt={image.filename}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 rounded-lg flex items-center justify-center">
                            <ImageIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Videos */}
                {getAttachmentsByTag('PROMO').length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm border p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Videos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {getAttachmentsByTag('PROMO').map((video) => (
                        <div key={video.id} className="relative group cursor-pointer">
                          <img
                            src={video.url}
                            alt={video.filename}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
                            <Play className="w-12 h-12 text-white" />
                          </div>
                          <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                            {video.filename}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Documents */}
                {getAttachmentsByTag('SLIDES').length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm border p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Downloads</h3>
                    <div className="space-y-3">
                      {getAttachmentsByTag('SLIDES').map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            {getMediaIcon(doc.mediaType)}
                            <div>
                              <p className="font-medium text-gray-900">{doc.filename}</p>
                              <p className="text-sm text-gray-500">{doc.mimeType}</p>
                            </div>
                          </div>
                          <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                            <Download className="w-4 h-4" />
                            <span>Download</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Reviews & Feedback</h3>
                <div className="space-y-6">
                  {[
                    { name: 'Amit Sharma', rating: 5, comment: 'Excellent event with great speakers and networking opportunities!', date: '2 days ago' },
                    { name: 'Priya Patel', rating: 4, comment: 'Very informative sessions. The AI workshop was particularly engaging.', date: '1 week ago' },
                    { name: 'Rahul Kumar', rating: 5, comment: 'Well organized event. Looking forward to attending next year!', date: '2 weeks ago' }
                  ].map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {review.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-gray-900">{review.name}</h4>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900">
                  {eventData.price === 0 ? 'Free' : `₹${eventData.price.toLocaleString()}`}
                </div>
                <p className="text-gray-600">Per person</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium">Start Date</p>
                    <p className="text-sm">{formatDate(eventData.startAt)} at {formatTime(eventData.startAt)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-gray-600">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium">Duration</p>
                    <p className="text-sm">3 days</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm">{eventData.venue.name}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-gray-600">
                  <Users className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium">Availability</p>
                    <p className="text-sm">{eventData.capacity - eventData.registrations} spots left</p>
                  </div>
                </div>
              </div>

              <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors mb-3">
                Register Now
              </button>

              <button className="w-full border border-purple-600 text-purple-600 py-3 px-4 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                Add to Wishlist
              </button>
            </div>

            {/* Organizer Info */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Organized by</h3>
              <div className="flex items-center space-x-3">
                <img
                  src={eventData.createdBy.image}
                  alt={eventData.createdBy.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-900">{eventData.createdBy.name}</p>
                  <p className="text-sm text-gray-600">Event Organizer</p>
                </div>
              </div>
              <button className="w-full mt-4 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                Contact Organizer
              </button>
            </div>

            {/* Share */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Event</h3>
              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Facebook
                </button>
                <button className="flex-1 bg-blue-400 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors">
                  Twitter
                </button>
                <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailDisplay;