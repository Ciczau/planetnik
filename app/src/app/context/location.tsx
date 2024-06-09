import React, { useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";

import { TUser } from "../types/user";
import { tokenRequest } from "../api/userRequests";
import { TLocation } from "../types/location";
import { getActivitiesForCoordinates } from "../api/weatherRequests";

export const LocationContext = React.createContext<TLocation | null>(null);

export const useLocationContext = () => {
  const context = React.useContext(LocationContext);
  return context;
};

interface Props {
  children: React.ReactNode;
}

export const LocationProvider = ({ children }: Props) => {
  const [location, setLocation] = useState<TLocation | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({ loaded: true, error: "Geolocation is not supported" });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const res = await getActivitiesForCoordinates(latitude, longitude);

        if (res.activities) {
          setLocation({
            latitude,
            longitude,
            loaded: true,
            activities: res.activities || [],
          });
        }
      },
      (error) => {
        setLocation({ error: "Allow location to use this app!", loaded: true });
      }
    );
  }, []);

  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  );
};
