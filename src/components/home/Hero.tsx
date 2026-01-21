import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-primary-700 via-primary-800 to-navy-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Paw Print Decorations */}
      <div className="absolute top-20 right-10 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" fill="currentColor" className="text-white">
          <ellipse cx="50" cy="65" rx="25" ry="20"/>
          <ellipse cx="25" cy="40" rx="12" ry="15"/>
          <ellipse cx="75" cy="40" rx="12" ry="15"/>
          <ellipse cx="35" cy="20" rx="10" ry="12"/>
          <ellipse cx="65" cy="20" rx="10" ry="12"/>
        </svg>
      </div>
      <div className="absolute bottom-32 left-10 w-24 h-24 opacity-10 rotate-45">
        <svg viewBox="0 0 100 100" fill="currentColor" className="text-white">
          <ellipse cx="50" cy="65" rx="25" ry="20"/>
          <ellipse cx="25" cy="40" rx="12" ry="15"/>
          <ellipse cx="75" cy="40" rx="12" ry="15"/>
          <ellipse cx="35" cy="20" rx="10" ry="12"/>
          <ellipse cx="65" cy="20" rx="10" ry="12"/>
        </svg>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Star className="h-4 w-4 text-accent-400 fill-accent-400" />
              <span className="text-white/90 text-sm font-medium">
                Austin's Premier Dog Training Community
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Welcome to{' '}
              <span className="text-accent-400">Underdog</span>{' '}
              Training Club
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-100 mb-4 font-medium">
              One Pack. One Purpose.
            </p>
            
            <p className="text-lg text-primary-200 mb-8 max-w-xl mx-auto lg:mx-0">
              At Underdog Training Club, our goal is to deliver on the{' '}
              <span className="text-white font-semibold">REAL-LIFE</span> learning goals YOU set. 
              Building confidence through connection for dogs and their humans.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/consult"
                className="btn-secondary inline-flex items-center justify-center gap-2 text-lg"
              >
                Book Free Consult
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/start-here"
                className="btn-outline border-white text-white hover:bg-white hover:text-primary-700 inline-flex items-center justify-center gap-2"
              >
                Learn More
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-10 pt-8 border-t border-white/20">
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start items-center text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold">CCPDT</span>
                  </div>
                  <span>Certified Trainers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold">AKC</span>
                  </div>
                  <span>AKC Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold">IACP</span>
                  </div>
                  <span>Professional Member</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="aspect-square max-w-lg mx-auto bg-white/10 backdrop-blur-sm rounded-3xl p-8 animate-slide-up">
                <div className="w-full h-full bg-gradient-to-br from-accent-400/30 to-primary-400/30 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                      <svg viewBox="0 0 100 100" fill="currentColor" className="w-20 h-20 text-white">
                        <ellipse cx="50" cy="65" rx="25" ry="20"/>
                        <ellipse cx="25" cy="40" rx="12" ry="15"/>
                        <ellipse cx="75" cy="40" rx="12" ry="15"/>
                        <ellipse cx="35" cy="20" rx="10" ry="12"/>
                        <ellipse cx="65" cy="20" rx="10" ry="12"/>
                      </svg>
                    </div>
                    <p className="text-white/80 text-lg font-medium">
                      Progress over Perfection
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🐕</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">500+ Dogs Trained</p>
                    <p className="text-sm text-gray-500">Happy Pack Members</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
