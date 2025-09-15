import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import { isLoggedIn } from "../utils/localStorageUtils";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

function AppLayout() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("home");
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/auth", { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <Navbar tab={tab} setTab={setTab} />

      <div className="flex justify-center align-center overflow-x-auto">
        <Outlet />
      </div>
    </>
  );
}

export default AppLayout;
