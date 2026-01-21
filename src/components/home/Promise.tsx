import { Heart, Shield, Target, Users } from 'lucide-react';

const promises = [
  {
    icon: Target,
    title: 'Progress over Perfection',
    description: 'We celebrate every step forward, focusing on growth and improvement rather than unrealistic standards.',
  },
  {
    icon: Heart,
    title: 'Confidence through Connection',
    description: 'Building trust and understanding between you and your dog is at the heart of everything we do.',
  },
  {
    icon: Shield,
    title: 'Safety & Success for the Pack',
    description: 'Creating a secure environment where both dogs and humans can thrive and learn together.',
  },
  {
    icon: Users,
    title: 'Training for Your Lifestyle',
    description: 'Customized approaches that support the way you want to live with your dog, not one-size-fits-all solutions.',
  },
];

export function Promise() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-4">
              What We Believe
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Promise to You
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              At Underdog Training Club, we're more than just trainers—we're your partners 
              in building a stronger bond with your dog. Our positive reinforcement-based 
              approach is rooted in science, education, and years of experience.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {promises.map((promise, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <promise.icon className="w-6 h-6 text-primary-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {promise.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {promise.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-primary-100 to-accent-100 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <svg viewBox="0 0 100 100" fill="currentColor" className="w-16 h-16 text-primary-600">
                      <ellipse cx="50" cy="65" rx="25" ry="20"/>
                      <ellipse cx="25" cy="40" rx="12" ry="15"/>
                      <ellipse cx="75" cy="40" rx="12" ry="15"/>
                      <ellipse cx="35" cy="20" rx="10" ry="12"/>
                      <ellipse cx="65" cy="20" rx="10" ry="12"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Welcome to the Pack!
                  </h3>
                  <p className="text-gray-600">
                    We're glad you're here.
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent-400 rounded-full opacity-20" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-400 rounded-full opacity-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
