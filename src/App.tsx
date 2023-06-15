import { AppProviders } from "@/providers";
import { AppRoutes } from "@/routes";

export const App = () => (
  <AppProviders>
    <AppRoutes />
  </AppProviders>
);
