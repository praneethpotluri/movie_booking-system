import { createContext, useContext, useEffect, useState } from 'react';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocationData = async (latitude, longitude) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();
        const userState = data?.address?.state || '';
        const userCity = data?.address?.city || data?.address?.town || '';
        const userLocation = userState || userCity;

        if (userLocation) {
          setLocation(userLocation);
          setState(userState);
          setCity(userCity);
          setError(null);
        } else {
          setError('Unable to determine your location.');
        }
      } catch (err) {
        setError('Failed to fetch location data.');
      } finally {
        setLoading(false);
      }
    };

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchLocationData(latitude, longitude);
      },
      () => {
        setError('Unable to retrieve location. Please allow location access.');
        setLoading(false);
      }
    );
  }, []);

  return (
    <LocationContext.Provider value={{ location, state, city, loading, error }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
