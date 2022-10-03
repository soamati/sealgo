import React from "react";
import BubbleSort from "./sorting/bubble/BubbleSort";
import SelectionSort from "./sorting/selection/SelectionSort";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BubbleSort />,
  },
  {
    path: "/bubble",
    element: <BubbleSort />,
  },
  {
    path: "/selection",
    element: <SelectionSort />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
