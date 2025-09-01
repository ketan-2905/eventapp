import React, { Suspense } from 'react';
import MainShellStub from './MainShellStub';
import ProfileCompletion from './ProfileCompletion';

// Simulated DB (server-side only)
const MOCK_USERS = {
  'u-student-001': {
    id: 'u-student-001',
    name: 'Asha Rao',
    email: 'asha@example.com',
    role: 'STUDENT',
    profileCompleted: false,
    studentProfile: null,
  },
  'u-admin-001': {
    id: 'u-admin-001',
    name: 'Ravi Menon',
    email: 'ravi@example.com',
    role: 'ADMIN',
    profileCompleted: false,
    adminProfile: null,
  },
  'u-student-002': {
    id: 'u-student-002',
    name: 'Neha Patel',
    email: 'neha@example.com',
    role: 'STUDENT',
    profileCompleted: true,
    studentProfile: { studentId: 'STU123', trade: 'CSE', year: 3 },
  },
} as const;

async function sleep(ms:number){ return new Promise(r=>setTimeout(r,ms)); }

// A small server helper that returns user or throws
async function fetchMockUser(userId: string, forceError: boolean){
  await sleep(1500); // simulate latency
  if(forceError){
    throw new Error('Network error (simulated)');
  }
  const user = (MOCK_USERS as any)[userId] || (MOCK_USERS as any)['u-student-001'];
  return structuredClone(user);
}

// Server subcomponent that actually fetches
async function ServerFetch({ userId, forceError }: { userId: string; forceError: boolean }){
  const user = await fetchMockUser(userId, forceError);
  if(user.profileCompleted){
    return <MainShellStub user={user} />;
  }
  return <ProfileCompletion user={user} />;
}

export default async function ParentServer({ searchParams }: { searchParams?: { [k:string]: string } }){
  const userId = searchParams?.userId || 'u-student-001';
  const forceError = Boolean(searchParams?.forceError);
  return (
    <main className="min-h-dvh bg-gradient-to-b from-[#2a147a] via-[#3a1d9a] to-[#120a3b] text-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-6">
        {/* Hero banner (matches theme) */}
        <div className="relative overflow-hidden rounded-3xl bg-[url('/theme-hero.jpg')] bg-cover bg-center shadow-xl ring-1 ring-white/10">
          <div className="backdrop-blur-md bg-[#2a147a]/50 p-6 sm:p-10 md:p-14">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight">The Citywide Music Festival</h1>
            <p className="mt-3 max-w-2xl text-slate-200/90">Complete your profile to explore events. UI-only prototype.</p>
            <div className="mt-6 flex gap-3 text-sm text-slate-200/80">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/10">Date: Select</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/10">Location: Select</span>
              <span className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/10">Type: Select</span>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="mt-8">
          <Suspense fallback={<FormSkeleton />}> 
            <ServerFetch userId={userId} forceError={forceError} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

function FormSkeleton(){
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {[0,1].map((i)=> (
        <div key={i} className="rounded-2xl bg-white/95 text-slate-900 p-6 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)]">
          <div className="h-6 w-2/3 animate-pulse rounded bg-slate-200" />
          <div className="mt-5 space-y-3">
            {Array.from({length:5}).map((_,j)=>(<div key={j} className="h-10 rounded bg-slate-100 animate-pulse" />))}
          </div>
          <div className="mt-5 h-10 w-40 rounded-full bg-violet-300/60 animate-pulse" />
        </div>
      ))}
    </div>
  );
}