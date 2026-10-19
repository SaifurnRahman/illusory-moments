export const bn = (n) => new Intl.NumberFormat('bn-BD').format(n);

// shared scroll-reveal props: <motion.div {...inView}>
export const inView = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, margin: '-80px' },
  variants: {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  },
};

export const waLink = (number, text) => `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

// broken image -> gold aperture placeholder
export const onImgError = (e) => {
  const el = e.currentTarget;
  el.onerror = null;
  el.src = '/icon.png';
  Object.assign(el.style, { objectFit: 'contain', padding: '18%', opacity: 0.3, background: '#111' });
};

// YouTube / Vimeo / mp4 -> something a lightbox can play
export function parseVideo(url = '') {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return { file: false, src: `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0` };
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return { file: false, src: `https://player.vimeo.com/video/${vm[1]}?autoplay=1` };
  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(url)) return { file: true, src: url };
  return { file: false, src: url };
}
