import { useNavigate } from "react-router-dom";
import {
  useGetUserDataQuery,
  useGetUserDetailQuery,
} from "../services/user.ts";

export const useAuth = () => {
  const navigate = useNavigate();
  const isLoggedIn = () => {
    return !!localStorage.getItem("access_token");
  };
  const { data: currentUser } = useGetUserDetailQuery(undefined, {
    skip: !isLoggedIn(),
  });
  const { data: currentUserData } = useGetUserDataQuery(undefined, {
    skip: !isLoggedIn(),
  });

  const login = (token: string) => {
    localStorage.setItem("access_token", token);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return { isLoggedIn, login, logout, currentUser, currentUserData };
};
