const steps = [
  {
    number: 1,
    title: 'Join the waitlist',
    description: `Submit your information above. We'll notify you when platform access becomes available.`,
  },
  {
    number: 2,
    title: 'Browse verified listings',
    description: 'View property details, pricing comparisons, and owner verification status.',
  },
  {
    number: 3,
    title: 'Move in within 14 days',
    description: 'Connect with owners, arrange viewings, and complete paperwork within our guaranteed timeline.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-10 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h2 className="text-heading-h2 text-neutral-900 mb-3">
            How the platform works
          </h2>
          <p className="text-body-large text-neutral-700">
            A streamlined process from initial search to moving in.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary text-white font-bold text-heading-h3 mb-4">
                {step.number}
              </div>
              <h3 className="text-heading-h4 text-neutral-900 mb-2">
                {step.title}
              </h3>
              <p className="text-body-base text-neutral-700">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}