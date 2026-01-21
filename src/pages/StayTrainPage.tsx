import { Link } from 'react-router-dom';
import { Calendar, Home, CheckCircle, ArrowRight } from 'lucide-react';

export function StayTrainPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-accent-500 to-accent-700 py-24">
        <div className="container-custom text-center text-white">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Stay & Train
          </h1>
          <p className="text-xl text-accent-100 max-w-2xl mx-auto">
            Intensive board and train program where your dog stays with us for accelerated learning and consistent reinforcement.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Accelerated Training Through Immersion
          </h2>
            <p className="text-lg text-gray-600 mb-6">
              Our Stay & Train program provides intensive, focused training in a controlled environment. 
              Your dog stays with us for a set period, receiving multiple daily training sessions and 
              consistent reinforcement. This program is ideal for dogs who need focused attention or 
              for owners who want to accelerate their dog's learning.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  During the Stay
                </h3>
                <ul className="space-y-3">
                  {[
                    'Daily training sessions',
                    'Professional supervision 24/7',
                    'Consistent reinforcement',
                    'Socialization opportunities',
                    'Progress updates and photos',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  After the Stay
                </h3>
                <ul className="space-y-3">
                  {[
                    'Owner transition training',
                    'Take-home training guide',
                    'Follow-up support sessions',
                    'Ongoing email support',
                    'Integration into your routine',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Program Details
          </h2>
          
          <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-6">
            {[
              {
                title: '2-Week Program',
                description: 'Ideal for basic obedience and foundational skills',
              },
              {
                title: '4-Week Program',
                description: 'Comprehensive training for behavioral challenges',
              },
              {
                title: 'Custom Programs',
                description: 'Tailored to specific needs and goals',
              },
            ].map((item, idx) => (
              <div key={idx} className="card text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Interested in Stay & Train?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Contact us to discuss if this program is right for your dog.
          </p>
          <Link to="/consult" className="btn-primary inline-flex items-center gap-2">
            Book Free Consult
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
