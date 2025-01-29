import { createContext } from "react";
import { AuthContextType, BlogContextType, SeachContextType, UserInfoContext } from "../type/types";

export const BlogContext = createContext<BlogContextType | null>(null);
export const Authcontext = createContext<AuthContextType | null>(null);
export const UserContext = createContext<UserInfoContext | undefined>(undefined);
export const searchpopover = createContext<SeachContextType | undefined>(undefined);