const steps = [
  {
    number: 1,
    title: 'Run ShelterCheck',
    description:
      'Enter the rent quote you were given. See day-one cash and fees before you pay anyone.',
  },
  {
    number: 2,
    title: 'Join the waitlist',
    description:
      'Get founding access, preferred rate, and referral inspection credits when verified homes open.',
  },
  {
    number: 3,
    title: 'Move when supply is real',
    description:
      'Listings go live only after identity and document checks. Full checklist published before launch.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-10 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h2 className="text-heading-h2 text-neutral-900 mb-3">
            How it works today
          </h2>
          <p className="text-body-large text-neutral-700">
            Value first from the tool. Waitlist for when verified supply is ready.
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
              <p className="text-body-base text-neutral-700">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
