"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingCart, X, Plus, Minus } from "lucide-react";

const foodItems = [
  {
    id: 1,
    name: "Tomatoes",
    price: 80,
    image: "/tomatoes.jpeg",
  },
  {
    id: 2,
    name: "Onions",
    price: 65,
    image: "/onion.jpeg",
  },
  {
    id: 3,
    name: "Potatoes",
    price: 120,
    image: "/potatoes.jpeg",
  },
  {
    id: 4,
    name: "Coriander",
    price: 180,
    image: "/download.jpeg",
  },
  {
    id: 5,
    name: "Cauliflower",
    price: 60,
    image: "/cauliflower.jpeg",
  },
  {
    id: 6,
    name: "Bell Peppers",
    price: 50,
    image: "/capsicum.jpeg",
  },
];

// Define the cart item type
type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

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
  onBuy: (item: {
    id: number;
    name: string;
    price: number;
    image: string;
  }) => void;
}) {
  const [isAdded, setIsAdded] = useState(false);

  const handleBuy = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
    onBuy({ id, name, price, image });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        src={image || "/placeholder.svg"}
        alt={name}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-gray-600 mb-4">Rs.{price.toFixed(2)}</p>
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

function CartPanel({
  cart,
  isOpen,
  onClose,
  onRemove,
  onUpdateQuantity,
}: {
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}) {
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-grow flex items-center justify-center">
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center py-4 border-b border-gray-200"
                >
                  <div className="h-16 w-16 relative mr-4">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        onUpdateQuantity(
                          item.id,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total:</span>
                <span className="font-bold">${totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={() => alert("Checkout functionality would go here!")}
                className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function FoodMarketplace() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartAnimation, setCartAnimation] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (item: {
    id: number;
    name: string;
    price: number;
    image: string;
  }) => {
    setCart((prevCart) => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex >= 0) {
        // Item exists, increase quantity
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      } else {
        // Item doesn't exist, add new item
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });

    // Animate cart icon
    setCartAnimation(true);
    setTimeout(() => setCartAnimation(false), 300);

    // Open cart if it's the first item
    if (cart.length === 0) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isCartOpen &&
        !target.closest(".cart-panel") &&
        !target.closest(".cart-button")
      ) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen]);

  return (
    <div className="">
      <main className="container mx-auto px-4 mt-20">
        <div className="flex justify-between items-center mb-8 pt-6">
          <h2 className="text-3xl font-bold">Marketplace</h2>
          <button
            className={`cart-button relative p-2 rounded-full hover:bg-gray-100 ${
              cartAnimation ? "animate-bounce" : ""
            }`}
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {foodItems.map((item) => (
            <FoodCard key={item.id} {...item} onBuy={addToCart} />
          ))}
        </div>
      </main>

      {/* Cart overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Cart panel */}
      <div className="cart-panel">
        <CartPanel
          cart={cart}
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
        />
      </div>
    </div>
  );
}
