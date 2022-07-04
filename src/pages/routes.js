import { useRoutes } from "react-router-dom";
import { Apod } from './apod'
import { Likes } from './likes'

export function Routes() {
  return useRoutes([
    {
      path: "/",
      element: <Apod />,
      children: [
        { path: "apod", element: <Apod /> }
      ]
    },
    {
      path: "likes",
      element: <Likes />
    }
  ]);
}