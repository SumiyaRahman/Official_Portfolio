import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Dashboard from "../admin/dashboard/Dashboard";
import BannerIntro from "../admin/adminComponent/BannerIntro";
import SocialLinks from "../admin/adminComponent/SocialLinks";
import AboutMe from "../admin/adminComponent/AboutMe";
import Skills from "../admin/adminComponent/Skills";
import EducationalQualification from "../admin/adminComponent/EducationalQualification";
import Project from "../admin/adminComponent/Project";
import ViewDetails from "../Pages/ViewDetails";
import Home from "../Pages/Home";
import Achievement from "../admin/adminComponent/Achievement";

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
        {
          path: "project/:id",
          element: <ViewDetails></ViewDetails>,
        }
      ]
    },
    {
      path: "admin/dashboard",
      element: <Dashboard></Dashboard>,
      children: [
        {
          path: "banner-intro",
          element: <BannerIntro></BannerIntro>,
        },
        {
          path: "about-me",
          element: <AboutMe></AboutMe>,
        },
        {
          path: "social-links",
          element: <SocialLinks></SocialLinks>,
        },
        {
          path: "skills",
          element: <Skills></Skills>,
        },
        {
          path: "educational-qualification",
          element: <EducationalQualification></EducationalQualification>,
        },
        {
          path: "achievement",
          element: <Achievement></Achievement>,
        },
        {
          path: "project",
          element: <Project></Project>,
        },
      ],
    },
  ]);

  export default routes;