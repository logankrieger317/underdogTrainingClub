import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Heart } from 'lucide-react';

export function StartHerePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-24">
        <div className="container-custom text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Start Here
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Welcome to Underdog Training Club! Let's find the perfect program for you and your dog.
          </p>
        </div>
      </section>

      {/* Quick Guide */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              How to Get Started
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  step: 1,
                  title: 'Book Your Free Consultation',
                  description: 'Schedule a one-on-one call with a professional trainer to discuss your goals.',
                  action: 'Book Now',
                  href: '/consult',
                },
                {
                  step: 2,
                  title: 'Choose Your Program',
                  description: 'Based on your consultation, we\'ll recommend the best program for your dog.',
                  action: 'View Programs',
                  href: '/#programs',
                },
                {
                  step: 3,
                  title: 'Begin Training',
                  description: 'Start building confidence and connection with your dog through our proven methods.',
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-bold text-lg">{item.step}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {item.description}
                    </p>
                    {item.action && (
                      <Link
                        to={item.href || '#'}
                        className="btn-outline inline-flex items-center gap-2"
                      >
                        {item.action}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Why Choose Underdog Training Club?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: CheckCircle,
                title: 'Certified Professionals',
                description: 'All trainers are CCPDT certified and continuously educated.',
              },
              {
                icon: Heart,
                title: 'Positive Reinforcement',
                description: 'Science-based methods that build trust and confidence.',
              },
              {
                icon: Users,
                title: 'Community Focus',
                description: 'Join a pack of dog lovers supporting each other.',
              },
            ].map((item, idx) => (
              <div key={idx} className="card text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-primary-600" />
                </div>
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
      <section className="section-padding bg-primary-600">
        <div className="container-custom text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Book your free consultation today!
          </p>
          <Link to="/consult" className="btn-secondary">
            Book Free Consult
          </Link>
        </div>
      </section>
    </div>
  );
}
