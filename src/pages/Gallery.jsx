import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import gallery from '../data/gallery.json';
import Lightbox from '../components/Lightbox';
import { bn, onImgError } from '../lib';

const ratio = { portrait: 'aspect-[3/4]', landscape: 'aspect-[4/3]', square: 'aspect-square' };
const STEP = 9;

export default function Gallery() {
  const [cat, setCat] = useState('all');
  const [shown, setShown] = useState(STEP);
  const [open, setOpen] = useState(null);
  const list = useMemo(() => gallery.items.filter((i) => cat === 'all' || i.category === cat), [cat]);
  const visible = list.slice(0, shown);

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-32">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h1 className="font-display text-4xl font-bold leading-snug md:text-5xl">আমাদের গ্যালারি</h1>
        <span className="mx-auto my-4 block h-px w-16 bg-gold" />
        <p className="text-white/60">প্রতিটি ফ্রেমে একেকটি গল্প। ছবি বা ভিডিওতে ক্লিক করে বড় করে দেখুন।</p>
      </div>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {gallery.categories.map((c) => (
          <button key={c.id} onClick={() => { setCat(c.id); setShown(STEP); }}
            className={`relative px-5 py-2 transition ${cat === c.id ? 'text-black' : 'text-white/80 hover:text-gold'}`}>
            {cat === c.id && <motion.span layoutId="gal-pill" className="absolute inset-0 bg-gold" />}
            <span className="relative">{c.label}</span>
          </button>
        ))}
      </div>
      <motion.div key={cat} className="columns-1 gap-4 sm:columns-2 lg:columns-3" initial="h" animate="s" variants={{ s: { transition: { staggerChildren: 0.06 } } }}>
        {visible.map((it, i) => (
          <motion.button key={it.id} variants={{ h: { opacity: 0, y: 24 }, s: { opacity: 1, y: 0 } }} onClick={() => setOpen(i)} aria-label={it.title}
            className="group relative mb-4 block w-full break-inside-avoid overflow-hidden border border-gold/20 text-left">
            <img src={it.thumb || it.src} alt={it.title} loading="lazy" onError={onImgError} className={`w-full object-cover transition duration-700 group-hover:scale-105 ${ratio[it.aspect] || ratio.landscape}`} />
            {it.type === 'video' && <FaPlay className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-gold drop-shadow" />}
            <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/90 to-transparent p-4 transition duration-300 group-hover:translate-y-0">
              <h3 className="font-display font-semibold text-gold">{it.title}</h3>
              <p className="text-sm text-white/70">{it.subtitle}</p>
            </div>
          </motion.button>
        ))}
      </motion.div>
      {list.length === 0 && <p className="py-16 text-center text-white/50">এই ক্যাটাগরিতে এখনো কোনো কাজ যোগ করা হয়নি।</p>}
      {shown < list.length && (
        <div className="mt-8 text-center">
          <button className="btn-outline" onClick={() => setShown(shown + STEP)}>আরও দেখুন ({bn(list.length - shown)}টি বাকি)</button>
        </div>
      )}
      <AnimatePresence>{open !== null && <Lightbox items={visible} index={open} onClose={() => setOpen(null)} onChange={setOpen} />}</AnimatePresence>
    </div>
  );
}
