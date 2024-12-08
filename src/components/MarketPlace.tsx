import React from "react";

const MarketplaceCard = () => {
  const listings = [
    { product: "Tomatoes", price: "₹30/kg" },
    { product: "Onions", price: "₹25/kg" },
    { product: "Rice", price: "₹40/kg" },
  ];

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Marketplace for selling Produce</h2>
      <ul className="space-y-3">
        {listings.map((item, index) => (
          <li
            key={index}
            className="flex justify-between p-3 bg-gray-100 rounded-md"
          >
            <span>{item.product}</span>
            <span className="font-bold">{item.price}</span>
          </li>
        ))}
      </ul>
      <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        View More
      </button>
    </div>
  );
};

export default MarketplaceCard;
