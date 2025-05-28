
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
    <footer className="bg-gradient-to-br from-emerald-900 via-teal-900 to-green-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-emerald-900 font-bold text-xl">AD</span>
              </div>
              <span className="text-2xl font-bold text-emerald-100">AgriDrone</span>
            </div>
            <p className="text-emerald-100 text-base leading-relaxed">
              Connecting farmers with verified drone providers across India for smart fertilizer spraying services.
            </p>
            <div className="flex space-x-5">
              <button 
                onClick={() => handleSocialClick('Facebook')}
                className="text-emerald-200 hover:text-white hover:bg-emerald-700 p-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-3 focus:ring-emerald-400 focus:ring-opacity-50"
                aria-label="Visit our Facebook page"
              >
                <Facebook className="w-6 h-6" />
              </button>
              <button 
                onClick={() => handleSocialClick('Twitter')}
                className="text-emerald-200 hover:text-white hover:bg-emerald-700 p-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-3 focus:ring-emerald-400 focus:ring-opacity-50"
                aria-label="Visit our Twitter page"
              >
                <Twitter className="w-6 h-6" />
              </button>
              <button 
                onClick={() => handleSocialClick('Instagram')}
                className="text-emerald-200 hover:text-white hover:bg-emerald-700 p-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-3 focus:ring-emerald-400 focus:ring-opacity-50"
                aria-label="Visit our Instagram page"
              >
                <Instagram className="w-6 h-6" />
              </button>
              <button 
                onClick={() => handleSocialClick('LinkedIn')}
                className="text-emerald-200 hover:text-white hover:bg-emerald-700 p-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-3 focus:ring-emerald-400 focus:ring-opacity-50"
                aria-label="Visit our LinkedIn page"
              >
                <Linkedin className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-emerald-100 border-b-2 border-emerald-600 pb-2">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => handleLinkClick('For Farmers')}
                  className="text-emerald-100 hover:text-emerald-300 hover:translate-x-1 transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 rounded px-2 py-1"
                >
                  For Farmers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('For Providers')}
                  className="text-emerald-100 hover:text-emerald-300 hover:translate-x-1 transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 rounded px-2 py-1"
                >
                  For Providers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('How It Works')}
                  className="text-emerald-100 hover:text-emerald-300 hover:translate-x-1 transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 rounded px-2 py-1"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('Pricing')}
                  className="text-emerald-100 hover:text-emerald-300 hover:translate-x-1 transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 rounded px-2 py-1"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('About Us')}
                  className="text-emerald-100 hover:text-emerald-300 hover:translate-x-1 transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 rounded px-2 py-1"
                >
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-emerald-100 border-b-2 border-emerald-600 pb-2">Support</h3>
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => handleLinkClick('Help Center')}
                  className="text-emerald-100 hover:text-emerald-300 hover:translate-x-1 transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 rounded px-2 py-1"
                >
                  Help Center
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('Safety Guidelines')}
                  className="text-emerald-100 hover:text-emerald-300 hover:translate-x-1 transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 rounded px-2 py-1"
                >
                  Safety Guidelines
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('Terms of Service')}
                  className="text-emerald-100 hover:text-emerald-300 hover:translate-x-1 transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 rounded px-2 py-1"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('Privacy Policy')}
                  className="text-emerald-100 hover:text-emerald-300 hover:translate-x-1 transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 rounded px-2 py-1"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('Contact Support')}
                  className="text-emerald-100 hover:text-emerald-300 hover:translate-x-1 transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 rounded px-2 py-1"
                >
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-emerald-100 border-b-2 border-emerald-600 pb-2">Contact Us</h3>
            <div className="space-y-5">
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-emerald-800/30 hover:bg-emerald-800/50 transition-colors duration-300">
                <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                <span className="text-emerald-100 leading-relaxed">Lakkavaram, Prakasam, Andhrapradesh, India</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-emerald-800/30 hover:bg-emerald-800/50 transition-colors duration-300">
                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <a 
                  href="tel:+917095767348" 
                  className="text-emerald-100 hover:text-emerald-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 rounded"
                >
                  +91 70957 67348
                </a>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-emerald-800/30 hover:bg-emerald-800/50 transition-colors duration-300">
                <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <a 
                  href="mailto:support@agridrone.in" 
                  className="text-emerald-100 hover:text-emerald-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 rounded"
                >
                  support@agridrone.in
                </a>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-12 bg-emerald-600/50" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <p className="text-emerald-200 text-base">
            © {new Date().getFullYear()} AgriDrone. All rights reserved.
          </p>
          <div className="flex space-x-8">
            <button 
              onClick={() => handleLinkClick('Terms')}
              className="text-emerald-200 hover:text-emerald-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 rounded px-2 py-1"
            >
              Terms
            </button>
            <button 
              onClick={() => handleLinkClick('Privacy')}
              className="text-emerald-200 hover:text-emerald-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 rounded px-2 py-1"
            >
              Privacy
            </button>
            <button 
              onClick={() => handleLinkClick('Cookies')}
              className="text-emerald-200 hover:text-emerald-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 rounded px-2 py-1"
            >
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
