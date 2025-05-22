import React from 'react';
import { Link } from 'wouter';
import { Linkedin, Github, Twitter, Mail, Code } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary bg-opacity-70 backdrop-blur-md py-8 px-6 md:px-12 mt-auto relative z-10">
      {/* Mobile Navigation Links (only visible on small screens) */}
      <div className="sm:hidden w-full mb-6">
        <div className="flex justify-center items-center space-x-4">
          <Link href="/developer" className="text-accent2 text-sm font-medium px-2 py-1">
            CodeCircle
          </Link>
          <Link href="/designer" className="text-accent3 text-sm font-medium px-2 py-1">
            DesignCircle
          </Link>
          <Link href="/technopreneur" className="text-accent4 text-sm font-medium px-2 py-1">
            BizCircle
          </Link>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          <div className="mb-6 md:mb-0 order-1 md:order-1 text-center md:text-left">
            <h3 className="text-xl font-poppins font-semibold mb-2">Elvin Mazwimairi</h3>
            <p className="text-white text-opacity-70 text-sm">Portfolio & Personal Brand</p>
          </div>

          <div className="flex flex-col items-center md:items-end order-2 md:order-2">
            <div className="flex space-x-6 mb-3">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white text-opacity-70 hover:text-opacity-100 transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>

              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white text-opacity-70 hover:text-opacity-100 transition"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>

              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white text-opacity-70 hover:text-opacity-100 transition"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>

              <a 
                href="mailto:contact@example.com" 
                className="text-white text-opacity-70 hover:text-opacity-100 transition"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            {/* IqalInc attribution */}
            <div className="flex items-center text-white text-opacity-50 text-xs">
              <span>Made by</span>
              <span className="mx-1 font-semibold">IqalInc</span>
              <Code className="w-3 h-3 ml-1" />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white border-opacity-10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white text-opacity-50 text-sm text-center md:text-left">© {new Date().getFullYear()} Elvin Mazwimairi. All rights reserved.</p>

          <div className="mt-4 md:mt-0 flex flex-wrap justify-center space-x-6">
            <Link href="#" className="text-white text-opacity-50 text-sm hover:text-opacity-70 transition">
              Privacy Policy
            </Link>

            <Link href="#" className="text-white text-opacity-50 text-sm hover:text-opacity-70 transition">
              Terms of Service
            </Link>

            <Link href="#" className="text-white text-opacity-50 text-sm hover:text-opacity-70 transition">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;