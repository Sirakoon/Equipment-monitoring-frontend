import { useCallback, useEffect, useState } from "react";

export default function useFetchData(fetchFn, immediate = true) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [fetchData, immediate]);

  return {
    data,
    setData,
    loading,
    error,
    refetch: fetchData,
  };
}