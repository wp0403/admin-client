import type { RouteObject } from "react-router-dom";
import type { MenuProps } from "antd";
import { filterNoName } from '@utils/routerUtils';
import routes from "./routes";

export type MenuItem = Required<MenuProps>["items"][number];

// export const routerViews: RouteObject[] = authRouterFilter(routes);
export const routerViews: RouteObject[] = routes;

const menuRoutes = routes.find(v => v.path === '/')?.children;

export const menuList: MenuItem[] = filterNoName(menuRoutes || [])
