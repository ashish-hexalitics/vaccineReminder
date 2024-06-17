import React, { useEffect, useContext } from "react";
import "assets/css/App.css";
import { BrowserRouter, Route, Routes, Navigate, json } from "react-router-dom";
import AuthLayout from "./layouts/auth";
import AdminLayout from "./layouts/admin";
import RtlLayout from "./layouts/rtl";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";
import {
  publicRoutes,
  NonAuthLayout,
  authProtectedRoutes,
  Authmiddleware,
} from "./routes";
import { AppContext } from "./contexts/AppContext";
import "toastr/build/toastr.min.css"


function App() {
  const { fetchUserData } = useContext(AppContext);
  const authUser = localStorage.getItem("authUser");

  useEffect(() => {
    if (typeof authUser === "string") {
      const user = JSON.parse(authUser);
      user && fetchUserData(JSON.parse(user?.id));
    }
  }, [authUser]);

  return (
    <ThemeEditorProvider>
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={<NonAuthLayout>{route.component}</NonAuthLayout>}
              key={idx}
              exact={true}
            />
          ))}
          {authProtectedRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <Authmiddleware>
                  <AdminLayout>{route.component}</AdminLayout>
                </Authmiddleware>
              }
              key={idx}
              exact={true}
            />
          ))}
          {/* <Route path="/auth/*" element={<AuthLayout />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeEditorProvider>
  );
}

export default App;
