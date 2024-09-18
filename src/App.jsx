import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayouts from "./layouts/app-layouts";
import Landing from "./pages/Landing";
import OnBoarding from "./pages/OnBoarding";
import JobListing from "./pages/JobListing";
import PostJobs from "./pages/PostJobs";
import MyJobs from "./pages/MyJobs";
import SavedJobs from "./pages/SavedJobs";
import Jobspage from "./pages/Jobspage";

const router = createBrowserRouter([
  {
    element: <AppLayouts />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/onboarding",
        element: <OnBoarding />,
      },
      {
        path: "/job/:id",
        element: <Jobspage />,
      },
      {
        path: "/jobs",
        element: <JobListing />,
      },
      {
        path: "/job-post",
        element: <PostJobs />,
      },
      {
        path: "/my-jobs",
        element: <MyJobs />,
      },
      {
        path: "/saved-jobs",
        element: <SavedJobs />,
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
