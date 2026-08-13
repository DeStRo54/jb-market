"use client";

import { ReactNode, useState } from "react";

import { UserContext, UserState } from "./UserContext";

interface UserProviderProps {
  user: UserState;
  children: ReactNode;
}

export const UserProvider = ({ user, children }: UserProviderProps) => {
  const [userState, setUserState] = useState<UserState>(user);

  const setUser = (newUser: UserState) => setUserState(newUser);

  return (
    <UserContext
      value={{
        value: userState,
        set: setUser,
      }}
    >
      {children}
    </UserContext>
  );
};
