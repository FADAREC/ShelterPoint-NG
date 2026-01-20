import { Shield, MapPin, CheckCircle, Users } from 'lucide-react';

const badges = [
  { icon: Shield, text: 'NDPR Compliant', color: 'text-green-600' },
  { icon: MapPin, text: 'Lagos Registered', color: 'text-blue-600' },
  { icon: CheckCircle, text: 'Bank-Grade Security', color: 'text-green-600' },
  { icon: Users, text: 'Built by Lagosians', color: 'text-blue-600' },
];

export default function TrustBadges() {
  return (
    <section className="bg-gray-100 py-12" aria-label="Trust and security badges">
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