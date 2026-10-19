import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaTiktok, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import site from '../data/site.json';
import { waLink } from '../lib';

const icons = { facebook: FaFacebookF, instagram: FaInstagram, youtube: FaYoutube, tiktok: FaTiktok };

export default function Footer() {
  const c = site.contact;
  return (
    <>
      <a href={waLink(c.whatsapp, 'হ্যালো, আমি ILLUSORY MOMENTS সম্পর্কে জানতে চাই।')} target="_blank" rel="noreferrer" aria-label="হোয়াটসঅ্যাপ"
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-3xl text-white shadow-lg transition hover:scale-110">
        <FaWhatsapp />
      </a>
      <footer className="border-t border-gold/20 bg-ink-900 px-6 py-14">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          <div>
            <img src={site.brand.logo} alt="ILLUSORY MOMENTS" className="mb-4 h-10" />
            <p className="text-white/60">ওয়েডিং ও ইভেন্ট ফটোগ্রাফি এবং সিনেম্যাটোগ্রাফি, বাংলাদেশ।</p>
            <div className="mt-5 flex gap-3">
              {site.social.map((s) => { const I = icons[s.platform] || FaWhatsapp; return (
                <a key={s.platform} href={s.url} target="_blank" rel="noreferrer" aria-label={s.platform} className="grid h-10 w-10 place-items-center border border-gold/40 text-gold transition hover:bg-gold hover:text-black"><I /></a>
              ); })}
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-display text-gold">দ্রুত লিংক</h4>
            <ul className="space-y-2">{site.nav.map((l) => <li key={l.to}><Link to={l.to} className="text-white/70 hover:text-gold">{l.label}</Link></li>)}</ul>
          </div>
          <div>
            <h4 className="mb-4 font-display text-gold">যোগাযোগ</h4>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-center gap-3"><FaPhoneAlt className="text-gold" /> <a href={`tel:${c.phone}`}>{c.phoneDisplay}</a></li>
              <li className="flex items-center gap-3"><FaEnvelope className="text-gold" /> <a href={`mailto:${c.email}`}>{c.email}</a></li>
              <li className="flex items-center gap-3"><FaMapMarkerAlt className="text-gold" /> {c.address}</li>
            </ul>
          </div>
        </div>
        <p className="mt-12 text-center text-sm text-white/40">© {new Date().getFullYear()} ILLUSORY MOMENTS. সর্বস্বত্ব সংরক্ষিত।</p>
      </footer>
    </>
  );
}
