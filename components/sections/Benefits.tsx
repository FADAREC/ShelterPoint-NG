import Card from '@/components/ui/Card';

const seekerBenefits = [
  {
    title: '4% instead of 7% on your first rental',
    description:
      'Founding members pay the preferred rate on their first agreement when verified homes go live.',
  },
  {
    title: 'Priority access',
    description:
      'Founding members are notified first when listings in their area open.',
  },
  {
    title: 'Inspection credits from referrals',
    description:
      'Invite friends who join. Earn free inspection credits when they complete signup.',
  },
];

const ownerBenefits = [
  {
    title: 'Demand data by area',
    description:
      'See where seekers are looking and at what budgets, before you list.',
  },
  {
    title: 'Clear fee disclosure',
    description:
      'Registered agents can list with fees disclosed and capped. Complementary to good agents, not anti-agent.',
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
            Join the waitlist for founding terms. Use ShelterCheck free today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card variant="elevated" className="p-6">
            <h3 className="text-heading-h3 text-neutral-900 mb-4">
              For property seekers
            </h3>
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
            <h3 className="text-heading-h3 text-neutral-900 mb-4">
              For property owners
            </h3>
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
