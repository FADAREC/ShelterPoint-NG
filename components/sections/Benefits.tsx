import Card from '@/components/ui/Card';

const seekerBenefits = [
  {
    title: 'Almost 50% off first transaction',
    description: 'Early members pay 4% instead of 7% on their first rental agreement.',
  },
  {
    title: 'Priority notifications',
    description: `Receive property alerts 24 hours before they're visible to general members.`,
  },
  {
    title: 'Lifetime early pricing',
    description: `Future fee increases won't apply to accounts created during the beta period.`,
  },
];

const ownerBenefits = [
  {
    title: 'Three properties for one fee',
    description: 'List up to three properties during your first month at the single-property rate.',
  },
  {
    title: 'Featured placement',
    description: 'Properties listed during beta receive prominent placement for 45 days.',
  },
];

export default function Benefits() {
  return (
    <section className="py-10 bg-neutral-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-heading-h2 text-neutral-900 mb-3">
            Early member benefits
          </h2>
          <p className="text-body-large text-neutral-700">
            Joining the waitlist secures several permanent advantages.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card variant="elevated" className="p-6">
            <h3 className="text-heading-h3 text-neutral-900 mb-4">For property seekers</h3>
            <ul className="space-y-4">
              {seekerBenefits.map((benefit, index) => (
                <li key={index}>
                  <h4 className="text-body-base font-medium text-neutral-900 mb-1">
                    {benefit.title}
                  </h4>
                  <p className="text-body-small text-neutral-700">
                    {benefit.description}
                  </p>
                </li>
              ))}
            </ul>
          </Card>

          <Card variant="elevated" className="p-6">
            <h3 className="text-heading-h3 text-neutral-900 mb-4">For property owners</h3>
            <ul className="space-y-4">
              {ownerBenefits.map((benefit, index) => (
                <li key={index}>
                  <h4 className="text-body-base font-medium text-neutral-900 mb-1">
                    {benefit.title}
                  </h4>
                  <p className="text-body-small text-neutral-700">
                    {benefit.description}
                  </p>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}