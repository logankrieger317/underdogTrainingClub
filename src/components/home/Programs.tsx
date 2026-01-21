import { Link } from 'react-router-dom';
import { ArrowRight, Baby, Dog, Users, Home, Calendar } from 'lucide-react';

const programs = [
  {
    id: 'puppy-power',
    title: 'Puppy Power Program',
    subtitle: 'Puppies Under 8 Months',
    description: 'Our Power Puppy program focuses on foundations that matter most for developing puppies & building relationships.',
    features: [
      'Confidence building',
      'Thoughtful socialization',
      'Communication & engagement',
      'Real-world handling skills',
    ],
    icon: Baby,
    color: 'accent',
    href: '/puppy-power',
    badge: 'Tiny Paws. Big Wins!',
  },
  {
    id: 'foundations',
    title: 'Solid Pack Foundations',
    subtitle: 'Dogs Over 8 Months',
    description: 'Whether your dog is adolescent, newly adopted, or just feeling out of sync, foundations create clarity and connection.',
    features: [
      'Better communication',
      'Frustration-free walks',
      'Everyday behavior help',
      'Professional guidance',
    ],
    icon: Dog,
    color: 'primary',
    href: '/foundations',
    badge: 'Need Direction?',
  },
  {
    id: 'private-training',
    title: 'Private Training',
    subtitle: 'One-on-One Sessions',
    description: 'Personalized in-home training tailored to your specific goals and your dog\'s unique needs.',
    features: [
      'Customized curriculum',
      'In-home convenience',
      'Flexible scheduling',
      'Focused attention',
    ],
    icon: Home,
    color: 'navy',
    href: '/private-training',
    badge: 'Personalized',
  },
  {
    id: 'stay-train',
    title: 'Stay & Train',
    subtitle: 'Immersive Training',
    description: 'Intensive board and train program where your dog stays with us for accelerated learning.',
    features: [
      'Daily training sessions',
      'Professional supervision',
      'Consistent reinforcement',
      'Owner transition support',
    ],
    icon: Calendar,
    color: 'primary',
    href: '/stay-train',
    badge: 'Intensive',
  },
  {
    id: 'pack-life',
    title: 'Pack Life Community',
    subtitle: 'Group Classes & Events',
    description: 'Join our community of dog lovers for open-enrollment group classes and pack activities.',
    features: [
      'Group socialization',
      'Community events',
      'Ongoing support',
      'Pack building',
    ],
    icon: Users,
    color: 'accent',
    href: '/pack-life',
    badge: 'Community',
  },
];

const colorClasses = {
  primary: {
    bg: 'bg-primary-50',
    icon: 'bg-primary-100 text-primary-600',
    badge: 'bg-primary-100 text-primary-700',
    button: 'text-primary-600 hover:text-primary-700',
  },
  accent: {
    bg: 'bg-accent-50',
    icon: 'bg-accent-100 text-accent-700',
    badge: 'bg-accent-100 text-accent-700',
    button: 'text-accent-600 hover:text-accent-700',
  },
  navy: {
    bg: 'bg-navy-50',
    icon: 'bg-navy-100 text-navy-600',
    badge: 'bg-navy-100 text-navy-700',
    button: 'text-navy-600 hover:text-navy-700',
  },
};

export function Programs() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Training Programs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Whether you have a new puppy or an adult dog needing guidance, 
            we have a program designed for your journey.
          </p>
        </div>

        {/* Featured Programs (Puppy & Foundations) */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {programs.slice(0, 2).map((program) => {
            const colors = colorClasses[program.color as keyof typeof colorClasses];
            return (
              <div
                key={program.id}
                className={`${colors.bg} rounded-2xl p-8 transition-transform hover:-translate-y-1`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 ${colors.icon} rounded-xl flex items-center justify-center`}>
                    <program.icon className="w-7 h-7" />
                  </div>
                  <span className={`${colors.badge} px-3 py-1 rounded-full text-sm font-medium`}>
                    {program.badge}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {program.title}
                </h3>
                <p className="text-sm font-medium text-gray-500 mb-4">
                  {program.subtitle}
                </p>
                <p className="text-gray-600 mb-6">
                  {program.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link
                  to={program.href}
                  className={`inline-flex items-center gap-2 font-semibold ${colors.button} transition-colors`}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Other Programs */}
        <div className="grid md:grid-cols-3 gap-6">
          {programs.slice(2).map((program) => {
            const colors = colorClasses[program.color as keyof typeof colorClasses];
            return (
              <div
                key={program.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 ${colors.icon} rounded-lg flex items-center justify-center mb-4`}>
                  <program.icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {program.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  {program.subtitle}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  {program.description}
                </p>
                
                <Link
                  to={program.href}
                  className={`inline-flex items-center gap-1 text-sm font-semibold ${colors.button} transition-colors`}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
