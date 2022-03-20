import { useEffect, useState } from "react";

const useRequest = (services: any) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const request = async () => {
    setLoading(true);
    try {
      const result = await services();
      setResult(result);
    } catch (reason) {
      setError(reason);
    }
    setLoading(false);
  };

  useEffect(() => {
    request();
  }, []);

  return {
    loading,
    result,
    error,
  };
};

export default useRequest;
