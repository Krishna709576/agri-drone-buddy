
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
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AD</span>
              </div>
              <span className="text-xl font-bold text-white">AgriDrone</span>
            </div>
            <p className="text-gray-300 text-sm">
              Connecting farmers with verified drone providers across India for smart fertilizer spraying services.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={() => handleSocialClick('Facebook')}
                className="text-gray-400 hover:text-white cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                aria-label="Visit our Facebook page"
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleSocialClick('Twitter')}
                className="text-gray-400 hover:text-white cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                aria-label="Visit our Twitter page"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleSocialClick('Instagram')}
                className="text-gray-400 hover:text-white cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                aria-label="Visit our Instagram page"
              >
                <Instagram className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleSocialClick('LinkedIn')}
                className="text-gray-400 hover:text-white cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                aria-label="Visit our LinkedIn page"
              >
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleLinkClick('For Farmers')}
                  className="text-gray-300 hover:text-white transition-colors text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
                >
                  For Farmers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('For Providers')}
                  className="text-gray-300 hover:text-white transition-colors text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
                >
                  For Providers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('How It Works')}
                  className="text-gray-300 hover:text-white transition-colors text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('Pricing')}
                  className="text-gray-300 hover:text-white transition-colors text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('About Us')}
                  className="text-gray-300 hover:text-white transition-colors text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
                >
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleLinkClick('Help Center')}
                  className="text-gray-300 hover:text-white transition-colors text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
                >
                  Help Center
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('Safety Guidelines')}
                  className="text-gray-300 hover:text-white transition-colors text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
                >
                  Safety Guidelines
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('Terms of Service')}
                  className="text-gray-300 hover:text-white transition-colors text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('Privacy Policy')}
                  className="text-gray-300 hover:text-white transition-colors text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('Contact Support')}
                  className="text-gray-300 hover:text-white transition-colors text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
                >
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-gray-300">Lakkavaram, Prakasam, Andhrapradesh, India</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-green-500 flex-shrink-0" />
                <a 
                  href="tel:+917095767348" 
                  className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
                >
                  +91 70957 67348
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-green-500 flex-shrink-0" />
                <a 
                  href="mailto:support@agridrone.in" 
                  className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
                >
                  support@agridrone.in
                </a>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} AgriDrone. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <button 
              onClick={() => handleLinkClick('Terms')}
              className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
            >
              Terms
            </button>
            <button 
              onClick={() => handleLinkClick('Privacy')}
              className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
            >
              Privacy
            </button>
            <button 
              onClick={() => handleLinkClick('Cookies')}
              className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
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
