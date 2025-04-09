"use client";

import React from "react";

const AboutUs = () => {
  // Team members data
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former farmer with 15 years of experience in sustainable agriculture practices.",
    },
    {
      name: "Michael Chen",
      role: "Agricultural Specialist",
      bio: "Agricultural engineer focused on helping small farmers implement efficient irrigation systems.",
    },
    {
      name: "Priya Patel",
      role: "Community Manager",
      bio: "Dedicated to building strong connections between farmers and creating support networks.",
    },
  ];

  // Services offered
  const services = [
    {
      title: "Marketplace",
      description:
        "Connect directly with consumers and sell your produce without intermediaries.",
      icon: "🛒",
    },
    {
      title: "Knowledge Hub",
      description:
        "Access guides, tutorials and expert advice on sustainable farming practices.",
      icon: "📚",
    },
    {
      title: "Equipment Sharing",
      description:
        "Find and share farming equipment with other farmers in your community.",
      icon: "🚜",
    },
    {
      title: "Weather Insights",
      description:
        "Get localized weather forecasts and climate data to plan your farming activities.",
      icon: "☀️",
    },
  ];

  return (
    <div className="bg-green-50 py-16">
      <div className="container mx-auto px-4">
        {/* Hero section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
            Empowering Farmers, Growing Communities
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Were dedicated to supporting sustainable agriculture by connecting
            farmers with resources, knowledge, and markets they need to thrive
            in todays changing world.
          </p>
        </div>

        {/* Our mission */}
        <div className="flex flex-col md:flex-row items-center mb-20 gap-8">
          <div className="w-full md:w-1/2 bg-green-200 h-80 md:h-96 rounded-lg flex items-center justify-center">
            <div className="text-center text-green-800 p-8">
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-2xl font-bold">Sustainable Farming</h3>
              <p className="mt-2">
                Supporting eco-friendly agricultural practices across
                communities
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-green-800 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              We believe in a future where farmers are equipped with the tools,
              knowledge, and connections they need to build sustainable and
              profitable businesses.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Our platform was created by farmers, for farmers. We understand
              the challenges faced by agricultural communities and have designed
              solutions that address real needs.
            </p>
            <p className="text-lg text-gray-700">
              Through technology and community building, we aim to revitalize
              rural economies and promote environmentally responsible farming
              practices.
            </p>
          </div>
        </div>

        {/* Services */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">
            How We Help
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-green-700 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="w-40 h-40 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-4xl text-green-600">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-green-700">
                  {member.name}
                </h3>
                <p className="text-green-600 mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-green-100 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">
            What Farmers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md italic">
              <div className="text-3xl text-green-500 mb-4"></div>
              <p className="text-gray-700 mb-4">
                This platform has completely transformed how I run my farm. Ive
                connected with local buyers and increased my profits by 40% this
                year alone.
              </p>
              <p className="font-semibold text-green-700">
                - John D., Organic Vegetable Farmer
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md italic">
              <div className="text-3xl text-green-500 mb-4"></div>
              <p className="text-gray-700 mb-4">
                The equipment sharing program saved me thousands of dollars.
                Instead of buying a new tractor, I found one to borrow from a
                neighboring farm.
              </p>
              <p className="font-semibold text-green-700">
                - Maria S., Small-scale Dairy Farmer
              </p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-green-800 mb-6">
            Join Our Community
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Become part of a growing network of farmers who are sharing
            knowledge, resources, and support.
          </p>
          <button className="bg-green-600 text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-green-700 transition-colors">
            Sign Up Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
