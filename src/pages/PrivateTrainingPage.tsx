import { Link } from 'react-router-dom';
import { Home, Clock, Users, CheckCircle, ArrowRight } from 'lucide-react';

export function PrivateTrainingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-600 to-navy-800 py-24">
        <div className="container-custom text-center text-white">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Home className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Private Training
          </h1>
          <p className="text-xl text-navy-100 max-w-2xl mx-auto">
            Personalized one-on-one training sessions tailored to your specific goals and your dog's unique needs.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Customized Training in Your Home
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our private training program offers personalized attention and a curriculum designed specifically 
                for your dog and your lifestyle. Whether you're dealing with specific behavioral challenges or 
                want to build foundational skills, our certified trainers will work with you every step of the way.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              {[
                {
                  icon: Home,
                  title: 'In-Home Convenience',
                  description: 'Training happens in your environment, making it easier for your dog to learn and retain behaviors.',
                },
                {
                  icon: Clock,
                  title: 'Flexible Scheduling',
                  description: 'Work around your schedule with sessions that fit your availability.',
                },
                {
                  icon: Users,
                  title: 'Family Involvement',
                  description: 'All family members can participate and learn consistent training techniques.',
                },
                {
                  icon: CheckCircle,
                  title: 'Customized Curriculum',
                  description: 'A training plan designed specifically for your dog\'s age, breed, and individual needs.',
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-navy-100 rounded-lg flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-navy-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            What's Included
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <ul className="space-y-4">
              {[
                'Initial consultation and assessment',
                'Customized training plan',
                'One-on-one sessions with certified trainer',
                'Hands-on guidance for you and your family',
                'Training materials and resources',
                'Email support between sessions',
                'Progress tracking and adjustments',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Private Training?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Book your free consultation to discuss your goals and see if private training is right for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/consult" className="btn-primary inline-flex items-center justify-center gap-2">
              Book Free Consult
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:5126695796" className="btn-outline inline-flex items-center justify-center gap-2">
              Call Us: 512.669.5796
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
