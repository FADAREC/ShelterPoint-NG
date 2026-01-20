import Card from '@/components/ui/Card';

const problems = [
  {
    title: 'Months of searching',
    description: `Property hunting in Lagos often takes 3-6 months of weekend viewings, wasted commutes, and properties that don't match their descriptions.`,
  },
  {
    title: 'Unclear pricing',
    description: `Agency fees, legal fees, agreement fees, and processing fees can add 25% or more to the advertised rent with no advance notice.`,
  },
  {
    title: 'Verification concerns',
    description: 'Fake listings, unavailable landlords, and surprise lease issues make it difficult to trust the process.',
  },
];

export default function Problem() {
  return (
    <section className="py-10 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h2 className="text-heading-h2 text-neutral-900 mb-3">
            Finding housing in Lagos is unnecessarily difficult
          </h2>
          <p className="text-body-large text-neutral-700">
            These are the most common challenges reported by renters and property owners.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <Card key={index} variant="bordered" className="p-6">
              <h3 className="text-heading-h4 text-neutral-900 mb-2">
                {problem.title}
              </h3>
              <p className="text-body-base text-neutral-700 leading-relaxed">
                {problem.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}