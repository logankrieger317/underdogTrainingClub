import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'What training methods do you use?',
    answer: 'We use positive reinforcement-based training methods that are science-backed and proven effective. Our approach focuses on building trust, confidence, and clear communication between you and your dog.',
  },
  {
    question: 'How long does training take?',
    answer: 'Training duration varies based on your dog\'s needs, your goals, and the program you choose. Most programs range from 4-12 weeks, with ongoing support available through our Pack Life Community.',
  },
  {
    question: 'Do you work with all breeds and ages?',
    answer: 'Yes! We work with dogs of all breeds, sizes, and ages. From puppies as young as 8 weeks to senior dogs, we have programs designed for every stage of life.',
  },
  {
    question: 'What if my dog has behavioral issues?',
    answer: 'We specialize in working with dogs who have behavioral challenges. During your free consultation, we\'ll assess your dog\'s specific needs and recommend the best approach, whether that\'s private training, Stay & Train, or our Foundations program.',
  },
  {
    question: 'Can family members participate in training?',
    answer: 'Absolutely! We encourage all family members to participate in training sessions. Consistency is key, and having everyone on the same page ensures your dog learns faster and retains behaviors better.',
  },
  {
    question: 'What certifications do your trainers have?',
    answer: 'All our trainers are CCPDT (Certified Professional Dog Trainer) certified and maintain continuing education. Many also hold additional certifications including AKC Star Puppy, AKC Canine Good Citizen, and IACP memberships.',
  },
];

export function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-24">
        <div className="container-custom text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Find answers to common questions about our training programs and methods.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    {openIndex === idx ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  {openIndex === idx && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We're here to help! Contact us for more information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/consult" className="btn-primary">
              Book Free Consult
            </a>
            <a href="tel:5126695796" className="btn-outline">
              Call: 512.669.5796
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
