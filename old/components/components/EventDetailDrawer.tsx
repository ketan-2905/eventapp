'use client';
import React, { useEffect, useState } from 'react';
import AttachmentPreview from './AttachmentPreview';

export default function EventDetailDrawer({ event, registration, onClose }:{ event:any; registration:any; onClose:()=>void }){
  const [localReg, setLocalReg] = useState(registration);
  const [loading, setLoading] = useState(false);
  const isFull = event.registrationsCount >= event.capacity;

  useEffect(()=>{
    function onKey(e:KeyboardEvent){ if(e.key==='Escape') onClose(); }
    window.addEventListener('keydown', onKey);
    return ()=> window.removeEventListener('keydown', onKey);
  },[onClose]);

  async function toggleRegister(){
    setLoading(true);
    await new Promise(r=>setTimeout(r,700));
    if(localReg){
      setLocalReg(null);
      event.registrationsCount -=1;
      toast('Registration cancelled');
    } else {
      if(isFull){ toast('Event is full — joined waitlist'); setLocalReg({ eventId: event.id, status: 'WAITLISTED' }); }
      else { setLocalReg({ eventId: event.id, status: 'REGISTERED' }); event.registrationsCount +=1; toast('Registered'); }
    }
    setLoading(false);
  }

  function toast(msg:string){
    const el = document.createElement('div');
    el.textContent = msg;
    Object.assign(el.style,{position:'fixed',left:'50%',top:'20px',transform:'translateX(-50%)',padding:'8px 12px',background:'#6A39FF',color:'#fff',borderRadius:'999px',zIndex:9999});
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),1400);
  }

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex">
      <button aria-label="Close" className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="ml-auto w-full max-w-md bg-white text-slate-900 p-6 shadow-2xl h-full overflow-auto">
        <button onClick={onClose} className="text-sm text-slate-500">Close</button>
        <h3 className="mt-4 text-xl font-semibold">{event.title}</h3>
        <p className="mt-2 text-sm text-slate-600">{event.description}</p>
        <div className="mt-4">
          <AttachmentPreview attachments={event.attachments} />
        </div>
        <div className="mt-4 space-y-2 text-sm text-slate-700">
          <div>Venue: <strong>{event.venue.name}</strong></div>
          <div>Capacity: {event.capacity}</div>
          <div>Registered: {event.registrationsCount}</div>
        </div>

        <div className="mt-6 flex gap-3">
          { localReg ? (
            <button className="btn-secondary" onClick={toggleRegister} disabled={loading}>{loading? 'Cancelling…' : 'Cancel Registration'}</button>
          ) : (
            <button className="btn-primary" onClick={toggleRegister} disabled={loading}>{loading? 'Processing…' : (isFull? 'Join Waitlist' : 'Register Now')}</button>
          )}
          <button className="btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}