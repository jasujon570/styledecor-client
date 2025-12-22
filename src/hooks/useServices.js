import { useState, useEffect } from "react";
import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/",
});

const useServices = () => {
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchServices = async () => {
      try {
        const res = await axiosPublic.get("/mockServices.json");
        if (isMounted) {
          setAllServices(res.data);
        }
      } catch (err) {
        console.error("Error fetching services in hook:", err);

        let errorMessage = "An unknown error occurred while fetching services.";

        if (axios.isAxiosError(err) && err.response) {
          errorMessage = `API Error: ${err.response.status} - ${err.response.statusText}`;
        } else if (err.message) {
          errorMessage = `Fetch Error: ${err.message}`;
        }

        if (isMounted) {
          setError(errorMessage);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchServices();

    return () => {
      isMounted = false;
    };
  }, []);

  return { allServices, loading, error };
};

export default useServices;
