import React from 'react';
import { ArrowRight, Smartphone, Keyboard } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Making Technology Accessible for Everyone
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
            We're bridging the digital divide with innovative solutions that cater to all users,
            regardless of their technological comfort level. Choose the interface that works best for you.
          </p>
          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              onClick={() => window.location.href = '/keypad'}
              className="group inline-flex items-center gap-2 rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              <Keyboard className="h-5 w-5" />
              Learn More About Keypad Solution
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => window.location.href = '/smartphone'}
              className="group inline-flex items-center gap-2 rounded-full bg-gray-800 px-6 py-3 text-sm font-semibold text-gray-300 shadow-sm ring-1 ring-gray-700 hover:bg-gray-700 hover:text-white"
            >
              <Smartphone className="h-5 w-5" />
              Explore Smartphone Features
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}