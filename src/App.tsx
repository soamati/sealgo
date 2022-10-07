import React from "react";
import BubbleSort from "./sorting/bubble/BubbleSort";
import SelectionSort from "./sorting/selection/SelectionSort";
import InsertionSort from "./sorting/insertion/InsertionSort";
import MergeSort from "./sorting/merge/MegeSort";
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
  {
    path: "/insertion",
    element: <InsertionSort />,
  },
  {
    path: "/merge",
    element: <MergeSort />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
