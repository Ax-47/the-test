import { useState, useEffect } from "react";

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, { cache: "no-cache" });
        if (!response.ok) throw new Error((await response.json()).error);
        const result: T = await response.json();
        setData(result);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);
  const mutate = () => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, { cache: "no-cache" });
        if (!response.ok) throw new Error("Network response was not ok");
        const result: T = await response.json();
        setData(result);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  };
  return { data, error, loading, mutate };
};

export default useFetch;