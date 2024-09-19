import React, { useEffect, useState } from "react";
import axios from "axios";

interface ProvinceFieldProps {
  formMode: "province" | "city" | "district" | "village";
  parentId?: string;
  onSelect: (id: string) => void;
}

interface Location {
  id: string;
  name: string;
}

const ProvinceField: React.FC<ProvinceFieldProps> = ({
  formMode,
  parentId,
  onSelect,
}) => {
  const [options, setOptions] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getApiUrl = (): string | null => {
    switch (formMode) {
      case "province":
        return "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json";
      case "city":
        return parentId
          ? `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${parentId}.json`
          : null;
      case "district":
        return parentId
          ? `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${parentId}.json`
          : null;
      case "village":
        return parentId
          ? `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${parentId}.json`
          : null;
      default:
        return null;
    }
  };

  // Fetch options from API
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const apiUrl = getApiUrl();
        if (!apiUrl) return;

        const response = await axios.get(apiUrl);
        setOptions(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data: ", err);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchOptions();
  }, [formMode, parentId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <label
        htmlFor={formMode}
        className="block text-sm font-medium text-gray-700"
      >
        {formMode.charAt(0).toUpperCase() + formMode.slice(1)}
      </label>
      <select
        id={formMode}
        name={formMode}
        className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">Select a {formMode}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProvinceField;
