import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full border-t mt-8 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center text-sm">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} WeatherApp. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <a href="https://github.com/shamsalm0" target="_blank" rel="noopener noreferrer" className="hover:underline">
            GitHub
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy
          </a>
          <a href="/terms" className="hover:underline">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
