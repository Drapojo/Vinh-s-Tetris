import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth.ts";
import { appConfigs } from "../configs/app.ts";

export default function AdminLayout() {
  const navigate = useNavigate();
  const { isLoggedIn, currentUser } = useAuth();
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }
    if (currentUser?.email !== appConfigs.adminEmail) {
      navigate("/");
      return;
    }
  }, [navigate]);

  return <Outlet />;
}
