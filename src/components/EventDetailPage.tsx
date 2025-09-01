"use client";
import React, { useState } from 'react';
import { Clock, MapPin, Users, Calendar, ChevronDown, ChevronUp, ExternalLink, Play } from 'lucide-react';

// TypeScript interfaces
interface Attachment {
  id: string;
  eventId: string;
  url: string;
  type: 'BANNER' | 'IMAGE' | 'VIDEO' | 'BROCHURE';
  createdAt: string;
}

interface QnA {
  id: string;
  eventId: string;
  question: string;
  answer: string;
  createdAt: string;
}

interface TermsAndConditions {
  id: string;
  eventId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface Timeline {
  id: string;
  eventId: string;
  title: string;
  details: string;
  startTime: string;
  endTime: string;
  order: number;
  createdAt: string;
}

interface Registration {
  id: string;
  eventId: string;
  userId: string;
  createdAt: string;
}

interface Payment {
  id: string;
  eventId: string;
  userId: string;
  amount: number;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  createdAt: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'PUBLISHED' | 'DRAFT';
  eventWebUrl: string;
  attchments: Attachment[];
  qnas: QnA[];
  termsAndConditions: TermsAndConditions;
  timeLines: Timeline[];
  clubId: string;
  createdById: string;
  venue: string;
  startAt: string;
  endAt: string;
  capacity: number;
  registrationOpensAt: string;
  registrationClosesAt: string;
  isPaid: boolean;
  price?: number;
  createdAt: string;
  updatedAt: string;
  registrations: Registration[];
  Payment: Payment[];
}

// Sample event data
const eventData: Event = {
  id: "evt1",
  title: "Tech Innovation Summit",
  description: "Discover the latest in technology and innovation. Join industry leaders, startup founders, and tech enthusiasts for a day of learning, networking, and innovation. This summit will cover cutting-edge technologies, AI trends, and the future of digital transformation.",
  category: "TECHNICAL",
  status: "PUBLISHED",
  eventWebUrl: "https://example.com/tech-summit",
  attchments: [
    {
      id: "att1",
      eventId: "evt1",
      url: "https://picsum.photos/1200/400?random=1",
      type: "BANNER",
      createdAt: "2025-08-01T10:00:00Z",
    },
    {
      id: "att1b",
      eventId: "evt1",
      url: "https://picsum.photos/300/200?random=11",
      type: "IMAGE",
      createdAt: "2025-08-01T10:00:00Z",
    },
    {
      id: "att1c",
      eventId: "evt1",
      url: "https://picsum.photos/300/200?random=12",
      type: "IMAGE",
      createdAt: "2025-08-01T10:00:00Z",
    },
    {
      id: "att1d",
      eventId: "evt1",
      url: "https://picsum.photos/300/200?random=13",
      type: "IMAGE",
      createdAt: "2025-08-01T10:00:00Z",
    },
    {
      id: "att1video",
      eventId: "evt1",
      url: "https://example.com/tech-video.mp4",
      type: "VIDEO",
      createdAt: "2025-08-01T10:00:00Z",
    },
    {
      id: "att2",
      eventId: "evt1",
      url: "https://example.com/brochure.pdf",
      type: "BROCHURE",
      createdAt: "2025-08-01T10:05:00Z",
    },
  ],
  qnas: [
    {
      id: "qna1",
      eventId: "evt1",
      question: "Do I need prior experience?",
      answer: "No, beginners are welcome! Our sessions are designed to cater to all skill levels, from beginners to advanced professionals.",
      createdAt: "2025-08-02T09:00:00Z",
    },
    {
      id: "qna1b",
      eventId: "evt1",
      question: "What should I bring?",
      answer: "Just bring your enthusiasm and a notebook for taking notes! We'll provide all necessary materials and refreshments.",
      createdAt: "2025-08-02T09:00:00Z",
    },
    {
      id: "qna1c",
      eventId: "evt1",
      question: "Is parking available?",
      answer: "Yes, free parking is available on campus. Additional paid parking is available nearby.",
      createdAt: "2025-08-02T09:00:00Z",
    },
    {
      id: "qna1d",
      eventId: "evt1",
      question: "Will food be provided?",
      answer: "Yes, lunch and refreshments will be provided throughout the day as part of your registration.",
      createdAt: "2025-08-02T09:00:00Z",
    },
  ],
  termsAndConditions: {
    id: "tc1",
    eventId: "evt1",
    content: "All participants must carry a valid ID card for entry verification. No outside food or drinks are allowed inside the venue. Photography is permitted for personal use only. Professional photography requires prior permission. The organizers reserve the right to use event photos for promotional purposes. Refunds are available up to 48 hours before the event. In case of event cancellation due to unforeseen circumstances, full refunds will be processed within 7 business days.",
    createdAt: "2025-08-01T11:00:00Z",
    updatedAt: "2025-08-03T15:00:00Z",
  },
  timeLines: [
    {
      id: "tl1",
      eventId: "evt1",
      title: "Registration & Welcome",
      details: "Check-in process and welcome refreshments. Collect your event kit and networking materials.",
      startTime: "2025-09-05T09:00:00Z",
      endTime: "2025-09-05T09:30:00Z",
      order: 1,
      createdAt: "2025-08-05T10:00:00Z",
    },
    {
      id: "tl2",
      eventId: "evt1",
      title: "Keynote Speech",
      details: "Opening keynote by industry leader on 'The Future of Technology Innovation'.",
      startTime: "2025-09-05T09:30:00Z",
      endTime: "2025-09-05T10:30:00Z",
      order: 2,
      createdAt: "2025-08-05T10:00:00Z",
    },
    {
      id: "tl3",
      eventId: "evt1",
      title: "Panel Discussion",
      details: "Panel with startup founders discussing challenges and opportunities in tech entrepreneurship.",
      startTime: "2025-09-05T11:00:00Z",
      endTime: "2025-09-05T12:30:00Z",
      order: 3,
      createdAt: "2025-08-05T11:00:00Z",
    },
    {
      id: "tl4",
      eventId: "evt1",
      title: "Networking Lunch",
      details: "Connect with fellow innovators over lunch. Speed networking sessions included.",
      startTime: "2025-09-05T13:00:00Z",
      endTime: "2025-09-05T14:00:00Z",
      order: 4,
      createdAt: "2025-08-05T11:00:00Z",
    },
    {
      id: "tl5",
      eventId: "evt1",
      title: "Workshop Sessions",
      details: "Hands-on workshops on AI, Blockchain, and IoT technologies.",
      startTime: "2025-09-05T14:30:00Z",
      endTime: "2025-09-05T16:30:00Z",
      order: 5,
      createdAt: "2025-08-05T11:00:00Z",
    },
    {
      id: "tl6",
      eventId: "evt1",
      title: "Closing Ceremony",
      details: "Award ceremony, closing remarks, and networking session.",
      startTime: "2025-09-05T16:30:00Z",
      endTime: "2025-09-05T17:00:00Z",
      order: 6,
      createdAt: "2025-08-05T11:00:00Z",
    },
  ],
  clubId: "club-tech",
  createdById: "user-123",
  venue: "Auditorium Hall",
  startAt: "2025-09-05T09:00:00Z",
  endAt: "2025-09-05T17:00:00Z",
  capacity: 200,
  registrationOpensAt: "2025-08-25T00:00:00Z",
  registrationClosesAt: "2025-09-04T23:59:59Z",
  isPaid: true,
  price: 499,
  createdAt: "2025-08-01T10:00:00Z",
  updatedAt: "2025-08-10T09:00:00Z",
  registrations: [
    { id: "reg1", eventId: "evt1", userId: "user-101", createdAt: "2025-08-20T12:00:00Z" },
    { id: "reg2", eventId: "evt1", userId: "user-102", createdAt: "2025-08-21T12:00:00Z" },
    { id: "reg3", eventId: "evt1", userId: "user-103", createdAt: "2025-08-22T12:00:00Z" },
  ],
  Payment: [
    { id: "pay1", eventId: "evt1", userId: "user-101", amount: 499, status: "SUCCESS", createdAt: "2025-08-20T12:05:00Z" },
    { id: "pay2", eventId: "evt1", userId: "user-102", amount: 499, status: "SUCCESS", createdAt: "2025-08-21T12:05:00Z" },
    { id: "pay3", eventId: "evt1", userId: "user-103", amount: 499, status: "PENDING", createdAt: "2025-08-22T12:05:00Z" },
  ],
};

const EventDetailComponent: React.FC<{ event?: Event }> = ({ event = eventData }) => {
  const [expandedQnA, setExpandedQnA] = useState<string | null>(null);
  const [showAllTimeline, setShowAllTimeline] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string): string => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getBannerImage = (): string => {
    const banner = event.attchments.find(att => att.type === 'BANNER');
    return banner?.url || 'https://picsum.photos/1200/400?random=default';
  };

  const getEventImages = (): Attachment[] => {
    return event.attchments.filter(att => att.type === 'IMAGE');
  };

  const getVideos = (): Attachment[] => {
    return event.attchments.filter(att => att.type === 'VIDEO');
  };

  const availableSpots = event.capacity - event.registrations.length;
  const isRegistrationOpen = new Date() >= new Date(event.registrationOpensAt) && 
                            new Date() <= new Date(event.registrationClosesAt);

  const displayTimeline = showAllTimeline ? event.timeLines : event.timeLines.slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
      {/* Banner Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img 
          src={getBannerImage()} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <span className="bg-purple-600 px-3 py-1 rounded-full text-sm font-medium">
            {event.category}
          </span>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {/* Event Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {event.title}
          </h1>
          
          {/* Event Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-2 text-purple-600" />
              <span className="text-sm">{formatDate(event.startAt)}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2 text-purple-600" />
              <span className="text-sm">
                {formatTime(event.startAt)} - {formatTime(event.endAt)}
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2 text-purple-600" />
              <span className="text-sm">{event.venue}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="w-5 h-5 mr-2 text-purple-600" />
              <span className="text-sm">{availableSpots} spots left</span>
            </div>
          </div>

          {/* Price Badge */}
          {event.isPaid && event.price && (
            <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              ₹{event.price}
            </div>
          )}
        </div>

        {/* About Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">About This Event</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {event.description}
          </p>
        </section>

        {/* Event Images */}
        {getEventImages().length > 0 && (
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Event Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {getEventImages().map((image) => (
                <div key={image.id} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <img 
                    src={image.url} 
                    alt="Event"
                    className="w-full h-48 object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Videos */}
        {getVideos().length > 0 && (
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Event Videos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getVideos().map((video) => (
                <div key={video.id} className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
                  <Play className="w-8 h-8 text-purple-600 mr-2" />
                  <a 
                    href={video.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-800 font-medium"
                  >
                    Watch Event Video
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Timeline */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Event Timeline</h2>
          <div className="space-y-4">
            {displayTimeline.map((timeline, index) => (
              <div key={timeline.id} className="flex items-start">
                <div className="flex-shrink-0 w-16 text-sm font-medium text-purple-600">
                  <div>
                    {formatTime(timeline.startTime)} 
                  </div>
                  <div>To</div>
                  <div> {formatTime(timeline.endTime)} </div>
                </div>
                <div className="flex flex-col items-center mr-4">
                </div>
                
                <div className="flex-grow ml-4 border-l-2 border-purple-200 pl-4 pb-4">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {timeline.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {timeline.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {event.timeLines.length > 3 && (
            <button
              onClick={() => setShowAllTimeline(!showAllTimeline)}
              className="mt-4 text-purple-600 hover:text-purple-800 font-medium text-sm flex items-center"
            >
              {showAllTimeline ? (
                <>Show Less <ChevronUp className="w-4 h-4 ml-1" /></>
              ) : (
                <>Show All Timeline <ChevronDown className="w-4 h-4 ml-1" /></>
              )}
            </button>
          )}
        </section>

        {/* Q&A Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {event.qnas.map((qna) => (
              <div key={qna.id} className="border border-gray-200 rounded-lg">
                <button
                  className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedQnA(expandedQnA === qna.id ? null : qna.id)}
                >
                  <span className="font-medium text-gray-900">{qna.question}</span>
                  {expandedQnA === qna.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {expandedQnA === qna.id && (
                  <div className="px-4 pb-3 text-gray-700">
                    {qna.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Terms and Conditions */}
        <section className="mb-8">
          <button
            onClick={() => setShowTerms(!showTerms)}
            className="flex items-center justify-between w-full text-left mb-4"
          >
            <h2 className="text-2xl font-semibold text-gray-900">Terms & Conditions</h2>
            {showTerms ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          {showTerms && (
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                {event.termsAndConditions.content}
              </p>
            </div>
          )}
        </section>

        {/* Call to Action */}
        <section className="border-t pt-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="text-center sm:text-left">
              <p className="text-gray-600 text-sm mb-1">
                {event.registrations.length} of {event.capacity} registered
              </p>
              {event.isPaid && event.price && (
                <p className="text-2xl font-bold text-gray-900">₹{event.price}</p>
              )}
            </div>
            
            <div className="flex gap-3">
              {event.eventWebUrl && (
                <a
                  href={event.eventWebUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  Learn More <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              )}
              
              <button
                disabled={!isRegistrationOpen || availableSpots <= 0}
                className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                  isRegistrationOpen && availableSpots > 0
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {!isRegistrationOpen 
                  ? 'Registration Closed' 
                  : availableSpots <= 0 
                    ? 'Event Full' 
                    : event.isPaid 
                      ? `Register - ₹${event.price}` 
                      : 'Register Free'
                }
              </button>
            </div>
          </div>
          
          {!isRegistrationOpen && (
            <p className="text-sm text-gray-500 mt-2 text-center sm:text-right">
              Registration was open from {formatDate(event.registrationOpensAt)} to {formatDate(event.registrationClosesAt)}
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default EventDetailComponent;