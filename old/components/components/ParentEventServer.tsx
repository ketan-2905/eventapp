import React, { Suspense } from 'react';
import EventList from './EventList';

const MOCK_EVENTS = [
  {
    id: 1,
    title: 'Hackathon 2025',
    slug: 'hackathon-2025',
    description: '24-hour coding challenge.',
    category: 'Coding',
    startAt: '2025-09-15T09:00:00Z',
    endAt: '2025-09-16T09:00:00Z',
    capacity: 100,
    status: 'PUBLISHED',
    price: 0,
    venue: { id: 1, name: 'Main Auditorium' },
    attachments: [{ id: 1, url: '/mock/hackathon.jpg', mediaType: 'IMAGE' }],
    registrationsCount: 50,
  },
  {
    id: 2,
    title: 'AI Workshop',
    slug: 'ai-workshop',
    description: 'Intro to Machine Learning and AI.',
    category: 'Workshop',
    startAt: '2025-09-05T10:00:00Z',
    endAt: '2025-09-05T16:00:00Z',
    capacity: 30,
    status: 'PUBLISHED',
    price: 500,
    venue: { id: 2, name: 'Lab 1' },
    attachments: [{ id: 2, url: '/mock/aiworkshop.mp4', mediaType: 'VIDEO', thumbnail: '/mock/ai-thumb.jpg' }],
    registrationsCount: 30,
  },
  {
    id: 3,
    title: 'Cultural Fest',
    slug: 'cultural-fest',
    description: 'Dance, Music, and Fun!',
    category: 'Festival',
    startAt: '2025-08-01T17:00:00Z',
    endAt: '2025-08-01T22:00:00Z',
    capacity: 200,
    status: 'COMPLETED',
    price: 0,
    venue: { id: 3, name: 'Open Grounds' },
    attachments: [],
    registrationsCount: 180,
  },
];

const MOCK_USER = {
  id: 'u-student-001',
  name: 'Asha Rao',
  role: 'STUDENT',
  registrations: [{ eventId: 1, status: 'REGISTERED' }],
};

async function sleep(ms:number){ return new Promise(r=>setTimeout(r,ms)); }

async function fetchMocks({ forceError=false, forceEmpty=false }:{forceError?:boolean;forceEmpty?:boolean}){
  await sleep(1500);
  if(forceError) throw new Error('Simulated network error');
  return { events: forceEmpty? [] : MOCK_EVENTS, currentUser: MOCK_USER };
}

export default async function ParentEventServer({ searchParams }: { searchParams?: { [k:string]: string } }){
  const forceError = Boolean(searchParams?.forceError);
  const forceEmpty = Boolean(searchParams?.forceEmpty);

  return (
    <main className="min-h-dvh bg-gradient-to-b from-[#2a147a] via-[#3a1d9a] to-[#120a3b] text-slate-50 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-[url('/theme-hero.jpg')] bg-cover bg-center p-8 shadow-xl ring-1 ring-white/10">
          <h1 className="text-3xl font-semibold">Events</h1>
          <p className="mt-2 text-slate-200/90">Browse upcoming and past events.</p>
        </div>

        <div className="mt-6">
          <Suspense fallback={<CardSkeletons />}>
            <ServerFetch forceError={forceError} forceEmpty={forceEmpty} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

async function ServerFetch({ forceError, forceEmpty }:{forceError:boolean;forceEmpty:boolean}){
  const { events, currentUser } = await fetchMocks({ forceError, forceEmpty });
  return <EventList events={events} currentUser={currentUser} />;
}

function CardSkeletons(){
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({length:6}).map((_,i)=>(
        <div key={i} className="card p-4 animate-pulse">
          <div className="h-32 rounded-lg bg-slate-100" />
          <div className="mt-3 h-4 w-3/4 bg-slate-100 rounded" />
          <div className="mt-2 h-3 w-1/2 bg-slate-100 rounded" />
        </div>
      ))}
    </div>
  );
}