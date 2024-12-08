import React from "react";
import { Cloud, DollarSign, PhoneCall } from "lucide-react";

const faqItems = [
  {
    question: "How do I use the SMS service?",
    answer: "Simply send a keyword like '1' to our designated number, and you'll receive updates instantly.",
  },
  {
    question: "What does the service cost?",
    answer: "Our SMS services are free for farmers to ensure accessibility and ease of use.",
  },
  {
    question: "Can I get updates in my local language?",
    answer: "Yes, our bot supports multiple regional languages for convenience.",
  },
];

const steps = [
  {
    step: "Step 1",
    description: "Send a message with a specific code (e.g., '1' for weather updates) to our number.",
  },
  {
    step: "Step 2",
    description: "Our system processes your request and retrieves the required information.",
  },
  {
    step: "Step 3",
    description: "Receive a detailed SMS response with the requested information directly on your phone.",
  },
];

const importancePoints = [
  {
    title: "Accessible Anywhere",
    description:
      "Farmers in remote areas can access vital updates without internet, empowering them with timely information.",
    imgSrc: "accessible.png",
  },
  {
    title: "Empowers Decision-Making",
    description:
      "Real-time weather, market, and emergency updates enable farmers to make informed decisions.",
    imgSrc: "empowerment.png",
  },
];

const KeypadSolution = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
     
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Keypad Solution for Farmers</h1>
        <p className="mt-4 text-gray-600 text-lg">
          Empowering rural farmers with SMS-based solutions for weather updates, crop prices, and emergency services.
        </p>
      </header>

    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
       
        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
          <Cloud className="h-12 w-12 mx-auto text-indigo-400" />
          <h3 className="mt-4 text-xl font-semibold text-gray-800">Weather Updates</h3>
          <p className="mt-2 text-gray-600">
            Send <strong>'1'</strong> to receive real-time weather updates tailored to your location.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
          <DollarSign className="h-12 w-12 mx-auto text-indigo-400" />
          <h3 className="mt-4 text-xl font-semibold text-gray-800">Crop Prices</h3>
          <p className="mt-2 text-gray-600">
            Send <strong>'2'</strong> to get the latest Minimum Support Prices (MSP) for crops.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
          <PhoneCall className="h-12 w-12 mx-auto text-indigo-400" />
          <h3 className="mt-4 text-xl font-semibold text-gray-800">Emergency Services</h3>
          <p className="mt-2 text-gray-600">
            Send <strong>'3'</strong> for emergency assistance or helpline information.
          </p>
        </div>
      </div>

      <div className="my-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">How It Works</h2>
        <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto gap-12">
          {steps.map((step, index) => (
            <div key={index} className="bg-white shadow-md p-6 rounded-lg w-full text-center">
              <h3 className="text-lg font-bold text-gray-800">{step.step}</h3>
              <p className="mt-2 text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="my-16 bg-gray-100 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Why Is This Solution Important?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {importancePoints.map((point, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center gap-6">
              <img
                src={point.imgSrc}
                alt={point.title}
                className="w-full md:w-1/2 rounded-lg shadow-md overflow-auto"
              />
              <div className="text-center md:text-left">
                <h3 className="text-lg font-semibold text-gray-800">{point.title}</h3>
                <p className="mt-2 text-gray-600">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="my-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">FAQs</h2>
        <div className="space-y-6">
          {faqItems.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeypadSolution;
