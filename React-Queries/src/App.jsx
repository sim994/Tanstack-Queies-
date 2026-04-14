import React from "react";
import { Layout } from "./Layout";
import { Table } from "./components/Table";
import { createBrowserRouter,RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {path: "/", element:<Table />},
    ]
  }
]);

export function App() {
  return (
    <RouterProvider router={router} />
  );
}
