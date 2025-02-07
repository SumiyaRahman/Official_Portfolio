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
          path: "project",
          element: <Project></Project>,
        },
        {
          path: "project/:id",
          element: <ViewDetails></ViewDetails>,
        }
      ],
    },
  ]);

  export default routes;