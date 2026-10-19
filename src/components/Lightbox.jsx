import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { bn, parseVideo } from '../lib';

export default function Lightbox({ items, index, onClose, onChange }) {
  const item = items[index];
  const n = items.length;
  const go = (d) => onChange((index + d + n) % n);

  useEffect(() => {
    const key = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', key);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', key);
      document.body.style.overflow = '';
    };
  });

  const video = item.type === 'video' ? parseVideo(item.videoUrl) : null;
  const btn = 'absolute z-10 grid h-11 w-11 place-items-center rounded-full border border-gold/40 bg-black/60 text-gold transition hover:bg-gold hover:text-black';

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose} role="dialog" aria-modal="true" aria-label={item.title}
    >
      <button className={`${btn} right-4 top-4`} onClick={onClose} aria-label="বন্ধ করুন"><FaTimes /></button>
      {n > 1 && (
        <>
          <button className={`${btn} left-3 top-1/2`} onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="আগের"><FaChevronLeft /></button>
          <button className={`${btn} right-3 top-1/2`} onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="পরের"><FaChevronRight /></button>
        </>
      )}
      <motion.div
        key={item.id} className="flex max-h-[80vh] w-full max-w-5xl justify-center"
        initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        drag={video ? false : 'x'} dragSnapToOrigin
        onDragEnd={(_, i) => { if (i.offset.x < -80) go(1); else if (i.offset.x > 80) go(-1); }}
      >
        {!video && <img src={item.src} alt={item.title} className="max-h-[80vh] max-w-full select-none object-contain" draggable="false" />}
        {video && !video.file && (
          <iframe src={video.src} title={item.title} className="aspect-video w-full" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
        )}
        {video && video.file && <video src={video.src} controls autoPlay className="max-h-[80vh] w-full" />}
      </motion.div>
      <div className="mt-4 text-center" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-display text-lg text-gold">{item.title}</h3>
        <p className="text-sm text-white/60">{item.subtitle} · {bn(index + 1)}/{bn(n)}</p>
      </div>
    </motion.div>
  );
}
