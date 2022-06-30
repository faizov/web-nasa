import { useRoutes } from "react-router-dom";
import { Apod } from './apod/apod'

export function Routes() {
  return useRoutes([
    {
      path: "/",
      element: <Apod />,
      children: [
        { path: "apod", element: <Apod /> },
        { path: "mars", element: <Apod /> }
      ]
    }
  ]);
}