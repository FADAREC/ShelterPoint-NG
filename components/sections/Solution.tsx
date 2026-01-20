import Card from '@/components/ui/Card';

const features = [
  {
    title: 'Verified owners',
    description: 'Every property owner is verified through BVN, NIN, and property documentation before listing.',
  },
  {
    title: '14-day guarantee',
    description: 'From first contact to move-in within two weeks, or receive a full refund of platform fees.',
  },
  {
    title: 'Transparent pricing',
    description: 'See area-based pricing data and comparable properties before you message an owner.',
  },
  {
    title: '7% platform fee',
    description: 'Single transparent fee. No hidden charges, no surprise costs during the process.',
  },
];

export default function Solution() {
  return (
    <section className="py-10 bg-brand-primary">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h2 className="text-heading-h2 text-white mb-3">
            A direct connection between owners and seekers
          </h2>
          <p className="text-body-large text-white opacity-90">
            ShelterPoint verifies all parties and provides transparent pricing to facilitate faster, safer transactions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              variant="bordered" 
              className="p-6 bg-white bg-opacity-10 backdrop-blur-sm border-white border-opacity-20"
            >
              <h3 className="text-heading-h4 text-white mb-2">
                {feature.title}
              </h3>
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