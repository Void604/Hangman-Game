import React from 'react';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-200 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Hangman Game. All rights reserved.
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="text-gray-400 hover:text-primary-400 transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            
            <a 
              href="#" 
              className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
            >
              Privacy Policy
            </a>
            
            <a 
              href="#" 
              className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;