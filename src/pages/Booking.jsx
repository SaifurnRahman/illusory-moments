import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import site from '../data/site.json';
import packages from '../data/packages.json';
import { waLink } from '../lib';

const toEn = (s) => s.replace(/[০-৯]/g, (d) => '০১২৩৪৫৬৭৮৯'.indexOf(d));
const phoneOk = (v) => /^(?:\+?88)?01[3-9]\d{8}$/.test(toEn(v).replace(/[\s-]/g, ''));
const steps = ['ফর্ম পূরণ করে হোয়াটসঅ্যাপে মেসেজ পাঠান', 'আমরা তারিখ ও প্যাকেজ নিশ্চিত করে আপনাকে জানাব', 'অগ্রিম দিয়ে আপনার ডেট বুক সম্পন্ন করুন'];

const Field = ({ label, k, err, children }) => (
  <label className="block">
    <span className="mb-1 block text-sm text-white/70">{label}</span>
    {children}
    {err[k] && <span className="mt-1 block text-sm text-red-400">{err[k]}</span>}
  </label>
);

export default function Booking() {
  const [params] = useSearchParams();
  const pre = params.get('package');
  const [f, setF] = useState({
    name: '', phone: '', date: '', type: site.booking.eventTypes[0],
    pkg: packages.find((p) => p.id === pre)?.name || (pre === 'custom' ? 'custom' : packages[1].name),
    location: '', details: '',
  });
  const [err, setErr] = useState({});
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const today = new Date().toISOString().split('T')[0];

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (f.name.trim().length < 2) er.name = 'আপনার নাম লিখুন';
    if (!phoneOk(f.phone)) er.phone = 'সঠিক মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)';
    if (!f.date) er.date = 'ইভেন্টের তারিখ বেছে নিন';
    if (f.location.trim().length < 2) er.location = 'ভ্যানু বা লোকেশন লিখুন';
    setErr(er);
    if (Object.keys(er).length) return;
    const date = new Date(f.date).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' });
    const pkg = f.pkg === 'custom' ? site.booking.customPackageLabel : f.pkg;
    const msg = `*নতুন বুকিং অনুরোধ - ILLUSORY MOMENTS*\n\n*নাম:* ${f.name}\n*ফোন:* ${f.phone}\n*তারিখ:* ${date}\n*ইভেন্ট:* ${f.type}\n*প্যাকেজ:* ${pkg}\n*লোকেশন:* ${f.location}\n*মেসেজ:* ${f.details || '—'}`;
    window.open(waLink(site.contact.whatsapp, msg), '_blank');
  };

  const c = site.contact;

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-32">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <h1 className="font-display text-4xl font-bold leading-snug md:text-5xl">আপনার ডেট বুক করুন</h1>
        <span className="mx-auto my-4 block h-px w-16 bg-gold" />
        <p className="text-white/60">ইভেন্টের তারিখ আগে থেকে নিশ্চিত করতে নিচের ফর্মটি পূরণ করুন।</p>
      </div>
      <div className="grid gap-12 lg:grid-cols-[3fr_2fr]">
        <form onSubmit={submit} noValidate className="grid gap-5 border border-gold/20 bg-ink-900 p-6 sm:grid-cols-2 sm:p-8">
          <Field err={err} label="আপনার নাম" k="name"><input className="field" value={f.name} onChange={set('name')} placeholder="যেমন: মো: আরিফুল ইসলাম" /></Field>
          <Field err={err} label="মোবাইল নম্বর" k="phone"><input className="field" type="tel" inputMode="tel" value={f.phone} onChange={set('phone')} placeholder="017XXXXXXXX" /></Field>
          <Field err={err} label="ইভেন্টের তারিখ" k="date"><input className="field" type="date" min={today} value={f.date} onChange={set('date')} /></Field>
          <Field err={err} label="ইভেন্টের ধরন" k="type">
            <select className="field" value={f.type} onChange={set('type')}>{site.booking.eventTypes.map((t) => <option key={t}>{t}</option>)}</select>
          </Field>
          <Field err={err} label="পছন্দের প্যাকেজ" k="pkg">
            <select className="field" value={f.pkg} onChange={set('pkg')}>
              {packages.map((p) => <option key={p.id} value={p.name}>{p.name} ({p.price})</option>)}
              <option value="custom">{site.booking.customPackageLabel}</option>
            </select>
          </Field>
          <Field err={err} label="ভ্যানু / লোকেশন" k="location"><input className="field" value={f.location} onChange={set('location')} placeholder="যেমন: সেনাকুঞ্জ, ঢাকা" /></Field>
          <div className="sm:col-span-2">
            <Field err={err} label="অতিরিক্ত তথ্য (যদি থাকে)" k="details"><textarea className="field" rows={4} value={f.details} onChange={set('details')} placeholder="আপনার ইভেন্ট সংক্রান্ত বিশেষ কোনো চাওয়া..." /></Field>
          </div>
          <button type="submit" className="btn-gold sm:col-span-2"><FaWhatsapp className="text-xl" /> হোয়াটসঅ্যাপে বুকিং মেসেজ পাঠান</button>
        </form>
        <aside className="space-y-10">
          <div>
            <h2 className="mb-4 font-display text-xl text-gold">বুকিং যেভাবে হয়</h2>
            <ol className="space-y-4">
              {steps.map((s, i) => (
                <li key={s} className="flex gap-4"><span className="grid h-8 w-8 shrink-0 place-items-center border border-gold font-display text-gold">{['১', '২', '৩'][i]}</span><span className="text-white/75">{s}</span></li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="mb-4 font-display text-xl text-gold">সরাসরি যোগাযোগ</h2>
            <ul className="space-y-3 text-white/75">
              <li className="flex items-center gap-3"><FaPhoneAlt className="text-gold" /><a href={`tel:${c.phone}`}>{c.phoneDisplay}</a></li>
              <li className="flex items-center gap-3"><FaEnvelope className="text-gold" /><a href={`mailto:${c.email}`}>{c.email}</a></li>
              <li className="flex items-center gap-3"><FaMapMarkerAlt className="text-gold" />{c.address}</li>
              <li className="flex items-center gap-3"><FaClock className="text-gold" />{c.hours}</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
