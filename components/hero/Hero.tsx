import HeroStats from './HeroStats';
import HeroForm from './HeroForm';

export default function Hero() {
  return (
    <section className="relative bg-brand-primary">
      <div className="absolute inset-0 bg-neutral-900 opacity-5" aria-hidden="true" />
      
      <div className="relative max-w-6xl mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded">
            <div className="w-2 h-2 rounded-full bg-semantic-success" aria-hidden="true" />
            <span className="text-body-small font-medium text-neutral-900">
              Lagos' First Direct Owner-Seeker Platform
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-heading-h1 text-white">
            Find verified Lagos housing without the delays and uncertainty
          </h1>
          
          {/* Subheading */}
          <p className="text-body-large text-white opacity-90 max-w-2xl mx-auto">
            Connect directly with property owners through a verified platform. Transparent pricing, verified listings, and a guaranteed 14-day move-in timeline.
          </p>

          {/* Stats */}
          <HeroStats />
        </div>
        
        {/* Form */}
        <div className="mt-8">
          <HeroForm />
        </div>
      </div>
    </section>
  );
}