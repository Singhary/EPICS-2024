"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample MSP data for crops in India
// In a real application, this would come from an API or database
const cropData = [
  {
    id: 1,
    name: "Paddy",
    category: "Kharif",
    msp: 2183,
    unit: "per quintal",
    year: "2023-24",
  },
  {
    id: 2,
    name: "Wheat",
    category: "Rabi",
    msp: 2275,
    unit: "per quintal",
    year: "2023-24",
  },
  {
    id: 3,
    name: "Maize",
    category: "Kharif",
    msp: 2090,
    unit: "per quintal",
    year: "2023-24",
  },
  {
    id: 4,
    name: "Jowar",
    category: "Kharif",
    msp: 3100,
    unit: "per quintal",
    year: "2023-24",
  },
  {
    id: 5,
    name: "Bajra",
    category: "Kharif",
    msp: 2350,
    unit: "per quintal",
    year: "2023-24",
  },
  {
    id: 6,
    name: "Ragi",
    category: "Kharif",
    msp: 3700,
    unit: "per quintal",
    year: "2023-24",
  },
  {
    id: 7,
    name: "Tur Dal (Arhar)",
    category: "Pulses",
    msp: 7000,
    unit: "per quintal",
    year: "2023-24",
  },
  {
    id: 8,
    name: "Moong",
    category: "Pulses",
    msp: 8558,
    unit: "per quintal",
    year: "2023-24",
  },
  {
    id: 9,
    name: "Urad",
    category: "Pulses",
    msp: 7000,
    unit: "per quintal",
    year: "2023-24",
  },
  {
    id: 10,
    name: "Groundnut",
    category: "Oilseeds",
    msp: 6377,
    unit: "per quintal",
    year: "2023-24",
  },
  {
    id: 11,
    name: "Soybean",
    category: "Oilseeds",
    msp: 4600,
    unit: "per quintal",
    year: "2023-24",
  },
  {
    id: 12,
    name: "Sunflower",
    category: "Oilseeds",
    msp: 6760,
    unit: "per quintal",
    year: "2023-24",
  },
  {
    id: 13,
    name: "Sesame",
    category: "Oilseeds",
    msp: 8635,
    unit: "per quintal",
    year: "2023-24",
  },
  {
    id: 14,
    name: "Cotton",
    category: "Fiber",
    msp: 6620,
    unit: "per quintal",
    year: "2023-24",
  },
  {
    id: 15,
    name: "Jute",
    category: "Fiber",
    msp: 5050,
    unit: "per quintal",
    year: "2023-24",
  },
  {
    id: 16,
    name: "Gram",
    category: "Rabi",
    msp: 5450,
    unit: "per quintal",
    year: "2023-24",
  },
  {
    id: 17,
    name: "Lentil (Masur)",
    category: "Rabi",
    msp: 6425,
    unit: "per quintal",
    year: "2023-24",
  },
  {
    id: 18,
    name: "Rapeseed & Mustard",
    category: "Rabi",
    msp: 5650,
    unit: "per quintal",
    year: "2023-24",
  },
  {
    id: 19,
    name: "Safflower",
    category: "Rabi",
    msp: 5650,
    unit: "per quintal",
    year: "2023-24",
  },
  {
    id: 20,
    name: "Sugarcane",
    category: "Others",
    msp: 315,
    unit: "per quintal",
    year: "2023-24",
  },
];

const categories = [
  "All",
  "Kharif",
  "Rabi",
  "Pulses",
  "Oilseeds",
  "Fiber",
  "Others",
];

export default function CropMspDisplay() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter crops based on search term and selected category
  const filteredCrops = cropData.filter((crop) => {
    const matchesSearch = crop.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || crop.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="Search crops..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCrops.map((crop) => (
          <Card
            key={crop.id}
            className="overflow-hidden border-l-4 border-l-green-600 hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-green-800">
                    {crop.name}
                  </h3>
                </div>
                <div className="bg-green-100 px-2 py-1 rounded text-xs text-green-800">
                  {crop.category}
                </div>
              </div>
              <div className="mt-4 flex justify-between items-end">
                <div>
                  <p className="text-sm text-gray-500">MSP ({crop.year})</p>
                  <p className="text-2xl font-bold text-green-700">
                    ₹{crop.msp}
                  </p>
                  <p className="text-xs text-gray-500">{crop.unit}</p>
                </div>
                <div className="bg-green-50 px-3 py-1 rounded-full text-green-700 text-sm">
                  FRP
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCrops.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No crops found. Please change your search.
          </p>
        </div>
      )}

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>
          Note: These MSP values are for reference only. Contact the Agriculture
          Department for more information.
        </p>
      </div>
    </div>
  );
}
