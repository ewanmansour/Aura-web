import { useEffect, useState } from "react";

export function useApiResource(path, fallbackValue) {
  const [data, setData] = useState(fallbackValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setLoading(true);
        const baseUrl = import.meta.env.VITE_API_URL || "";
        const response = await fetch(`${baseUrl}${path}`);

        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }

        const payload = await response.json();
        if (active) {
          setData(payload);
          setError("");
        }
      } catch (requestError) {
        if (active) {
          setData(fallbackValue);
          setError(requestError.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [path, fallbackValue]);

  return { data, loading, error };
}
