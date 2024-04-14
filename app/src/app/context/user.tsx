import React, { useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";

import { TUser } from "../types/user";
import { tokenRequest } from "../api/userRequests";

export const UserContext = React.createContext<TUser | null>(null);

export const useUserContext = () => {
  const context = React.useContext(UserContext);
  return context;
};

interface Props {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const [cookie] = useCookies(["refreshToken"]);
  const [user, setUser] = useState<TUser | null>(null);

  const refreshToken = useCallback(async () => {
    const token = cookie.refreshToken;
    const res = await tokenRequest(token);
    if (res.success) {
      const decoded: TUser = jwtDecode(res.token);
      setUser(decoded);
    }
  }, [cookie.refreshToken, setUser]);

  useEffect(() => {
    if (cookie.refreshToken) {
      refreshToken();
    }
  }, [cookie, refreshToken]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
