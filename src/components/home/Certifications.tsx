const certifications = [
  {
    name: 'CCPDT',
    fullName: 'Certified Professional Dog Trainer',
    logo: '/certifications/ccpdt.png',
  },
  {
    name: 'AKC Star Puppy',
    fullName: 'AKC S.T.A.R. Puppy Program',
    logo: '/certifications/akc-star.png',
  },
  {
    name: 'AKC CGC',
    fullName: 'AKC Canine Good Citizen',
    logo: '/certifications/akc-cgc.png',
  },
  {
    name: 'IACP',
    fullName: 'International Association of Canine Professionals',
    logo: '/certifications/iacp.png',
  },
];

export function Certifications() {
  return (
    <section className="section-padding bg-gray-100">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Certifications & Associations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Positive reinforcement based training by certified professional dog trainers.
            Locally owned & operated in Austin, Texas.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                {/* Placeholder for certification logo */}
                <span className="text-xl font-bold text-gray-400">{cert.name}</span>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">
                {cert.name}
              </h3>
              <p className="text-xs text-gray-500">
                {cert.fullName}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Trust Elements */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Science-Based Methods
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Positive Reinforcement
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Continuing Education
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
