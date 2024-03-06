import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  Error,
  ProtectedRoute,
  Dashboard,
  Layout,
  Login,
  DashboardLayout,
  Inquiries,
  Feedback,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "/inquiries",
            element: <Inquiries />,
          },
          {
            path: "/feedback",
            element: <Feedback />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
