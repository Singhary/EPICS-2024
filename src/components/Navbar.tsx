"use client";
import React, { useState } from "react";
import {
  Menu,
  X,
  Keyboard,
  Smartphone,
  Home,
  Info,
  Phone,
  Grid,
} from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Keypad Solution", href: "/keypad", icon: Keyboard },
    { name: "Smartphone App", href: "/smartphone", icon: Smartphone },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-950 border-b border-gray-700 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <Keyboard className="h-8 w-8 text-indigo-400" />
                <Smartphone className="h-8 w-8 text-indigo-400" />
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md px-4 py-2 text-sm font-medium transition-colors"
                  aria-label={item.name}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center rounded-md bg-gray-950 p-2 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-2 px-4 pb-4 pt-4 sm:px-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 rounded-md px-4 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
                aria-label={item.name}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
