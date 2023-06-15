import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TopPage } from "@/pages/top/Page.tsx";
import { GamePage } from "@/pages/game/Page.tsx";

const router = createBrowserRouter([
  {
    path: "/g/:gameId",
    element: <GamePage />,
  },
  {
    path: "/",
    element: <TopPage />,
  },
]);

export const AppRoutes = () => <RouterProvider router={router} />;
