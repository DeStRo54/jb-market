"use client";

import { createContext } from "react";

import { User } from "@/generated/api";

export type UserState = User | null;

export interface UserContextValue {
  value: UserState;
  set: (user: UserState) => void;
}

export const UserContext = createContext<UserContextValue>({
  value: null,
  set: () => {},
});
