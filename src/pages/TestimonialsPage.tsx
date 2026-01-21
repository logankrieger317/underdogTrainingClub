import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah M.',
    dog: 'Max, Golden Retriever',
    program: 'Puppy Power Program',
    rating: 5,
    text: 'The Puppy Power Program was exactly what we needed! Max went from a chaotic puppy to a confident, well-behaved dog. The trainers are patient, knowledgeable, and truly care about your success.',
  },
  {
    name: 'Michael D.',
    dog: 'Bella, German Shepherd',
    program: 'Foundations Training',
    rating: 5,
    text: 'Bella was reactive and anxious on walks. After completing Foundations, she\'s a completely different dog. The positive reinforcement methods work, and the trainers are amazing.',
  },
  {
    name: 'Emily C.',
    dog: 'Charlie, Labrador',
    program: 'Stay & Train',
    rating: 5,
    text: 'The Stay & Train program exceeded our expectations. Charlie came back with solid skills, and the transition training helped us maintain everything he learned. Highly recommend!',
  },
  {
    name: 'David W.',
    dog: 'Luna, Australian Shepherd',
    program: 'Pack Life Community',
    rating: 5,
    text: 'Joining Pack Life Community was the best decision we made. The group classes are fun, the community is supportive, and Luna loves seeing her pack friends every week.',
  },
];

export function TestimonialsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-24">
        <div className="container-custom text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            What Our Pack Says
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Real stories from real dog owners who've experienced the Underdog Training Club difference.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="card">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent-400 fill-accent-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-primary-200 mb-4" />
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {testimonial.dog} • {testimonial.program}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Join Our Pack?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            See what a difference professional training can make for you and your dog.
          </p>
          <a href="/consult" className="btn-primary">
            Book Free Consult
          </a>
        </div>
      </section>
    </div>
  );
}
