import { useState } from "react";

interface useCRUDProps {
  endPoint: string;
  crud?: string;
  data?: null;
}

const useCRUD = (): [
  (endPoint: string, crud: string, data?: any) => Promise<void>,
  { responseData: any; loading: boolean; error: string | null }
] => {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCrud = async (endPoint: string, crud: string, data: any = null) => {
    setLoading(true);
    const headers = { "Content-Type": "application/json" };
    let response;

    try {
      // CRUD işlemi için uygun metodu seç
      switch (crud) {
        case "create":
          response = await fetch(endPoint, {
            method: "POST",
            headers,
            body: JSON.stringify(data), // Yeni veri gönder
          });
          break;

        case "read":
          response = await fetch(endPoint, {
            method: "GET",
            headers,
          });
          break;

        case "update":
          response = await fetch(endPoint, {
            method: "PUT",
            headers,
            body: JSON.stringify({ ...data }),
          });
          break;

        case "delete":
          response = await fetch(endPoint, {
            method: "DELETE",
            headers,
            body: JSON.stringify({ ...data }),
          });
          break;

        default:
          throw new Error("Invalid CRUD operation");
      }

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setResponseData(result);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return [handleCrud, { responseData, loading, error }];
};

export default useCRUD;
