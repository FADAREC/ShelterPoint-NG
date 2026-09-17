import HeroForm from './HeroForm';
import HeroStats from './HeroStats';

export default function Hero() {
  return (
    <section className="relative bg-neutral-900 overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/20 via-transparent to-transparent" aria-hidden="true" />
      
      <div className="relative max-w-5xl mx-auto px-4 pt-12 pb-16 sm:pt-16 sm:pb-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          
          {/* Exclusive badge */}
          <div className="inline-flex items-center gap-2 bg-brand-primary/15 border border-brand-primary/30 px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" aria-hidden="true" />
            <span className="text-body-small font-medium text-brand-primary tracking-wide">
              FOUNDING MEMBER ACCESS
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
            Verified Lagos homes for people who refuse agent wahala
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Join the private waitlist for Lagos professionals. Priority access. Founding member rates. Zero fake listings.
          </p>

          {/* FOMO line */}
          <p className="text-sm text-brand-primary font-medium">
            Limited founding spots. Only 500 early members will lock the preferred rate.
          </p>

          {/* Stats */}
          <HeroStats />
        </div>
        
        {/* Email-first form */}
        <div className="mt-10 max-w-md mx-auto">
          <HeroForm />
        </div>

        {/* Trust line */}
        <p className="mt-6 text-center text-sm text-neutral-400">
          NDPR compliant. No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
