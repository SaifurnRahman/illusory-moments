import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import team from '../data/team.json';
import { inView, onImgError } from '../lib';

export default function Team() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-32">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <h1 className="font-display text-4xl font-bold leading-snug md:text-5xl">আমাদের টিম</h1>
        <span className="mx-auto my-4 block h-px w-16 bg-gold" />
        <p className="text-white/60">একদল স্বপ্নদ্রষ্টা, যাদের লক্ষ্য একটাই—আপনার হাসির পেছনের গল্পটুকু ধরে রাখা।</p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((m, i) => (
          <motion.article key={m.name} {...inView} transition={{ delay: (i % 3) * 0.1 }} className="group">
            <div className="relative overflow-hidden border border-gold/30">
              <img src={m.image} alt={m.name} loading="lazy" onError={onImgError} className="aspect-[4/5] w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent" />
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold">{m.name}</h3>
            <p className="text-gold">{m.role}</p>
            <p className="mt-2 text-white/60">{m.bio}</p>
          </motion.article>
        ))}
      </div>
      <div className="mt-20 text-center">
        <p className="mb-5 text-white/70">আপনার বিশেষ দিনের জন্য আমাদের টিমকে চান?</p>
        <Link to="/booking" className="btn-gold">ডেট বুক করুন</Link>
      </div>
    </div>
  );
}
