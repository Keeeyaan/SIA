import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  Error,
  ProtectedRoute,
  Layout,
  Login,
  DashboardLayout,
  Dashboard,
  Inquiries,
  Feedback,
  Account,
  Model,
  KnowledgeBase,
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
            path: "/model",
            element: <Model />,
          },
          {
            path: "/kbs",
            element: <KnowledgeBase />,
          },
          {
            path: "/inquiries",
            element: <Inquiries />,
          },
          {
            path: "/feedback",
            element: <Feedback />,
          },
          {
            path: "/account",
            element: <Account />,
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
