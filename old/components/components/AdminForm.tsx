'use client';
import React, { useState } from 'react';

export default function AdminForm({ user, onSuccess }: { user:any; onSuccess: ()=>void }){
  const [form, setForm] = useState({
    name: user.name || '',
    email: user.email || '',
    adminId: '',
    department: '',
    apply: false,
  });
  const [errors, setErrors] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [appStatus, setAppStatus] = useState<'NONE'|'PENDING'>('NONE');

  function validate(){
    const e:any = {};
    if(!form.name) e.name = 'Name is required.';
    if(!form.email) e.email = 'Email is required.';
    if(!form.adminId) e.adminId = 'Admin ID is required.';
    setErrors(e);
    return Object.keys(e).length===0;
  }

  async function handleSave(e: React.FormEvent){
    e.preventDefault();
    if(!validate()) return;
    setSaving(true);
    await new Promise(r=>setTimeout(r, 1000));
    onSuccess();
  }

  async function confirmApply(){
    setShowModal(false);
    // simulate application creation
    await new Promise(r=>setTimeout(r, 800));
    setAppStatus('PENDING');
  }

  const field = (id:string,label:string, input:React.ReactNode, err?:string)=> (
    <div className="space-y-1">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">{label}</label>
      {input}
      {err && <p className="text-xs text-rose-600" role="alert">{err}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSave} className="mt-4 grid gap-4" aria-labelledby="admin-form-heading">
      <h3 id="admin-form-heading" className="sr-only">Admin Profile Form</h3>
      {field('name','Name', <input id="name" aria-invalid={Boolean(errors.name)} value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="input" required />, errors.name)}
      {field('email','Email', <input id="email" aria-invalid={Boolean(errors.email)} value={form.email} readOnly className="input bg-slate-50" />, errors.email)}
      {field('adminId','Admin ID', <input id="adminId" aria-invalid={Boolean(errors.adminId)} value={form.adminId} onChange={e=>setForm({...form,adminId:e.target.value})} className="input" required />, errors.adminId)}
      {field('department','Department', <input id="department" value={form.department} onChange={e=>setForm({...form,department:e.target.value})} className="input" />)}

      <div className="flex items-center gap-2">
        <input id="apply" type="checkbox" checked={form.apply} onChange={e=>setForm({...form,apply:e.target.checked})} className="h-4 w-4 rounded border-slate-300" />
        <label htmlFor="apply" className="text-sm">Apply for admin privileges</label>
      </div>

      <div className="mt-2 flex flex-wrap gap-3">
        <button type="submit" disabled={saving} className="btn-primary">{saving? 'Saving…' : 'Save Profile'}</button>
        <button type="button" className="btn-secondary" onClick={()=>setShowModal(true)} disabled={!form.apply}>Apply for Admin</button>
      </div>

      {appStatus==='PENDING' && (
        <div className="mt-4 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-amber-900">
          <p className="font-medium">Admin Application</p>
          <p className="text-sm">Status: <span className="font-semibold">PENDING</span></p>
        </div>
      )}

      {showModal && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-slate-900 shadow-xl">
            <h4 className="text-lg font-semibold">Confirm application</h4>
            <p className="mt-2 text-sm">This will submit an admin application to Superadmin.</p>
            <div className="mt-5 flex justify-end gap-3">
              <button className="btn-secondary" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={confirmApply}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
