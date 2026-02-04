// RepairsProvider (only the relevant parts)
import { createContext, useContext, useState, useRef } from "react";

const RepairContext = createContext(null);
export const useRepair = () => useContext(RepairContext);

const RepairsProvider = ({ children }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [loading, setLoading] = useState(false); // global if useful
  const [loadingBrands, setLoadingBrands] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);
  const [loadingPrices, setLoadingPrices] = useState(false);
  const [error, setError] = useState(null);

  // simple caches
  const cache = useRef({
    brands: null,
    phoneModels: new Map(), // keyed by BrandId or Id depending on request
    pricesByBrand: new Map(), // BrandId -> prices array
    pricesByModel: new Map(), // ModelId -> prices array
  });

  const request = async (url, options = {}) => {
    // options.signal can be used to cancel
    setError(null);
    try {
      const res = await fetch(url, options);
      const data = await res.json();
      if (!res.ok || data?.succeeded === false) {
        throw new Error(data?.message || "Something went wrong");
      }
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // BRANDS
  const getBrands = async (params = {}, { force = false, signal } = {}) => {
    if (cache.current.brands && !force) return cache.current.brands;
    setLoadingBrands(true);
    const query = new URLSearchParams(params).toString();
    try {
      const data = await request(`${baseUrl}/api/Brands?${query}`, { signal });
      cache.current.brands = data;
      return data;
    } finally {
      setLoadingBrands(false);
    }
  };

  // PHONE MODELS (by BrandId or by Id)
  const getPhoneModels = async (params = {}, { force = false, signal } = {}) => {
    const key = JSON.stringify(params);
    if (cache.current.phoneModels.has(key) && !force) {
      return cache.current.phoneModels.get(key);
    }
    setLoadingModels(true);
    const query = new URLSearchParams(params).toString();
    try {
      const data = await request(`${baseUrl}/api/PhoneModels?${query}`, { signal });
      cache.current.phoneModels.set(key, data);
      return data;
    } finally {
      setLoadingModels(false);
    }
  };

  // PRICES - support fetching by BrandId or PhoneModelId
  const getPrices = async (params = {}, { force = false, signal } = {}) => {
    if (params.BrandId) {
      const cached = cache.current.pricesByBrand.get(params.BrandId);
      if (cached && !force) return cached;
    }
    if (params.PhoneModelId) {
      const cached = cache.current.pricesByModel.get(params.PhoneModelId);
      if (cached && !force) return cached;
    }

    setLoadingPrices(true);
    const query = new URLSearchParams(params).toString();
    try {
      const data = await request(`${baseUrl}/api/Prices?${query}`, { signal });
      // store into caches if possible
      if (params.BrandId) cache.current.pricesByBrand.set(params.BrandId, data);
      if (params.PhoneModelId) cache.current.pricesByModel.set(params.PhoneModelId, data);
      return data;
    } finally {
      setLoadingPrices(false);
    }
  };

  const getPhoneParts = async (params = {}, { force = false, signal } = {}) => {
  if (cache.current.phoneParts && !force) {
    return cache.current.phoneParts;
  }

  setLoading(true);
  const query = new URLSearchParams(params).toString();

  try {
    const data = await request(`${baseUrl}/api/PhoneParts?${query}`, { signal });
    cache.current.phoneParts = data;
    return data;
  } finally {
    setLoading(false);
  }
};


  const value = {
    loading, error,
    loadingBrands, loadingModels, loadingPrices,
    getBrands, getPhoneModels, getPrices, getPhoneParts,
    // ... create/update functions unchanged
  };

  return <RepairContext.Provider value={value}>{children}</RepairContext.Provider>;
};

export default RepairsProvider;
