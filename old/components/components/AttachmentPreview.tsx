'use client';
import React from 'react';

export default function AttachmentPreview({ attachments }:{ attachments:any[] }){
  if(!attachments || attachments.length===0) return <p className="text-sm text-slate-500">No attachments</p>;
  return (
    <div className="grid gap-3">
      {attachments.map(a=> (
        <div key={a.id} className="rounded-lg overflow-hidden ring-1 ring-slate-200">
          {a.mediaType==='IMAGE' && <img src={a.url} alt="attachment" className="w-full h-40 object-cover" />}
          {a.mediaType==='VIDEO' && (
            <video controls poster={a.thumbnail} className="w-full h-40 object-cover">
              <source src={a.url} />
            </video>
          )}
        </div>
      ))}
    </div>
  );
}
