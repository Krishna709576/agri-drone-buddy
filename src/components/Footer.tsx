
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const handleSocialClick = (platform: string) => {
    console.log(`Navigating to ${platform}`);
    // In a real app, these would navigate to actual social media pages
  };

  const handleLinkClick = (section: string) => {
    console.log(`Navigating to ${section}`);
    // In a real app, these would navigate to actual pages
  };

  return (
    <footer 
      className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative z-20" 
      role="contentinfo"
      style={{
        backdropFilter: 'none',
        isolation: 'isolate'
      }}
    >
      <div className="w-full px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-xl">
                  <span className="text-slate-900 font-bold text-xl">AD</span>
                </div>
                <span className="text-2xl font-bold text-blue-100">AgriDrone</span>
              </div>
              <p className="text-blue-100 text-base leading-relaxed">
                Connecting farmers with verified drone providers across India for smart fertilizer spraying services.
              </p>
              <div className="flex space-x-4" role="group" aria-label="Social media links">
                <button 
                  onClick={() => handleSocialClick('Facebook')}
                  className="text-blue-200 hover:text-white hover:bg-blue-700 p-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-60 hover:scale-110 hover:shadow-lg"
                  aria-label="Visit our Facebook page"
                >
                  <Facebook className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => handleSocialClick('Twitter')}
                  className="text-blue-200 hover:text-white hover:bg-blue-700 p-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-60 hover:scale-110 hover:shadow-lg"
                  aria-label="Visit our Twitter page"
                >
                  <Twitter className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => handleSocialClick('Instagram')}
                  className="text-blue-200 hover:text-white hover:bg-blue-700 p-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-60 hover:scale-110 hover:shadow-lg"
                  aria-label="Visit our Instagram page"
                >
                  <Instagram className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => handleSocialClick('LinkedIn')}
                  className="text-blue-200 hover:text-white hover:bg-blue-700 p-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-60 hover:scale-110 hover:shadow-lg"
                  aria-label="Visit our LinkedIn page"
                >
                  <Linkedin className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-blue-100 border-b-2 border-blue-600 pb-3">Quick Links</h3>
              <nav aria-label="Quick navigation links">
                <ul className="space-y-4">
                  <li>
                    <button 
                      onClick={() => handleLinkClick('For Farmers')}
                      className="text-blue-100 hover:text-blue-300 hover:translate-x-2 transition-all duration-300 text-left focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-opacity-60 rounded-lg px-3 py-2 hover:bg-blue-800/30 w-full text-left"
                    >
                      For Farmers
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handleLinkClick('For Providers')}
                      className="text-blue-100 hover:text-blue-300 hover:translate-x-2 transition-all duration-300 text-left focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-opacity-60 rounded-lg px-3 py-2 hover:bg-blue-800/30 w-full text-left"
                    >
                      For Providers
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handleLinkClick('How It Works')}
                      className="text-blue-100 hover:text-blue-300 hover:translate-x-2 transition-all duration-300 text-left focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-opacity-60 rounded-lg px-3 py-2 hover:bg-blue-800/30 w-full text-left"
                    >
                      How It Works
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handleLinkClick('Pricing')}
                      className="text-blue-100 hover:text-blue-300 hover:translate-x-2 transition-all duration-300 text-left focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-opacity-60 rounded-lg px-3 py-2 hover:bg-blue-800/30 w-full text-left"
                    >
                      Pricing
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handleLinkClick('About Us')}
                      className="text-blue-100 hover:text-blue-300 hover:translate-x-2 transition-all duration-300 text-left focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-opacity-60 rounded-lg px-3 py-2 hover:bg-blue-800/30 w-full text-left"
                    >
                      About Us
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Support */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-blue-100 border-b-2 border-blue-600 pb-3">Support</h3>
              <nav aria-label="Support links">
                <ul className="space-y-4">
                  <li>
                    <button 
                      onClick={() => handleLinkClick('Help Center')}
                      className="text-blue-100 hover:text-blue-300 hover:translate-x-2 transition-all duration-300 text-left focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-opacity-60 rounded-lg px-3 py-2 hover:bg-blue-800/30 w-full text-left"
                    >
                      Help Center
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handleLinkClick('Safety Guidelines')}
                      className="text-blue-100 hover:text-blue-300 hover:translate-x-2 transition-all duration-300 text-left focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-opacity-60 rounded-lg px-3 py-2 hover:bg-blue-800/30 w-full text-left"
                    >
                      Safety Guidelines
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handleLinkClick('Terms of Service')}
                      className="text-blue-100 hover:text-blue-300 hover:translate-x-2 transition-all duration-300 text-left focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-opacity-60 rounded-lg px-3 py-2 hover:bg-blue-800/30 w-full text-left"
                    >
                      Terms of Service
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handleLinkClick('Privacy Policy')}
                      className="text-blue-100 hover:text-blue-300 hover:translate-x-2 transition-all duration-300 text-left focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-opacity-60 rounded-lg px-3 py-2 hover:bg-blue-800/30 w-full text-left"
                    >
                      Privacy Policy
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handleLinkClick('Contact Support')}
                      className="text-blue-100 hover:text-blue-300 hover:translate-x-2 transition-all duration-300 text-left focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-opacity-60 rounded-lg px-3 py-2 hover:bg-blue-800/30 w-full text-left"
                    >
                      Contact Support
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-blue-100 border-b-2 border-blue-600 pb-3">Contact Us</h3>
              <address className="space-y-5 not-italic">
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-blue-800/40 hover:bg-blue-800/60 transition-all duration-300 border border-blue-700/30">
                  <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" aria-hidden="true" />
                  <span className="text-blue-100 leading-relaxed">Lakkavaram, Prakasam, Andhrapradesh, India</span>
                </div>
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-blue-800/40 hover:bg-blue-800/60 transition-all duration-300 border border-blue-700/30">
                  <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" aria-hidden="true" />
                  <a 
                    href="tel:+917095767348" 
                    className="text-blue-100 hover:text-blue-300 transition-colors duration-300 focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-opacity-60 rounded-lg px-2 py-1 hover:underline"
                    aria-label="Call us at +91 70957 67348"
                  >
                    +91 70957 67348
                  </a>
                </div>
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-blue-800/40 hover:bg-blue-800/60 transition-all duration-300 border border-blue-700/30">
                  <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" aria-hidden="true" />
                  <a 
                    href="mailto:support@agridrone.in" 
                    className="text-blue-100 hover:text-blue-300 transition-colors duration-300 focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-opacity-60 rounded-lg px-2 py-1 hover:underline"
                    aria-label="Email us at support@agridrone.in"
                  >
                    support@agridrone.in
                  </a>
                </div>
              </address>
            </div>
          </div>

          <Separator className="my-12 bg-blue-600/60" />

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <p className="text-blue-200 text-base">
              © {new Date().getFullYear()} AgriDrone. All rights reserved.
            </p>
            <nav aria-label="Legal links">
              <div className="flex space-x-8">
                <button 
                  onClick={() => handleLinkClick('Terms')}
                  className="text-blue-200 hover:text-blue-300 transition-colors duration-300 focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-opacity-60 rounded-lg px-3 py-2 hover:underline"
                >
                  Terms
                </button>
                <button 
                  onClick={() => handleLinkClick('Privacy')}
                  className="text-blue-200 hover:text-blue-300 transition-colors duration-300 focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-opacity-60 rounded-lg px-3 py-2 hover:underline"
                >
                  Privacy
                </button>
                <button 
                  onClick={() => handleLinkClick('Cookies')}
                  className="text-blue-200 hover:text-blue-300 transition-colors duration-300 focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-opacity-60 rounded-lg px-3 py-2 hover:underline"
                >
                  Cookies
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
