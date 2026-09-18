'use client';

export default function FinalCTA() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-24 sm:py-32 bg-black">
      <div className="max-w-xl mx-auto px-5 text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-[-0.02em] leading-tight">
          Join before founding spots close
        </h2>
        <p className="mt-5 text-[17px] text-white/45 leading-relaxed">
          Priority access. Preferred rate. First look at verified listings.
        </p>
        <button
          onClick={scrollToTop}
          className="mt-10 h-12 px-8 rounded-full bg-white text-black text-[15px] font-medium hover:bg-white/90 active:scale-[0.98] transition-all"
        >
          Get access
        </button>
      </div>
    </section>
  );
}
