import { Link } from 'react-router-dom';
import packages from '../data/packages.json';
import PackageCard from '../components/PackageCard';

export default function Packages() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-32">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <h1 className="font-display text-4xl font-bold leading-snug md:text-5xl">আমাদের প্যাকেজ</h1>
        <span className="mx-auto my-4 block h-px w-16 bg-gold" />
        <p className="text-white/60">আপনার বাজেট ও প্রয়োজন অনুযায়ী সেরা প্যাকেজটি বেছে নিন।</p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">{packages.map((p) => <PackageCard key={p.id} pkg={p} />)}</div>
      <p className="mt-14 text-center text-white/60">
        নিজের মতো করে চান? <Link to="/booking?package=custom" className="text-gold underline underline-offset-4">কাস্টম প্যাকেজের জন্য জানান</Link>
      </p>
    </div>
  );
}
