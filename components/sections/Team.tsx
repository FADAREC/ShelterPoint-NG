const teamHighlights = [
  {
    emoji: '👨‍💼',
    title: 'Tech + Real Estate',
    subtitle: '10+ years combined',
    gradient: 'from-blue-400 to-green-400',
  },
  {
    emoji: '🏠',
    title: 'Lagos-Based',
    subtitle: 'We live here too',
    gradient: 'from-green-400 to-yellow-400',
  },
  {
    emoji: '💪',
    title: 'Mission-Driven',
    subtitle: 'Fixing housing, not extracting',
    gradient: 'from-yellow-400 to-red-400',
  },
];

export default function Team() {
  return (
    <section className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-16" aria-labelledby="team-heading">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 id="team-heading" className="text-3xl font-bold mb-6">
          Built by Lagosians Who Felt Your Pain
        </h2>
        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
          After personally wasting 6+ months house-hunting in 2024—dealing with fake listings, hidden fees, and endless traffic—our founding team decided enough was enough. ShelterPoint NG is our solution to the problem we lived.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          {teamHighlights.map((highlight, index) => (
            <article key={index} className="text-center">
              <div
                className={`w-24 h-24 bg-gradient-to-br ${highlight.gradient} rounded-full mx-auto mb-3 flex items-center justify-center text-3xl font-bold`}
                aria-hidden="true"
              >
                {highlight.emoji}
              </div>
              <p className="font-bold text-lg">{highlight.title}</p>
              <p className="text-sm text-blue-200">{highlight.subtitle}</p>
            </article>
          ))}
        </div>
        <p className="text-sm text-blue-300 mt-8 italic">
          "We're not a faceless tech company. We're Lagosians building for Lagosians. Your success is our success."
        </p>
      </div>
    </section>
  );
}