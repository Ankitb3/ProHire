import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayouts from "./layouts/app-layouts";
import Landing from "./pages/Landing";
import OnBoarding from "./pages/OnBoarding";
import JobListing from "./pages/JobListing";
import PostJobs from "./pages/PostJobs";
import MyJobs from "./pages/MyJobs";
import SavedJobs from "./pages/SavedJobs";
import Jobspage from "./pages/Jobspage";
import AppliedJobs from "./pages/AppliedJobs";
import ProtectedRoute from "./components/ProtectedRoute";

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
        element: (
          <ProtectedRoute>
            <OnBoarding />
          </ProtectedRoute>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <ProtectedRoute>
            <Jobspage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/jobs",
        element: (
          <ProtectedRoute>
            <JobListing />
          </ProtectedRoute>
        ),
      },
      {
        path: "/job-post",
        element: (
          <ProtectedRoute>
            <PostJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <ProtectedRoute>
            <MyJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/saved-jobs",
        element: (
          <ProtectedRoute>
            <SavedJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/applied-jobs",
        element: (
          <ProtectedRoute>
            <AppliedJobs />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
