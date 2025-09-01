'use client';
import React, { useMemo, useState } from 'react';
import EventCard from './EventCard';
import EventDetailDrawer from './EventDetailDrawer';

export default function EventList({ events, currentUser }:{ events:any[]; currentUser:any }){
  const [openEvent, setOpenEvent] = useState<any|null>(null);
  const registrations = currentUser.registrations || [];

  const now = new Date();
  const upcoming = events.filter(e=> new Date(e.startAt) >= now);
  const past = events.filter(e=> new Date(e.startAt) < now);

  return (
    <div className="grid gap-6">
      <section>
        <h2 className="text-lg font-semibold">Upcoming</h2>
        {upcoming.length===0 ? <EmptyState /> : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map(e=>{
              const reg = registrations.find((r:any)=>r.eventId===e.id) ?? null;
              return <EventCard key={e.id} event={e} registration={reg} onView={()=>setOpenEvent(e)} />;
            })}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold">Past</h2>
        {past.length===0 ? <p className="mt-2 text-sm text-slate-300">No past events</p> : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {past.map(e=>{
              const reg = registrations.find((r:any)=>r.eventId===e.id) ?? null;
              return <EventCard key={e.id} event={e} registration={reg} onView={()=>setOpenEvent(e)} />;
            })}
          </div>
        )}
      </section>

      {openEvent && (
        <EventDetailDrawer event={openEvent} registration={currentUser.registrations.find((r:any)=>r.eventId===openEvent.id) ?? null} onClose={()=>setOpenEvent(null)} />
      )}
    </div>
  );
}

function EmptyState(){
  return (
    <div className="card p-6">
      <p className="text-slate-700">No events available.</p>
    </div>
  );
}
