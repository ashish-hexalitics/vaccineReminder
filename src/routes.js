import React from "react";
import { Navigate } from "react-router-dom";
import { Icon } from "@chakra-ui/react";
import {
  // MdBarChart,
  MdPerson,
  MdHome,
  MdVaccines,
  MdPersonAdd,
  MdLocalHospital,
} from "react-icons/md";
// Admin Imports
// import MainDashboard from "./views/admin/default";
import NFTMarketplace from "./views/admin/marketplace";
import Profile from "./views/admin/profile";
// import DataTables from "./views/admin/dataTables";
import RTL from "./views/admin/rtl";

// Auth Imports
// import SignInCentered from "./views/auth/signIn";
import Login from "./pages/Auth/Login";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import VaccineTemplates from "./pages/VaccineManagement/VaccineTemplates";
import AdminList from "./pages/AdminManagement/AdminList";
import CreateUser from "./pages/UsersManagement/CreateUser";
import CreateDoctor from "./pages/DoctorManagement/CreateDoctor";

import Home from "./views/Landing";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/dashboard",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
  {
    name: "Vaccine Templates List",
    layout: "/admin",
    path: "/vaccine-list",
    icon: <Icon as={MdVaccines} width="20px" height="20px" color="inherit" />,
  },
  {
    name: "Admin List",
    layout: "/admin",
    path: "/list",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  },
  {
    name: "Create User",
    layout: "/admin",
    path: "/create-users",
    icon: <Icon as={MdPersonAdd} width="20px" height="20px" color="inherit" />,
  },
  // {
  //   name: "Create Doctors",
  //   layout: "/admin",
  //   path: "/create-doctors",
  //   icon: <Icon as={MdLocalHospital} width="20px" height="20px" color="inherit" />,
  // },
];

// {
//   name: "NFT Marketplace",
//   layout: "/admin",
//   path: "/nft-marketplace",
//   icon: (
//     <Icon
//       as={MdOutlineShoppingCart}
//       width="20px"
//       height="20px"
//       color="inherit"
//     />
//   ),
//   secondary: true,
// },
// {
//   name: "Profile",
//   layout: "/admin",
//   path: "/profile",
//   icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
// },
// {
//   name: "Sign In",
//   layout: "/auth",
//   path: "/sign-in",
//   icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
// },
// {
//   name: "RTL Admin",
//   layout: "/rtl",
//   path: "/rtl-default",
//   icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
// },

const Authmiddleware = (props) => {
  if (!localStorage.getItem("authUser")) {
    return (
      <Navigate
        to={{ pathname: "/auth/sign-in", state: { from: props.location } }}
      />
    );
  }
  return <React.Fragment>{props.children}</React.Fragment>;
};

const NonAuthLayout = (props) => {
  const authRole = localStorage.getItem("authRole");
  if (
    localStorage.getItem("authUser") &&
    authRole &&
    "/logout" !== window.location.pathname
  ) {
    return (
      <Navigate
        to={{
          pathname: `/${authRole}/dashboard`,
          state: { from: props.location },
        }}
      />
    );
  }
  return <React.Fragment>{props.children}</React.Fragment>;
};

const authProtectedRoutes = [
  {
    path: "/:roleName/dashboard",
    component: <AdminDashboard />,
  },
  {
    path: "/admin/vaccine-list",
    component: <VaccineTemplates />,
  },
  {
    path: "/admin/list",
    component: <AdminList />,
  },
  {
    path: "/admin/create-users",
    component: <CreateUser />,
  },
  // {
  //   path: "/admin/create-doctors",
  //   component: <CreateDoctor />,
  // },
  {
    path: "/admin/nft-marketplace",
    component: <NFTMarketplace />,
  },
  {
    path: "/admin/profile",
    component: <Profile />,
  },
  {
    path: "/rtl/rtl-default",
    component: <RTL />,
  },
];

const publicRoutes = [
  { path: "/auth/sign-in", component: <Login /> },
  { path: "/", component: <Home /> },
];

export {
  Authmiddleware,
  NonAuthLayout,
  publicRoutes,
  authProtectedRoutes,
  routes,
};

// export default routes;
