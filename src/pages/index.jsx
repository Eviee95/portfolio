import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Introduction from '../components/Introduction';
import Portfolio from '../components/Portfolio';
import Skills from '../components/Skills';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Introduction />
        <Portfolio />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
