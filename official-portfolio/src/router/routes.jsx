import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Dashboard from "../admin/dashboard/Dashboard";
import AboutMe from "../admin/adminComponent/AboutMe";

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
    },
    {
      path: "admin/dashboard",
      element: <Dashboard></Dashboard>,
      children: [
        {
          path: "about-me",
          element: <AboutMe></AboutMe>,
        },
      ],
    },
  ]);

  export default routes;