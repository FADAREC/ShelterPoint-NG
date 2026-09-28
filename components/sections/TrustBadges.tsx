import { MapPin, Calculator, Users, Shield } from 'lucide-react';

const badges = [
  { icon: Calculator, text: 'Free cost check', color: 'text-neutral-800' },
  { icon: MapPin, text: 'Built for Lagos', color: 'text-neutral-800' },
  { icon: Users, text: 'Founding waitlist', color: 'text-neutral-800' },
  { icon: Shield, text: 'Checks before launch', color: 'text-neutral-800' },
];

export default function TrustBadges() {
  return (
    <section className="bg-gray-100 py-12" aria-label="Product focus">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-8 text-gray-600">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div key={index} className="flex items-center gap-2">
                <Icon className={`w-6 h-6 ${badge.color}`} aria-hidden="true" />
                <span className="font-semibold">{badge.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
