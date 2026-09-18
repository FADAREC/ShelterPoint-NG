import HeroForm from './HeroForm';

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] bg-black flex flex-col">
      {/* Top bar */}
      <div className="w-full border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-5 h-12 flex items-center justify-between">
          <span className="text-[13px] font-medium tracking-tight text-white/90">
            ShelterPoint
          </span>
          <span className="text-[12px] text-white/40">
            Founding access
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-16 sm:py-20">
        <div className="w-full max-w-[640px] text-center">

          <p className="text-[13px] tracking-[0.12em] uppercase text-white/35 mb-6">
            Lagos · Private waitlist
          </p>

          <h1 className="text-[2.75rem] sm:text-[3.75rem] md:text-[4.25rem] font-semibold text-white leading-[1.05] tracking-[-0.03em]">
            Housing without<br className="hidden sm:block" /> the wahala
          </h1>

          <p className="mt-6 text-[17px] sm:text-[19px] text-white/50 leading-relaxed max-w-md mx-auto font-normal">
            Verified homes. Transparent fees. Founding members get priority and the preferred rate.
          </p>

          {/* Form */}
          <div className="mt-10 sm:mt-12">
            <HeroForm />
          </div>

          {/* Quiet social proof */}
          <p className="mt-8 text-[13px] text-white/30">
            <span className="text-white/50">498</span> founding spots remaining
          </p>
        </div>
      </div>
    </section>
  );
}
