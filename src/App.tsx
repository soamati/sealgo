import React from "react";
import BubbleSort from "./sorting/bubble/BubbleSort";
import SelectionSort from "./sorting/selection/SelectionSort";
import InsertionSort from "./sorting/insertion/InsertionSort";
import MergeSort from "./sorting/merge/MegeSort";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import QuickSort from "./sorting/quick/QuickSort";
import ErrorElement from "./components/ErrorElement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BubbleSort />,
    errorElement: <ErrorElement />,
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
  {
    path: "/quick",
    element: <QuickSort />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
