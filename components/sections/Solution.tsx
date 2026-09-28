import Card from '@/components/ui/Card';

const features = [
  {
    title: 'See the true move-in cost',
    description:
      'ShelterCheck shows day-one cash and fees you likely will not get back, before you pay an agent or landlord.',
  },
  {
    title: 'Checks before you pay',
    description:
      'Before a listing goes live, we check the owner identity and documents. Full checklist published before launch.',
  },
  {
    title: 'Reported rent data',
    description:
      'Area medians from what renters actually paid, once enough reports land. Labeled as reported, not verified.',
  },
  {
    title: 'Founding member rate',
    description:
      '4% instead of 7% on your first rental when verified homes go live. Priority access for waitlist members.',
  },
];

export default function Solution() {
  return (
    <section className="py-10 bg-brand-primary">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h2 className="text-heading-h2 text-white mb-3">
            Tools for the moment before the money moves
          </h2>
          <p className="text-body-large text-white opacity-90">
            ShelterPoint helps you check cost, signal demand, and join early for
            verified homes. No inventory required to get value today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              variant="bordered"
              className="p-6 bg-white bg-opacity-10 backdrop-blur-sm border-white border-opacity-20"
            >
              <h3 className="text-heading-h4 text-white mb-2">{feature.title}</h3>
              <p className="text-body-base text-white opacity-90">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
