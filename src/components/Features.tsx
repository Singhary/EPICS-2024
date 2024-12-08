import React from "react";
import { Keyboard, Smartphone, Users, Shield } from "lucide-react";

const features = [
  {
    name: "Keypad Solution",
    description:
      "Traditional interface designed for simplicity and ease of use, perfect for those who prefer familiar technology.",
    icon: Keyboard,
  },
  {
    name: "Smartphone App",
    description:
      "Modern application with advanced features while maintaining an intuitive user experience.",
    icon: Smartphone,
  },
  {
    name: "User-Centric Design",
    description:
      "Built with real user feedback to ensure our solutions meet actual needs and preferences.",
    icon: Users,
  },
  {
    name: "Secure & Reliable",
    description:
      "Built with security in mind, ensuring your data and privacy are protected at all times.",
    icon: Shield,
  },
];

export function Features() {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">
            Inclusive Technology
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to stay connected
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Choose between our two innovative solutions, each designed to
            provide the perfect balance of functionality and ease of use.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="flex flex-col transform transition-transform hover:scale-105 bg-gray-800 p-4 rounded-xl shadow-lg hover:border-4 hover:border-white"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <feature.icon
                    className="h-5 w-5 flex-none text-indigo-400"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
