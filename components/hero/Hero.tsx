import HeroForm from './HeroForm';
import HeroStats from './HeroStats';

export default function Hero() {
  return (
    <section className="relative bg-[#0a0a0a] overflow-hidden">
      <div className="relative max-w-4xl mx-auto px-5 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="max-w-2xl mx-auto text-center space-y-8">

          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            <span className="text-xs font-medium tracking-wide text-white/80 uppercase">
              Founding member access
            </span>
          </div>

          <h1 className="text-[2.25rem] sm:text-5xl md:text-[3.5rem] font-semibold text-white leading-[1.1] tracking-tight">
            Verified Lagos homes for people who refuse agent wahala
          </h1>

          <p className="text-lg sm:text-xl text-white/60 max-w-xl mx-auto leading-relaxed font-normal">
            Private waitlist for Lagos professionals. Priority access. Founding member rates. Zero fake listings.
          </p>

          <p className="text-sm text-white/40">
            Only 500 founding spots. Preferred rate locked for early members.
          </p>

          <HeroStats />
        </div>

        <div className="mt-12 max-w-md mx-auto">
          <HeroForm />
        </div>

        <p className="mt-8 text-center text-xs text-white/30">
          NDPR compliant. No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
