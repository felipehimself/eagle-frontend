import { useRoutes } from "react-router-dom";
import { AppRoutesConfig } from "./app-routes-config";

export const AppRoutes = () => {
  const element = useRoutes([...AppRoutesConfig]);

  return element;
};
