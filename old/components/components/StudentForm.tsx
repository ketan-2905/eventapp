'use client';
import React, { useId, useState } from 'react';

export default function StudentForm({ user, onSuccess }: { user:any; onSuccess: ()=>void }){
  const [form, setForm] = useState({
    name: user.name || '',
    email: user.email || '',
    phoneno: '',
    studentId: '',
    trade: 'CSE',
    year: 1,
    college: '',
    rollNumber: '',
    emergencyContact: '',
  });
  const [errors, setErrors] = useState<any>({});
  const [skipped, setSkipped] = useState(false);
  const [saving, setSaving] = useState(false);

  function validate(){
    const e:any = {};
    if(!form.name) e.name = 'Name is required.';
    if(!form.email) e.email = 'Email is required.';
    if(!form.studentId || form.studentId.length<3 || !/^[a-z0-9]+$/i.test(form.studentId)) e.studentId = 'Alphanumeric, min 3 characters.';
    if(!(Number(form.year)>=1 && Number(form.year)<=5)) e.year = 'Year must be between 1 and 5.';
    if(!form.college) e.college = 'College is required.';
    setErrors(e);
    return Object.keys(e).length===0;
  }

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault();
    if(!validate()) return;
    setSaving(true);
    await new Promise(r=>setTimeout(r, 1000));
    onSuccess();
  }

  const field = (id:string,label:string, input:React.ReactNode, err?:string)=> (
    <div className="space-y-1">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">{label}</label>
      {input}
      {err && <p className="text-xs text-rose-600" role="alert">{err}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="mt-4 grid gap-4" aria-labelledby="student-form-heading">
      <h3 id="student-form-heading" className="sr-only">Student Profile Form</h3>
      {field('name','Name', <input id="name" aria-invalid={Boolean(errors.name)} value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="input" required /> , errors.name)}
      {field('email','Email', <input id="email" aria-invalid={Boolean(errors.email)} value={form.email} readOnly className="input bg-slate-50" /> , errors.email)}
      {field('phoneno','Phone (optional)', <input id="phoneno" value={form.phoneno} onChange={e=>setForm({...form,phoneno:e.target.value})} className="input" /> )}
      {field('studentId','Student ID', <input id="studentId" aria-invalid={Boolean(errors.studentId)} value={form.studentId} onChange={e=>setForm({...form,studentId:e.target.value})} className="input" required /> , errors.studentId)}
      <div className="grid gap-4 sm:grid-cols-2">
        {field('trade','Trade', (
          <select id="trade" value={form.trade} onChange={e=>setForm({...form,trade:e.target.value})} className="input">
            {['CSE','ECE','MECH','CIVIL','IT','OTHER'].map(t=>(<option key={t} value={t}>{t}</option>))}
          </select>
        ))}
        {field('year','Year (1–5)', <input id="year" type="number" min={1} max={5} aria-invalid={Boolean(errors.year)} value={form.year} onChange={e=>setForm({...form,year:Number(e.target.value)})} className="input" required />, errors.year)}
      </div>
      {field('college','College', <input id="college" aria-invalid={Boolean(errors.college)} value={form.college} onChange={e=>setForm({...form,college:e.target.value})} className="input" required />, errors.college)}
      <div className="grid gap-4 sm:grid-cols-2">
        {field('rollNumber','Roll Number (optional)', <input id="rollNumber" value={form.rollNumber} onChange={e=>setForm({...form,rollNumber:e.target.value})} className="input" />)}
        {field('emergencyContact','Emergency Contact (optional)', <input id="emergencyContact" value={form.emergencyContact} onChange={e=>setForm({...form,emergencyContact:e.target.value})} className="input" />)}
      </div>

      <div className="mt-2 flex flex-wrap gap-3">
        <button type="submit" disabled={saving} className="btn-primary">{saving? 'Saving…' : 'Save & Continue'}</button>
        <button type="button" className="btn-secondary" onClick={()=>setSkipped(true)} aria-pressed={skipped}>Skip for now</button>
      </div>
    </form>
  );
}