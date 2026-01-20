const testimonials = [
  {
    initial: 'C',
    name: 'Chioma A.',
    role: 'Future Beta Member',
    location: 'Yaba',
    quote: `I spent 4 months viewing properties. Lekki, Ajah, VI—everywhere. Agents kept adding fees. I'm signing up immediately. This is what Lagos needs.`,
    gradient: 'from-blue-50 to-white',
    borderColor: 'border-blue-600',
    bgColor: 'bg-blue-600',
  },
  {
    initial: 'O',
    name: 'Olumide T.',
    role: 'Property Owner',
    location: 'Ikoyi',
    quote: `As a landlord, I'm tired of agents delaying payments. Direct connection with tenants? Free photos? Count me in. This changes everything.`,
    gradient: 'from-green-50 to-white',
    borderColor: 'border-green-600',
    bgColor: 'bg-green-600',
  },
  {
    initial: 'A',
    name: 'Aisha M.',
    role: 'Relocating to Lagos',
    location: 'Abuja',
    quote: 'Moving to Lagos from Abuja next month. House-hunting remotely is impossible. A verified platform with 2-week guarantee? Exactly what I need.',
    gradient: 'from-yellow-50 to-white',
    borderColor: 'border-yellow-600',
    bgColor: 'bg-yellow-600',
  },
];

export default function Testimonials() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16" aria-labelledby="testimonials-heading">
      <h2 id="testimonials-heading" className="text-3xl font-bold text-center text-gray-900 mb-12">
        Why Early Members Are Excited
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <article
            key={index}
            className={`bg-gradient-to-br ${testimonial.gradient} p-6 rounded-2xl border-l-4 ${testimonial.borderColor} shadow-lg`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 ${testimonial.bgColor} text-white rounded-full flex items-center justify-center font-bold text-lg`} aria-hidden="true">
                {testimonial.initial}
              </div>
              <div>
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600">
                  {testimonial.role} • {testimonial.location}
                </p>
              </div>
            </div>
            <blockquote className="text-gray-700 italic">
              "{testimonial.quote}"
            </blockquote>
          </article>
        ))}
      </div>
    </section>
  );
}