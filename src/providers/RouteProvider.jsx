import { RouterProvider, createBrowserRouter } from "react-router-dom";

import FullScreenSpinner from "@/components/atoms/FullScreenSpinner";
import { Suspense } from "react";
import routes from "@/routes/routes";

export default function RouteProvider() {
  const router = createBrowserRouter(routes);

  return (
    <Suspense fallback={<FullScreenSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
