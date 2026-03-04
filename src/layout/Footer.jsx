import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[var(--secondary)] text-[var(--advanced)] px-6 md:px-16 py-14">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left Column */}
        <div className="space-y-4 text-sm">
          <p className="font-semibold text-[var(--primary)]">
            ThePhoneLab® Protected by de Marktplaats
          </p>
          <ul className="space-y-2">
            <li>
              <Link to="/terms" className="hover:text-[var(--tertiary)] transition-colors">
                Terms and Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-[var(--tertiary)] transition-colors">
                Privacy statement
              </Link>
            </li>
            <li>
              <Link to="/disclaimer" className="hover:text-[var(--tertiary)] transition-colors">
                Disclaimer
              </Link>
            </li>
            <li>
              <Link to="/reviews" className="hover:text-[var(--tertiary)] transition-colors">
                What customers say
              </Link>
            </li>
            <li>
              <Link to="/team" className="hover:text-[var(--tertiary)] transition-colors">
                The team
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="hover:text-[var(--tertiary)] transition-colors">
                Jobs
              </Link>
            </li>
            <li>
              <Link to="/promises" className="hover:text-[var(--tertiary)] transition-colors">
                Our promises
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[var(--tertiary)] transition-colors">
                About us
              </Link>
            </li>
          </ul>
        </div>
        {/* Middle Column */}
        <div className="space-y-4 text-sm">
          <h3 className="font-semibold">Sitemap</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-[var(--tertiary)] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/repairs" className="hover:text-[var(--tertiary)] transition-colors">
                Repairs
              </Link>
            </li>
            <li>
              <Link to="/prices" className="hover:text-[var(--tertiary)] transition-colors">
                Prices
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:text-[var(--tertiary)] transition-colors">
                Support
              </Link>
            </li>
            <li>
              <Link to="/business" className="hover:text-[var(--tertiary)] transition-colors">
                Business
              </Link>
            </li>
          </ul>
        </div>
        {/* Right Column */}
        <div className="flex flex-col justify-between gap-8">
          <div>
            <p className="font-semibold mb-3">Let’s get social</p>
            <div className="flex items-center gap-4 text-lg">
              <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--tertiary)] transition-colors">
                <FaFacebookF />
              </a>
              <a href="https://linkedin.com/company/yourcompany" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--tertiary)] transition-colors">
                <FaLinkedinIn />
              </a>
              <a href="https://instagram.com/yourhandle" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--tertiary)] transition-colors">
                <FaInstagram />
              </a>
              <a href="https://youtube.com/yourchannel" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--tertiary)] transition-colors">
                <FaYoutube />
              </a>
              <a href="https://tiktok.com/@yourhandle" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--tertiary)] transition-colors">
                <FaTiktok />
              </a>
            </div>
          </div>
          <div className="text-sm space-y-2">
            <p className="font-medium">Techniek Nederland</p>
            <p>
              Powered by <span className="text-[var(--primary)] font-semibold">RoyalTech</span>
            </p>
          </div>
        </div>
      </div>
      {/* Floating Contact Button */}
      
    </footer>
  );
};

export default Footer;