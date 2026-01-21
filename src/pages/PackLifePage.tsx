import { Link } from 'react-router-dom';
import { Users, Calendar, Heart, ArrowRight } from 'lucide-react';

export function PackLifePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-24">
        <div className="container-custom text-center text-white">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Pack Life Community
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Join our community of dog lovers for open-enrollment group classes, pack activities, and ongoing support.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              More Than Training. One Pack. One Purpose.
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Pack Life Community is about building connections—between you and your dog, and between 
              you and other dog owners who share your commitment to positive training. Our open-enrollment 
              group classes provide ongoing education, socialization opportunities, and a supportive 
              community of like-minded dog lovers.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              {[
                {
                  icon: Users,
                  title: 'Group Classes',
                  description: 'Open-enrollment classes for all skill levels, focusing on real-world skills and socialization.',
                },
                {
                  icon: Calendar,
                  title: 'Community Events',
                  description: 'Pack walks, training workshops, and social gatherings for dogs and their humans.',
                },
                {
                  icon: Heart,
                  title: 'Ongoing Support',
                  description: 'Access to trainers, resources, and a community that supports your training journey.',
                },
              ].map((item, idx) => (
                <div key={idx} className="card">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary-600" />
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
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Benefits of Pack Life Community
          </h2>
          
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              'Socialization opportunities',
              'Real-world training scenarios',
              'Community support and encouragement',
              'Ongoing education and skill building',
              'Fun activities for dogs and owners',
              'Access to certified trainers',
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary-600">
        <div className="container-custom text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Join the Pack!
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Become part of our community and experience the difference that pack support makes.
          </p>
          <Link to="/consult" className="btn-secondary inline-flex items-center gap-2">
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
