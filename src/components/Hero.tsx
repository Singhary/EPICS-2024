import React from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative bg-green-50 h-screen flex items-center justify-between px-10">
      <div className="max-w-lg space-y-6">
        <h1 className="text-5xl font-extrabold text-green-800 leading-tight">
          Empowering Farmers with Technology
        </h1>
        <p className="text-lg text-gray-600">
          Simplifying agriculture with accessible solutions for rural
          communities. Stay informed, make better decisions, and thrive with our
          platform.
        </p>
        <div className="flex space-x-4">
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700">
            Learn About Keypad Solution
          </button>

          <button className="px-6 py-3 bg-white flex items-center justify-center text-green-600 border border-green-600 rounded-lg shadow-md hover:bg-green-50">
            Explore Smartphone Features
            <ArrowRight className="h-6 w-6 text-green-600" />
          </button>
        </div>
      </div>

      <div className="hidden relative flex-1 md:flex justify-center items-center group">
        <Image
          src="/bg1.png"
          alt="Happy Farmer"
          className="rounded-xl shadow-lg w-3/4 object-cover z-10 transform group-hover:scale-105 group-hover:translate-y-[-10px] transition-transform duration-500 ease-in-out"
          width={800}
          height={800}
        />
        <Image
          src="/farmlandscape.png"
          alt="Farm Landscape"
          className="absolute top-10 left-10 w-32 h-32 object-cover rounded-lg shadow-lg border border-green-200 transform rotate-[-5deg] group-hover:scale-110 group-hover:rotate-0 transition-transform duration-500 ease-in-out"
          height={128}
          width={128}
        />
        <Image
          src="/farmland.png"
          alt="Farmland"
          className="absolute top-10 right-10 w-32 h-32 object-cover rounded-lg shadow-lg border border-green-200 transform rotate-[5deg] group-hover:scale-110 group-hover:rotate-0 transition-transform duration-500 ease-in-out"
          width={128}
          height={128}
        />
        <Image
          src="/tractor.png"
          alt="Tractor"
          className="absolute bottom-10 left-10 w-40 h-40 object-cover rounded-lg shadow-lg border border-green-200 transform rotate-[3deg] group-hover:scale-110 group-hover:rotate-[-5deg] transition-transform duration-500 ease-in-out"
          height={160}
          width={160}
        />
        <Image
          src="/tool.png"
          alt="Farming Tools"
          className="absolute bottom-10 right-10 w-40 h-40 object-cover rounded-lg shadow-lg border border-green-200 transform rotate-[3deg] group-hover:scale-110 group-hover:rotate-[5deg] transition-transform duration-500 ease-in-out"
          width={160}
          height={160}
        />
        <div className="absolute inset-0 flex justify-center items-center -z-10">
          <div className="w-96 h-96 bg-green-100 rounded-full blur-xl opacity-30"></div>
        </div>
      </div>
    </section>
  );
}
