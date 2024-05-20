import { useRoutes } from "react-router-dom";
import { routerViews } from "./routerViews";

const RenderRoutes = () => {
  return useRoutes(routerViews);
};

export default RenderRoutes;