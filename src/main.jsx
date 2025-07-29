import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import {RouterProvider} from "react-router";
import router from "./routes/router";
import AuthProvider from "./contexts/AuthProvider";
import {ToastContainer} from "react-toastify";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="rubik ">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ToastContainer />
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>
);
