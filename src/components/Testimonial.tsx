import React from "react";

const farmerReviews = [
  {
    id: 1,
    name: "Ramesh Kumar",
    location: "Maharashtra, India",
    age: 45,
    image: "https://via.placeholder.com/100", // Replace with actual image URL
    video: "https://www.w3schools.com/html/mov_bbb.mp4", // Replace with actual video URL
    review:
      "This platform has revolutionized how I manage my crops and connect with the market.",
  },
  {
    id: 2,
    name: "Anita Sharma",
    location: "Punjab, India",
    age: 38,
    image: "https://via.placeholder.com/100",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    review:
      "I love the resources and insights provided for sustainable farming practices.",
  },
  {
    id: 3,
    name: "Mukesh Yadav",
    location: "Uttar Pradesh, India",
    age: 50,
    image: "https://via.placeholder.com/100",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    review:
      "The support and tools on this website have boosted my farm's productivity significantly.",
  },
  {
    id: 4,
    name: "Lalita Devi",
    location: "Rajasthan, India",
    age: 42,
    image: "https://via.placeholder.com/100",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    review:
      "This website has brought modern farming methods closer to farmers like me.",
  },
];

const Testimonials = () => {
  return (
    <div className="bg-green-50 py-12">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
        What Farmers Are Saying
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 px-24">
        {farmerReviews.map((farmer) => (
          <div
            key={farmer.id}
            className="bg-white shadow-xl rounded-xl translate-x-3 transition-all overflow-hidden max-w-xl"
          >
            <div className="p-4">
              <p className="text-gray-600 italic text-center mb-4">
                “{farmer.review}”
              </p>
            </div>
            <div className="flex items-center space-x-4 px-4">
              <img
                src={farmer.image}
                alt={farmer.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {farmer.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {farmer.age} years old, {farmer.location}
                </p>
              </div>
            </div>
            <div className="p-4">
              <video
                src={farmer.video}
                controls
                className="w-full h-48 rounded-lg border-2 border-gray-200 shadow-lg"
              ></video>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
