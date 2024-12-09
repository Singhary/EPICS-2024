"use client";

import { useState } from "react";
import Image from "next/image";

const foodItems = [
  {
    id: 1,
    name: "Tomatoes",
    price: 5,
    image: "/tomatoes.jpeg",
  },
  {
    id: 2,
    name: "Onions",
    price: 6,
    image: "/onion.jpeg",
  },
  {
    id: 3,
    name: "Potatoes",
    price: 12,
    image: "/potatoes.jpeg",
  },
  {
    id: 4,
    name: "Coriander",
    price: 1.99,
    image: "/download.jpeg",
  },
  {
    id: 5,
    name: "Cauliflower",
    price: 6.99,
    image: "/cauliflower.jpeg",
  },
  {
    id: 6,
    name: "Bell Peppers",
    price: 5.99,
    image: "/capsicum.jpeg",
  },
];

function FoodCard({
  id,
  name,
  price,
  image,
  onBuy,
}: {
  id: number;
  name: string;
  price: number;
  image: string;
  onBuy: (item: { id: number; name: string; price: number }) => void;
}) {
  const [isAdded, setIsAdded] = useState(false);

  const handleBuy = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
    onBuy({ id, name, price });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        src={image}
        alt={name}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-gray-600 mb-4">${price.toFixed(2)}</p>
        <button
          onClick={handleBuy}
          className={`w-full py-2 px-4 rounded-full ${
            isAdded
              ? "bg-green-500 text-white"
              : "bg-blue-500 text-white hover:bg-blue-600"
          } transition-colors`}
          disabled={isAdded}
        >
          {isAdded ? "Added to Cart!" : "Buy Now"}
        </button>
      </div>
    </div>
  );
}

export default function FoodMarketplace() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-8 text-center p-12 text-bold ">
          Marketplace
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {foodItems.map((item) => (
            <FoodCard
              key={item.id}
              {...item}
              onBuy={(item) => console.log("Bought:", item)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
