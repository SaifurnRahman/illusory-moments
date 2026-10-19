import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import site from '../data/site.json';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${scrolled || open ? 'border-b border-gold/20 bg-black/90 backdrop-blur' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link to="/" aria-label="ILLUSORY MOMENTS হোম"><img src={site.brand.logo} alt="ILLUSORY MOMENTS" className="h-8 sm:h-10" /></Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {site.nav.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => `relative py-1 transition hover:text-gold ${isActive ? 'text-gold' : 'text-white/80'}`}>
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && <motion.span layoutId="nav-line" className="absolute inset-x-0 -bottom-0.5 h-px bg-gold" />}
                </>
              )}
            </NavLink>
          ))}
          <Link to="/booking" className="btn-gold !py-2">ডেট বুক করুন</Link>
        </nav>
        <button className="text-2xl text-gold lg:hidden" onClick={() => setOpen(!open)} aria-label="মেনু">{open ? <FaTimes /> : <FaBars />}</button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden lg:hidden">
            <div className="flex flex-col gap-1 px-6 pb-6">
              {site.nav.map((l) => (
                <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => `border-b border-white/10 py-3 text-lg ${isActive ? 'text-gold' : ''}`}>{l.label}</NavLink>
              ))}
              <Link to="/booking" className="btn-gold mt-4">ডেট বুক করুন</Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
