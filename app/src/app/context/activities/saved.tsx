import React, { useState, useEffect, useCallback, useMemo } from "react";

import { useUserContext } from "../user";
import { IActivity } from "../../types/activity";
import { getSavedActivitiesByUserIdRequest } from "../../api/activityRequests";

type DefaultState = {
  saved: IActivity[];
  setSaved: React.Dispatch<React.SetStateAction<IActivity[]>>;
};

export const SavedActivitiesContext = React.createContext<DefaultState>({
  saved: [],
  setSaved: () => {},
});

export const useSavedActivitiesContext = () => {
  const context = React.useContext(SavedActivitiesContext);
  return context;
};

interface Props {
  children: React.ReactNode;
}

export const SavedActivitiesProvider = ({ children }: Props) => {
  const user = useUserContext();
  const [saved, setSaved] = useState<IActivity[]>([]);

  useEffect(() => {
    const getSaved = async (userId: string) => {
      const res = await getSavedActivitiesByUserIdRequest(userId);
      if (res.success) {
        setSaved(res.saved);
      }
    };
    if (user?._id) {
      getSaved(user._id);
    }
  }, [user]);

  const value = useMemo(() => {
    return { saved, setSaved };
  }, [saved, setSaved]);

  return (
    <SavedActivitiesContext.Provider value={value}>
      {children}
    </SavedActivitiesContext.Provider>
  );
};
