import { Phone, Clock, MapPin } from 'lucide-react';
import { ContactForm } from '../components/forms/ContactForm';

export function ConsultPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-16 md:py-24">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Book Your Free Consultation
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Talk one-on-one with a professional trainer about your goals 
            and discover the best path forward for you and your dog.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Tell Us About You & Your Dog
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we'll reach out within 24 hours to schedule 
                  your free consultation.
                </p>
                <ContactForm />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Prefer to Talk Now?
                </h3>
                <div className="space-y-4">
                  <a
                    href="tel:5126695796"
                    className="flex items-center gap-3 text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium">Call Us</p>
                      <p className="text-sm text-gray-500">512.669.5796</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Hours Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Hours of Operation
                </h3>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Sunday – Saturday</p>
                    <p className="text-gray-600">10am – 9pm</p>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Visit Us
                </h3>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-navy-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-navy-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">9640 Old Lockhart Rd.</p>
                    <p className="text-gray-600">Austin, TX 78747</p>
                  </div>
                </div>
              </div>

              {/* What to Expect */}
              <div className="bg-primary-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  What to Expect
                </h3>
                <ul className="space-y-3">
                  {[
                    'We\'ll discuss your training goals',
                    'Learn about your dog\'s history',
                    'Recommend the best program fit',
                    'Answer all your questions',
                    'No pressure, no obligation',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-5 h-5 text-primary-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
