import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-[#f7f5ef] text-gray-800 px-6 md:px-16 py-14">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left Column */}
        <div className="space-y-4 text-sm">
          <p className="font-semibold text-red-600">
            ThePhoneLab® Protected by de Marktplaats
          </p>
          <ul className="space-y-2">
            <li>Terms and Conditions</li>
            <li>Privacy statement</li>
            <li>Disclaimer</li>
            <li>What customers say</li>
            <li>The team</li>
            <li>Jobs</li>
            <li>Our promises</li>
            <li>About us</li>
          </ul>
        </div>
        {/* Middle Column */}
        <div className="space-y-4 text-sm">
          <h3 className="font-semibold">Sitemap</h3>
          <ul className="space-y-2">
            <li>Home</li>
            <li>Repairs</li>
            <li>Stores</li>
            <li>Prices</li>
            <li>Support</li>
            <li>Business</li>
            <li>Mail-in repair</li>
            <li>Sell your device</li>
          </ul>
        </div>
        {/* Right Column */}
        <div className="flex flex-col justify-between gap-8">
          <div>
            <p className="font-semibold mb-3">Let’s get social</p>
            <div className="flex items-center gap-4 text-lg">
              <FaFacebookF />
              <FaLinkedinIn />
              <FaInstagram />
              <FaYoutube />
              <FaTiktok />
            </div>
          </div>
          <div className="text-sm space-y-2">
            <p className="font-medium">Techniek Nederland</p>
            <p>
              Powered by <span className="text-red-600 font-semibold">Leapforce</span>
            </p>
          </div>
        </div>
      </div>
      {/* Floating Contact Button */}
      
    </footer>
  );
};
export default Footer;