import { useRoutes } from "react-router-dom";
import { Apod } from './apod/apod'

export const baseUrl = process.env.PUBLIC_URL

export function Routes() {
  return useRoutes([
    {
      path: baseUrl,
      element: <Apod />,
      children: [
        { path: "apod", element: <Apod /> },
        { path: "mars", element: <Apod /> }
      ]
    }
  ]);
}