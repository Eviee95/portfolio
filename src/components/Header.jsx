import React from 'react';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <div className="font-bold text-xl">MyPortfolio</div>
        <ul className="flex space-x-4">
          <li><a href="#hero" className="hover:underline">Home</a></li>
          <li><a href="#introduction" className="hover:underline">About</a></li>
          <li><a href="#portfolio" className="hover:underline">Portfolio</a></li>
          <li><a href="#skills" className="hover:underline">Skills</a></li>
          <li><a href="#contact" className="hover:underline">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}
