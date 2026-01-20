'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';

const faqs = [
  {
    question: 'How does this affect existing property agents?',
    answer: 'The platform provides an additional channel for property transactions. Agents can use ShelterPoint to list properties and manage client relationships. This is a complementary service, not a replacement for existing market participants.',
  },
  {
    question: 'What verification process do you use for property owners?',
    answer: `All property owners must provide government-issued identification (BVN or NIN), property documentation (Certificate of Occupancy or Governor's Consent), and pass an address verification check before they can list properties.`,
  },
  {
    question: `What happens if I don't receive launch access?`,
    answer: `All waitlist members will receive access notification one week before the beta launch, targeted for March 2026. If you don't receive an email, contact hello@shelterpointng.com with your registered email address.`,
  },
  {
    question: 'How is data privacy handled?',
    answer: 'The platform is NDPR compliant. Personal data is encrypted and never shared without explicit consent. You can request data deletion at any time through account settings or by contacting support.',
  },
  {
    question: 'Which areas of Lagos are covered?',
    answer: 'Initial coverage includes Lekki, Victoria Island, Ikoyi, Yaba, Ikeja, Surulere, Ajah, Maryland, and Festac. Expansion to all 20 Local Government Areas is planned for Q3 2026.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-10 bg-neutral-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-heading-h2 text-neutral-900 mb-3">
            Frequently asked questions
          </h2>
        </div>
        
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <Card key={index} variant="bordered" className="overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-neutral-200 transition-colors duration-200"
                aria-expanded={openIndex === index}
              >
                <span className="text-body-base font-medium text-neutral-900">
                  {faq.question}
                </span>
                <span 
                  className="text-neutral-700 transition-transform duration-200 flex-shrink-0"
                  style={{ transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  aria-hidden="true"
                >
                  ↓
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-body-base text-neutral-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}