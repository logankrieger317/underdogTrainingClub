import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from 'lucide-react';

const footerNavigation = {
  programs: [
    { name: 'Puppy Power Program', href: '/puppy-power' },
    { name: 'Foundations Training', href: '/foundations' },
    { name: 'Private Training', href: '/private-training' },
    { name: 'Stay & Train', href: '/stay-train' },
    { name: 'Pack Life Community', href: '/pack-life' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Gift Cards', href: '/gift-cards' },
  ],
  social: [
    { name: 'Instagram', href: 'https://www.instagram.com/underdogtrainingclub', icon: Instagram },
    { name: 'Facebook', href: 'https://www.facebook.com/share/1C1tp1GgXF/', icon: Facebook },
    { name: 'TikTok', href: 'https://www.tiktok.com/@underdog_training', icon: () => (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
      </svg>
    )},
  ],
};

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Contact */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">U</span>
              </div>
              <div>
                <h2 className="text-lg font-bold leading-tight">UNDERDOG</h2>
                <p className="text-xs text-primary-400 font-semibold tracking-wider">
                  TRAINING CLUB
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              One Pack. One Purpose. Building confidence through connection for dogs and their humans.
            </p>
            <div className="space-y-3">
              <a href="tel:5126695796" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <Phone className="h-5 w-5 text-primary-400" />
                <span>512.669.5796</span>
              </a>
              <a href="mailto:info@underdogtrainingclub.com" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <Mail className="h-5 w-5 text-primary-400" />
                <span>info@underdogtrainingclub.com</span>
              </a>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-sm font-semibold text-accent-400 uppercase tracking-wider mb-4">
              Programs
            </h3>
            <ul className="space-y-3">
              {footerNavigation.programs.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-accent-400 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Hours */}
          <div>
            <h3 className="text-sm font-semibold text-accent-400 uppercase tracking-wider mb-4">
              Visit Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary-400 mt-0.5" />
                <div className="text-gray-400">
                  <p>9640 Old Lockhart Rd.</p>
                  <p>Austin, TX 78747</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary-400 mt-0.5" />
                <div className="text-gray-400">
                  <p>Sunday – Saturday</p>
                  <p>10am – 9pm</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Follow Us</h4>
              <div className="flex gap-4">
                {footerNavigation.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Underdog Training Club. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Locally Owned & Operated in Austin, Texas
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
