"use client";

import { useState, useEffect } from "react";

interface SidebarProps {
  setModel: (model: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setModel }) => {
  const [documents, setDocuments] = useState<{ id: string; filename: string }[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const modelOptions = ["gemini-1.5-flash", "gemini-1.5-pro"];

  const fetchDocuments = async () => {
    const response = await fetch("/api/list-docs");
    const data = await response.json();
    setDocuments(data);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    const response = await fetch("/api/upload-doc", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      fetchDocuments();
      setSelectedFile(null);
    }
  };

  const handleDelete = async (fileId: string) => {
    const response = await fetch("/api/delete-doc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file_id: fileId }),
    });

    if (response.ok) {
      fetchDocuments();
    }
  };

  return (
    <div className="w-1/4 p-6 bg-gray-200">
      <h2 className="text-lg font-bold mb-4">Chatbot Controls</h2>
      <select
        onChange={(e) => setModel(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      >
        {modelOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <input
        type="file"
        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
        className="mb-4"
        accept=".pdf,.docx,.html"
      />
      <button
        onClick={handleUpload}
        className="w-full p-2 bg-green-500 text-white rounded mb-4"
        disabled={!selectedFile}
      >
        Upload
      </button>

      {/* <h3 className="text-md font-semibold mb-2">Uploaded Documents</h3>
      <button
        onClick={fetchDocuments}
        className="w-full p-2 bg-blue-500 text-white rounded mb-4"
      >
        Refresh
      </button> */}
      {documents.map((doc) => (
        <div key={doc.id} className="flex justify-between items-center mb-2">
          <span>{doc.filename}</span>
          <button
            onClick={() => handleDelete(doc.id)}
            className="p-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;