"use client";

import { useState } from "react";

const FarmerAISidebar: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [pestResult, setPestResult] = useState<any>(null);
  const [soilData, setSoilData] = useState({ ph: "", nitrogen: "", phosphorus: "", potassium: "" });
  const [soilResult, setSoilResult] = useState<any>(null);
  const [previousCrop, setPreviousCrop] = useState("");
  const [rotationSuggestions, setRotationSuggestions] = useState<string[]>([]);

  const identifyPest = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("/api/pest-identification", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setPestResult(data);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const analyzeSoil = async () => {
    const response = await fetch("/api/soil-analysis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(soilData),
    });
    const data = await response.json();
    setSoilResult(data);
  };

  const getRotationSuggestions = async () => {
    const response = await fetch("/api/crop-rotation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ previousCrop }),
    });
    const data = await response.json();
    setRotationSuggestions(data.suggestions);
  };

  return (
    <div className="w-1/4 p-6 bg-gray-200">
      <h2 className="text-lg font-bold mb-4">Farmer AI Tools</h2>

      {/* Pest Identification */}
      <h3 className="text-md font-semibold mb-2">Pest Identification</h3>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="mb-2"
        accept="image/*"
      />
      <button
        onClick={identifyPest}
        className="w-full p-2 bg-green-500 text-white rounded mb-4"
        disabled={!image}
      >
        Identify Pest
      </button>
      {pestResult && (
        <div className="mb-4">
          <p>
            Pest: {pestResult[0]?.label || "Unknown"} (
            {(pestResult[0]?.score * 100).toFixed(2) || "N/A"}%)
          </p>
        </div>
      )}

      {/* Soil Health Analysis */}
      <h3 className="text-md font-semibold mb-2">Soil Health Analysis</h3>
      <input
        type="number"
        value={soilData.ph}
        onChange={(e) => setSoilData({ ...soilData, ph: e.target.value })}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Soil pH (e.g., 6.5)"
      />
      <input
        type="number"
        value={soilData.nitrogen}
        onChange={(e) => setSoilData({ ...soilData, nitrogen: e.target.value })}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Nitrogen (mg/kg)"
      />
      <input
        type="number"
        value={soilData.phosphorus}
        onChange={(e) => setSoilData({ ...soilData, phosphorus: e.target.value })}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Phosphorus (mg/kg)"
      />
      <input
        type="number"
        value={soilData.potassium}
        onChange={(e) => setSoilData({ ...soilData, potassium: e.target.value })}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Potassium (mg/kg)"
      />
      <button
        onClick={analyzeSoil}
        className="w-full p-2 bg-blue-500 text-white rounded mb-4"
      >
        Analyze Soil
      </button>
      {soilResult && (
        <div className="mb-4">
          <p>Health Score: {soilResult.healthScore.toFixed(2)}</p>
          <p className="mt-2">Recommendation:</p>
          <p className="text-sm whitespace-pre-wrap">{soilResult.recommendation}</p>
          {soilResult.analysisDetails && (
            <>
              <p className="mt-2 font-semibold">Full Analysis:</p>
              <p className="text-sm whitespace-pre-wrap">{soilResult.analysisDetails}</p>
            </>
          )}
          {soilResult.error && <p className="text-red-500">Error: {soilResult.error}</p>}
        </div>
      )}

      {/* Crop Rotation Suggestions */}
      <h3 className="text-md font-semibold mb-2">Crop Rotation Suggestions</h3>
      <input
        type="text"
        value={previousCrop}
        onChange={(e) => setPreviousCrop(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Previous Crop (e.g., Wheat)"
      />
      <button
        onClick={getRotationSuggestions}
        className="w-full p-2 bg-yellow-500 text-white rounded mb-4"
      >
        Get Suggestions
      </button>
      {rotationSuggestions.length > 0 && (
        <div className="mb-4">
          <p>Suggestions: {rotationSuggestions.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default FarmerAISidebar;