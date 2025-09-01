'use client';
import React from 'react';

export default function EventCard({ event, registration, onView }:{ event:any; registration:any; onView:()=>void }){
  const isFull = event.registrationsCount >= event.capacity;
  const regStatus = registration ? registration.status : null;
  const start = new Date(event.startAt);
  const end = new Date(event.endAt);
  const price = event.price>0 ? `₹${event.price}` : 'Free';

  const statusColor = event.status==='PUBLISHED' ? 'bg-emerald-100 text-emerald-800' : event.status==='COMPLETED' ? 'bg-slate-100 text-slate-700' : 'bg-rose-100 text-rose-700';

  return (
    <article className="card overflow-hidden">
      <div className="h-36 bg-[url('/theme-hero.jpg')] bg-cover bg-center" aria-hidden="true" />
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">{event.title}</h3>
            <p className="text-xs text-slate-500">{event.category} • {event.venue.name}</p>
          </div>
          <span className={`badge ${statusColor}`}>{event.status}</span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-xs text-slate-600">{start.toLocaleString()} - {end.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</div>
          <div className="text-sm font-medium">{price}</div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button className="btn-primary" onClick={onView}>View Details</button>
          <div className="text-sm text-slate-600">{ regStatus ? regStatus : (isFull? 'Full' : 'Not registered') }</div>
        </div>
      </div>
    </article>
  );
}