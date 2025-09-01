'use client';
import React from 'react';


export default function MainShellStub({ user }: { user:any }){
const isAdmin = user.role === 'ADMIN' || user.role === 'SUPERADMIN';
return (
<div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
<nav className="rounded-3xl bg-white/90 p-5 text-slate-900 shadow-[0_12px_30px_-16px_rgba(0,0,0,0.45)] ring-1 ring-slate-200">
<div className="mb-4 flex items-center gap-3">
<div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#6A39FF] to-[#FF5CBA]" aria-hidden="true" />
<div>
<p className="text-sm font-medium text-slate-700">{user.name}</p>
<p className="text-xs text-slate-500">{user.role}</p>
</div>
</div>
<ul className="space-y-2 text-sm">
{['Events','Dashboard','My Registrations'].map(item=>(
<li key={item}><a href="#" className="nav-link">{item}</a></li>
))}
{isAdmin && <li><a href="#" className="nav-link">Admin Panel</a></li>}
</ul>
</nav>


<section className="space-y-6">
<div className="rounded-3xl bg-white/95 p-6 text-slate-900 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.4)] ring-1 ring-slate-200">
<h3 className="text-xl font-semibold">Empty Dashboard</h3>
<p className="mt-1 text-sm text-slate-600">No widgets yet. Start exploring events.</p>
</div>


<div className="rounded-3xl bg-white/95 p-6 text-slate-900 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.4)] ring-1 ring-slate-200">
<div className="mb-3 flex items-center justify-between">
<h3 className="text-xl font-semibold">Upcoming Events</h3>
<button className="btn-secondary">See all</button>
</div>
<ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
{[1,2,3].map(i=> (
<li key={i} className="rounded-2xl overflow-hidden ring-1 ring-slate-200 bg-white shadow-[0_12px_30px_-16px_rgba(0,0,0,0.45)]">
<div className="h-28 bg-[url('/theme-hero.jpg')] bg-cover bg-center" aria-hidden="true" />
<div className="p-4">
<p className="text-sm font-medium">Citywide Art Festival</p>
<p className="text-xs text-slate-500">12 May • 1pm–4pm</p>
</div>
</li>
))}
</ul>
</div>
</section>
</div>
);
}