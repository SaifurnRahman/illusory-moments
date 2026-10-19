import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import { inView } from '../lib';

export default function PackageCard({ pkg }) {
  return (
    <motion.div
      {...inView}
      className={`relative flex flex-col p-8 ${
        pkg.featured ? 'border-2 border-gold bg-ink-700 md:-translate-y-4' : 'border border-gold/20 bg-ink-800'
      }`}
    >
      {pkg.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold px-4 py-0.5 text-sm font-semibold text-black">
          {pkg.badge}
        </span>
      )}
      <h3 className="font-display text-xl font-semibold text-gold">{pkg.name}</h3>
      <p className="my-4 font-display text-4xl font-bold">{pkg.price}</p>
      <ul className="mb-8 flex-1 space-y-3">
        {pkg.features.map((f) => (
          <li key={f} className="flex gap-3 text-white/75">
            <FaCheck className="mt-2 shrink-0 text-xs text-gold" /> {f}
          </li>
        ))}
      </ul>
      <Link to={`/booking?package=${pkg.id}`} className={pkg.featured ? 'btn-gold' : 'btn-outline'}>
        বুকিং করুন
      </Link>
    </motion.div>
  );
}
