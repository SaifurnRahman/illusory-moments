import { motion } from 'framer-motion';
import { inView } from '../lib';

export default function Heading({ title, sub }) {
  return (
    <motion.div {...inView} className="mx-auto mb-14 max-w-2xl text-center">
      <h2 className="font-display text-3xl font-bold leading-snug md:text-4xl">{title}</h2>
      <span className="mx-auto my-4 block h-px w-16 bg-gold" />
      {sub && <p className="text-white/60">{sub}</p>}
    </motion.div>
  );
}
