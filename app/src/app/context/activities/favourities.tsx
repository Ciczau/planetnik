import React, { useState, useEffect, useCallback, useMemo } from "react";

import { useUserContext } from "../user";
import { IActivity, IActivityType } from "../../types/activity";
import { getFavouritesByUserIdRequest } from "../../api/activityRequests";

interface DefaultState {
  favourites: IActivityType[];
  setFavourites: React.Dispatch<React.SetStateAction<IActivityType[]>>;
}

export const FavouritesContext = React.createContext<DefaultState>({
  favourites: [],
  setFavourites: () => {},
});

export const useFavouritesContext = () => {
  const context = React.useContext(FavouritesContext);
  return context;
};

interface Props {
  children: React.ReactNode;
}

export const FavouritesProvider = ({ children }: Props) => {
  const user = useUserContext();
  const [favourites, setFavourites] = useState<IActivityType[]>([]);

  useEffect(() => {
    const getFavourites = async (userId: string) => {
      const res = await getFavouritesByUserIdRequest(userId);
      console.log(res);
      if (res.success) {
        setFavourites(res.activityTypes);
      }
    };
    if (user?._id) {
      getFavourites(user._id);
    }
  }, [user]);

  const value = useMemo(() => {
    return { favourites, setFavourites };
  }, [favourites, setFavourites]);

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};
