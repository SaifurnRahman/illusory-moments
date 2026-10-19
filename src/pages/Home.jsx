import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, animate, motion, useInView } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaPhoneAlt, FaPlay, FaQuoteLeft, FaStar, FaWhatsapp } from 'react-icons/fa';
import site from '../data/site.json';
import gallery from '../data/gallery.json';
import photographer from '../data/photographer.json';
import packages from '../data/packages.json';
import testimonials from '../data/testimonials.json';
import Heading from '../components/Heading';
import Lightbox from '../components/Lightbox';
import PackageCard from '../components/PackageCard';
import { bn, inView, onImgError, waLink } from '../lib';

/* ---------- Hero: the one orchestrated moment ---------- */
function Hero() {
  const h = site.hero;
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <motion.img src={h.image} alt="" onError={onImgError} className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 14, ease: 'linear' }} />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/30" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />
      {/* slowly turning aperture from the logo */}
      <div className="pointer-events-none absolute right-[-120px] top-1/2 hidden -translate-y-1/2 md:block">
        <motion.img src={site.brand.icon} alt="" className="w-[560px] opacity-[0.14]" animate={{ rotate: 360 }} transition={{ duration: 90, repeat: Infinity, ease: 'linear' }} />
      </div>
      <div className="relative mx-auto w-full max-w-7xl px-6 pt-24">
        <h1 className="font-display text-4xl font-bold leading-[1.5] sm:text-5xl md:text-6xl">
          {h.headline.map((line, i) => (
            <span key={i} className="block overflow-hidden py-1">
              <motion.span className={`block ${i === 1 ? 'text-gold' : ''}`} initial={{ y: '115%' }} animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}>{line}</motion.span>
            </span>
          ))}
        </h1>
        <motion.span className="my-6 block h-px bg-gold" initial={{ width: 0 }} animate={{ width: 120 }} transition={{ delay: 0.8, duration: 0.8 }} />
        <motion.p className="max-w-xl text-lg text-white/75" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.7 }}>{h.subtitle}</motion.p>
        <motion.div className="mt-8 flex flex-wrap gap-4" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.7 }}>
          <Link to="/gallery" className="btn-outline">পূর্বের কাজ দেখুন</Link>
          <Link to="/booking" className="btn-gold">ডেট বুক করুন</Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Stats ---------- */
function Counter({ to, suffix }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const c = animate(0, to, { duration: 2, ease: 'easeOut', onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [seen, to]);
  return <span ref={ref}>{bn(v)}{suffix}</span>;
}

function Stats() {
  return (
    <section className="border-y border-gold/20 bg-ink-900">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-6 py-10 md:grid-cols-4">
        {site.stats.map((s) => (
          <motion.div key={s.label} {...inView} className="text-center">
            <p className="font-display text-4xl font-bold text-gold"><Counter to={s.value} suffix={s.suffix} /></p>
            <p className="text-white/60">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Recent projects (items with "featured": true in gallery.json) ---------- */
function RecentProjects() {
  const items = gallery.items.filter((i) => i.featured).slice(0, 6);
  const [open, setOpen] = useState(null);
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <Heading title="আমাদের সাম্প্রতিক কাজ" sub="যেকোনো ছবি বা ভিডিওতে ক্লিক করে ফুল স্ক্রিনে দেখুন" />
      <div className="grid auto-rows-[260px] gap-3 md:grid-cols-3">
        {items.map((it, i) => (
          <motion.button key={it.id} {...inView} onClick={() => setOpen(i)} aria-label={it.title}
            className={`group relative overflow-hidden border border-gold/20 text-left ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
            <img src={it.thumb || it.src} alt={it.title} loading="lazy" onError={onImgError} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            {it.type === 'video' && <FaPlay className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-gold drop-shadow" />}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-5">
              <h3 className="font-display text-lg font-semibold">{it.title}</h3>
              <p className="text-sm text-white/60">{it.subtitle}</p>
            </div>
          </motion.button>
        ))}
      </div>
      <div className="mt-10 text-center"><Link to="/gallery" className="btn-outline">সম্পূর্ণ গ্যালারি দেখুন</Link></div>
      <AnimatePresence>{open !== null && <Lightbox items={items} index={open} onClose={() => setOpen(null)} onChange={setOpen} />}</AnimatePresence>
    </section>
  );
}

/* ---------- Photographer পরিচয় ---------- */
function PhotographerIntro() {
  const p = photographer;
  return (
    <section className="bg-ink-900 px-6 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <motion.div {...inView} className="relative mx-auto w-full max-w-md">
          <div className="absolute -bottom-4 -right-4 h-full w-full border border-gold/50" />
          <motion.img src={p.image} alt={p.name} onError={onImgError} className="relative aspect-square w-full border border-gold object-cover"
            initial={{ clipPath: 'inset(0 100% 0 0)' }} whileInView={{ clipPath: 'inset(0 0% 0 0)' }} viewport={{ once: true }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }} />
          <div className="absolute -left-4 bottom-8 bg-gold px-4 py-2 text-center text-black">
            <p className="font-display text-2xl font-bold leading-tight">{p.badge.number}</p>
            <p className="text-sm font-medium">{p.badge.label}</p>
          </div>
        </motion.div>
        <motion.div {...inView}>
          <h2 className="font-display text-3xl font-bold leading-snug md:text-4xl">ফটোগ্রাফার পরিচয়</h2>
          <span className="my-4 block h-px w-16 bg-gold" />
          <p className="text-white/70">{p.intro}</p>
          <blockquote className="my-6 border-l-2 border-gold pl-5 text-xl font-semibold leading-relaxed text-white/90">{p.quote}</blockquote>
          <p className="text-white/70">{p.outro}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {p.specialties.map((s) => <span key={s} className="border border-gold/40 px-3 py-1 text-sm text-gold-light">{s}</span>)}
          </div>
          <p className="mt-8 font-display text-lg text-gold">{p.name}</p>
          <p className="text-sm text-white/50">{p.role}</p>
          <Link to="/team" className="btn-outline mt-6">আমাদের টিমের সাথে পরিচিত হোন</Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Packages preview ---------- */
function PackagesPreview() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <Heading title="আমাদের প্যাকেজ" sub="আপনার বাজেট ও প্রয়োজন অনুযায়ী সেরা প্যাকেজটি বেছে নিন" />
      <div className="grid gap-8 md:grid-cols-3">{packages.map((p) => <PackageCard key={p.id} pkg={p} />)}</div>
    </section>
  );
}

/* ---------- Client feedback ---------- */
function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 7000);
    return () => clearInterval(t);
  }, [paused, n]);
  const t = testimonials[i];
  const arrow = 'grid h-11 w-11 place-items-center rounded-full border border-gold/50 text-gold transition hover:bg-gold hover:text-black';
  return (
    <section className="relative overflow-hidden bg-ink-900 px-6 py-24" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <FaQuoteLeft className="absolute right-[8%] top-16 text-7xl text-gold/20" />
      <Heading title="আমাদের ক্লায়েন্টদের মতামত" sub="যাঁদের বিশেষ দিনের গল্প আমরা ফ্রেমে ধরেছি" />
      <div className="mx-auto flex max-w-3xl items-center gap-4">
        <button className={`${arrow} hidden sm:grid`} onClick={() => setI((i - 1 + n) % n)} aria-label="আগের মতামত"><FaChevronLeft /></button>
        <div className="min-h-[300px] flex-1">
          <AnimatePresence mode="wait">
            <motion.figure key={i} className="text-center" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
              <img src={t.avatar} alt={t.name} onError={onImgError} className="mx-auto h-24 w-24 rounded-full border-2 border-gold object-cover grayscale" />
              <blockquote className="mx-auto mt-6 max-w-2xl text-lg leading-loose text-white/85">“{t.text}”</blockquote>
              <div className="mt-4 flex justify-center gap-1 text-gold">{Array.from({ length: t.rating }).map((_, k) => <FaStar key={k} />)}</div>
              <figcaption className="mt-3"><span className="font-semibold">{t.name}</span> <span className="text-sm text-white/50">— {t.role}</span></figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <button className={`${arrow} hidden sm:grid`} onClick={() => setI((i + 1) % n)} aria-label="পরের মতামত"><FaChevronRight /></button>
      </div>
      <div className="mt-6 flex justify-center gap-2">
        {testimonials.map((_, k) => (
          <button key={k} onClick={() => setI(k)} aria-label={`মতামত ${bn(k + 1)}`} className={`h-2 rounded-full transition-all ${k === i ? 'w-8 bg-gold' : 'w-2 bg-white/30'}`} />
        ))}
      </div>
    </section>
  );
}

/* ---------- Closing CTA ---------- */
function CTA() {
  const c = site.cta;
  return (
    <section className="relative overflow-hidden px-6 py-28 text-center">
      <img src={c.image} alt="" onError={onImgError} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/80" />
      <motion.div {...inView} className="relative mx-auto max-w-2xl">
        <h2 className="font-display text-3xl font-bold leading-snug md:text-4xl">{c.title}</h2>
        <p className="my-5 text-white/70">{c.text}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/booking" className="btn-gold">ডেট বুক করুন</Link>
          <a href={waLink(site.contact.whatsapp, 'হ্যালো, আমি বুকিং সম্পর্কে জানতে চাই।')} target="_blank" rel="noreferrer" className="btn-outline"><FaWhatsapp /> হোয়াটসঅ্যাপ</a>
          <a href={`tel:${site.contact.phone}`} className="btn-outline"><FaPhoneAlt /> কল করুন</a>
        </div>
      </motion.div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <RecentProjects />
      <PhotographerIntro />
      <PackagesPreview />
      <Testimonials />
      <CTA />
    </>
  );
}
