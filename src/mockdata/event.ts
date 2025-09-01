// ===== MOCK DATA (static dates + unique IDs) =====

// Enums
type EventCategory = "TECHNICAL" | "CULTURAL" | "SPORTS" | "WORKSHOP" | "SEMINAR" | "FEST" | "OTHER";
type EventStatus = "DRAFT" | "PUBLISHED" | "CANCELLED";
type AttachmentType = "IMAGE" | "VIDEO" | "BROCHURE";

// Interfaces
interface Attchment {
  id: string;
  eventId: string;
  url: string;
  type: AttachmentType;
  createdAt: string;
}

interface Qna {
  id: string;
  eventId: string;
  question: string;
  answer: string;
  createdAt: string;
}

interface TermsAndCondition {
  id: string;
  eventId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface TimeLine {
  id: string;
  eventId: string;
  title: string;
  details?: string;
  time?: string;
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
  status: "PENDING" | "SUCCESS" | "FAILED";
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  status: EventStatus;

  eventWebUrl?: string;
  attchments: Attchment[];
  qnas: Qna[];
  termsAndConditions?: TermsAndCondition;
  timeLines: TimeLine[];

  clubId?: string;
  createdById: string;
  venue?: string;
  startAt: string;
  endAt: string;

  capacity?: number;
  registrationOpensAt?: string;
  registrationClosesAt?: string;

  isPaid: boolean;
  price?: number;

  createdAt: string;
  updatedAt: string;

  registrations: Registration[];
  Payment: Payment[];
}

export const mockEvents: Event[] = [
  {
    id: "evt1",
    title: "Tech Innovation Summit",
    description: "Discover the latest in technology and innovation.",
    category: "TECHNICAL",
    status: "PUBLISHED",
    eventWebUrl: "https://example.com/tech-summit",
    attchments: [
      {
        id: "att1",
        eventId: "evt1",
        url: "https://picsum.photos/300/200?random=1",
        type: "IMAGE",
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
        answer: "No, beginners are welcome!",
        createdAt: "2025-08-02T09:00:00Z",
      },
    ],
    termsAndConditions: {
      id: "tc1",
      eventId: "evt1",
      content: "All participants must carry a valid ID card.",
      createdAt: "2025-08-01T11:00:00Z",
      updatedAt: "2025-08-03T15:00:00Z",
    },
    timeLines: [
      {
        id: "tl1",
        eventId: "evt1",
        title: "Keynote Speech",
        details: "Opening keynote by industry leader.",
        time: "2025-09-05T09:30:00Z",
        order: 1,
        createdAt: "2025-08-05T10:00:00Z",
      },
      {
        id: "tl2",
        eventId: "evt1",
        title: "Panel Discussion",
        details: "Panel with startup founders.",
        time: "2025-09-05T11:00:00Z",
        order: 2,
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
    ],
    Payment: [
      { id: "pay1", eventId: "evt1", userId: "user-101", amount: 499, status: "SUCCESS", createdAt: "2025-08-20T12:05:00Z" },
    ],
  },
  {
    id: "evt2",
    title: "Cultural Night",
    description: "Dance, drama, and music performances by students.",
    category: "CULTURAL",
    status: "PUBLISHED",
    eventWebUrl: "https://example.com/cultural-night",
    attchments: [
      {
        id: "att3",
        eventId: "evt2",
        url: "https://picsum.photos/300/200?random=2",
        type: "IMAGE",
        createdAt: "2025-08-02T12:00:00Z",
      },
    ],
    qnas: [],
    termsAndConditions: {
      id: "tc2",
      eventId: "evt2",
      content: "Entry is free but seating is limited.",
      createdAt: "2025-08-02T13:00:00Z",
      updatedAt: "2025-08-05T15:00:00Z",
    },
    timeLines: [
      {
        id: "tl3",
        eventId: "evt2",
        title: "Inauguration",
        order: 1,
        createdAt: "2025-08-06T10:00:00Z",
      },
      {
        id: "tl4",
        eventId: "evt2",
        title: "Dance Performances",
        order: 2,
        createdAt: "2025-08-06T11:00:00Z",
      },
    ],
    clubId: "club-cultural",
    createdById: "user-456",
    venue: "Open Air Theatre",
    startAt: "2025-09-10T18:00:00Z",
    endAt: "2025-09-10T22:00:00Z",
    capacity: 500,
    registrationOpensAt: "2025-09-01T00:00:00Z",
    registrationClosesAt: "2025-09-09T23:59:59Z",
    isPaid: false,
    createdAt: "2025-08-02T10:00:00Z",
    updatedAt: "2025-08-12T09:00:00Z",
    registrations: [],
    Payment: [],
  },
  {
    id: "evt3",
    title: "AI & ML Workshop",
    description: "Hands-on workshop on deep learning and AI models.",
    category: "WORKSHOP",
    status: "DRAFT",
    eventWebUrl: "https://example.com/ai-workshop",
    attchments: [
      {
        id: "att4",
        eventId: "evt3",
        url: "https://picsum.photos/300/200?random=3",
        type: "IMAGE",
        createdAt: "2025-08-03T14:00:00Z",
      },
    ],
    qnas: [
      {
        id: "qna2",
        eventId: "evt3",
        question: "Is prior coding knowledge required?",
        answer: "Basic Python is recommended.",
        createdAt: "2025-08-03T14:30:00Z",
      },
    ],
    termsAndConditions: {
      id: "tc3",
      eventId: "evt3",
      content: "Bring your own laptop with Python installed.",
      createdAt: "2025-08-03T15:00:00Z",
      updatedAt: "2025-08-07T10:00:00Z",
    },
    timeLines: [
      {
        id: "tl5",
        eventId: "evt3",
        title: "Introduction to AI",
        order: 1,
        createdAt: "2025-08-08T10:00:00Z",
      },
      {
        id: "tl6",
        eventId: "evt3",
        title: "Hands-on Lab",
        order: 2,
        createdAt: "2025-08-08T11:00:00Z",
      },
    ],
    clubId: "club-ai",
    createdById: "user-789",
    venue: "Lab 202",
    startAt: "2025-09-15T10:00:00Z",
    endAt: "2025-09-15T16:00:00Z",
    capacity: 100,
    registrationOpensAt: "2025-09-05T00:00:00Z",
    registrationClosesAt: "2025-09-14T23:59:59Z",
    isPaid: true,
    price: 299,
    createdAt: "2025-08-03T14:00:00Z",
    updatedAt: "2025-08-10T09:30:00Z",
    registrations: [],
    Payment: [],
  },
];
