'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';

const faqs = [
  {
    question: 'How does this affect existing property agents?',
    answer:
      'ShelterPoint is complementary, not anti-agent. Registered agents can list with fees disclosed. ShelterCheck helps renters understand a quote before they pay anyone.',
  },
  {
    question: 'What does ShelterCheck do?',
    answer:
      'ShelterCheck is a free move-in cost checker. Enter rent and fees, see day-one cash, what is likely unrecoverable, and flags against current Lagos Tenancy Law 2011. It is not legal advice.',
  },
  {
    question: 'What verification will you run before a listing goes live?',
    answer:
      'Before a listing goes live, we check the owner identity and documents. The full checklist will be published before launch. We do not claim BVN or NIN verification on every owner until that process is live and documented.',
  },
  {
    question: 'What happens if I do not receive launch access?',
    answer:
      'Waitlist members will be notified before beta opens. If you miss an email, write to hello@shelterpointng.com with the address you used to sign up.',
  },
  {
    question: 'How is data privacy handled?',
    answer:
      'We only collect what we need for the waitlist and tools. You can request deletion by emailing support. NDPA 2023 and NDPR compliance claims will match documented practice; ask us if you need the current policy.',
  },
  {
    question: 'Which areas of Lagos are covered?',
    answer:
      'ShelterCheck works for any quote in Lagos. Launch supply starts in one corridor we can verify by hand, not every LGA at once.',
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
                  style={{
                    transform:
                      openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
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
