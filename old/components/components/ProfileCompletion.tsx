'use client';
import React, { useEffect, useState } from 'react';
import StudentForm from './StudentForm';
import AdminForm from './AdminForm';
import MainShellStub from './MainShellStub';

type Role = 'STUDENT'|'ADMIN'|'SUPERADMIN';

export default function ProfileCompletion({ user }: { user: any }){
  const [done, setDone] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(()=>{
    if(done){
      const t = setTimeout(()=> setToast('Profile saved! Redirecting…'), 50);
      const r = setTimeout(()=> setToast(null), 1300);
      const s = setTimeout(()=> setShowMain(true), 1000);
      return ()=> { clearTimeout(t); clearTimeout(r); clearTimeout(s); };
    }
  },[done]);

  const [showMain, setShowMain] = useState(false);
  if(showMain){
    return <MainShellStub user={{...user, profileCompleted:true}}/>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="rounded-3xl bg-white/95 text-slate-900 p-6 md:p-8 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.4)] ring-1 ring-slate-200">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Complete your profile</h2>
        <Stepper />
        {user.role === 'STUDENT' && (
          <StudentForm user={user} onSuccess={()=>setDone(true)} />
        )}
        {user.role === 'ADMIN' && (
          <AdminForm user={user} onSuccess={()=>setDone(true)} />
        )}
        {user.role === 'SUPERADMIN' && (
          <p className="mt-4">Your profile already has Superadmin rights.</p>
        )}
      </div>

      <aside className="space-y-4">
        <InfoCard title="New events" subtitle="Coming soon">
          <ul className="space-y-2 text-sm">
            <li>Citywide Art Festival — 12 May</li>
            <li>Historical Reenactment — 12 May</li>
            <li>Immersive Music Fest — 12 May</li>
          </ul>
        </InfoCard>
        <InfoCard title="Need help?" subtitle="Contact admin">
          <p className="text-sm">Reach the events desk if you get stuck.</p>
        </InfoCard>
      </aside>

      {toast && (
        <div role="status" className="fixed left-1/2 top-6 -translate-x-1/2 rounded-full bg-[#6A39FF] px-4 py-2 text-white shadow-lg" aria-live="polite">{toast}</div>
      )}
    </div>
  );
}

function Stepper(){
  return (
    <ol className="mt-4 mb-6 flex items-center gap-2 text-xs font-medium text-slate-600">
      {['Basic info','Role info','Confirm'].map((s,i)=> (
        <li key={s} className="flex items-center gap-2">
          <span className={`grid h-6 w-6 place-items-center rounded-full ${i===0? 'bg-[#6A39FF] text-white' : 'bg-slate-200 text-slate-700'}`}>{i+1}</span>
          <span>{s}</span>
          {i<2 && <span className="mx-2 h-px w-8 bg-slate-200" />}
        </li>
      ))}
    </ol>
  );
}

function InfoCard({title,subtitle,children}:{title:string;subtitle?:string;children:React.ReactNode}){
  return (
    <div className="rounded-2xl bg-white/90 p-5 text-slate-900 shadow-[0_12px_30px_-16px_rgba(0,0,0,0.45)] ring-1 ring-slate-200">
      <div className="mb-3">
        <p className="text-xs uppercase tracking-wide text-[#6A39FF]">{subtitle}</p>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}