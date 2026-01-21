import { Link } from 'react-router-dom';
import { Phone, Calendar, Gift } from 'lucide-react';

export function CTA() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Join the Pack?
          </h2>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Take the first step towards a better relationship with your dog. 
            Schedule a free consultation to discuss your goals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Free Consult */}
          <Link
            to="/consult"
            className="bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1 group"
          >
            <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
              <Calendar className="w-7 h-7 text-primary-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Book Free Consult
            </h3>
            <p className="text-sm text-gray-600">
              Talk one-on-one with a professional trainer
            </p>
          </Link>

          {/* Call Us */}
          <a
            href="tel:5126695796"
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all group border border-white/20"
          >
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
              <Phone className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Call Us
            </h3>
            <p className="text-sm text-primary-100">
              512.669.5796
            </p>
          </a>

          {/* Gift Cards */}
          <Link
            to="/gift-cards"
            className="bg-accent-400 rounded-xl p-6 text-center hover:bg-accent-500 transition-all hover:-translate-y-1 group"
          >
            <div className="w-14 h-14 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/40 transition-colors">
              <Gift className="w-7 h-7 text-navy-900" />
            </div>
            <h3 className="text-lg font-bold text-navy-900 mb-2">
              Gift Cards
            </h3>
            <p className="text-sm text-navy-800">
              Now available!
            </p>
          </Link>
        </div>

        {/* Social Proof */}
        <div className="mt-12 text-center">
          <p className="text-primary-200 text-sm">
            More Than the Training.{' '}
            <span className="text-white font-semibold">ONE PACK. ONE PURPOSE.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
