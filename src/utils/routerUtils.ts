/*
 * @Descripttion: 此utils存放全局路由权限的校验方法函数
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-13 11:29:46
 * @LastEditors: WangPeng
 * @LastEditTime: 2024-01-10 18:39:24
 */
import { RouterListItem } from "../router/routes";
import type { MenuItem } from "../router/routerViews";
/**
 * 过滤没有title的路由
 */
type filterNoNameType = (
  route: RouterListItem[] | RouterListItem
) => MenuItem[] | MenuItem | any;
export const filterNoName: filterNoNameType = (route) => {
  if (Array.isArray(route)) {
    return route.map((v) => filterNoName(v));
  }

  if (typeof route === "object" && route.title) {
    const newRoute = {
      key: route.path,
      label: route.title,
      icon: route?.icon,
      children: route?.children,
    };
    if (newRoute.children) {
      return {
        ...newRoute,
        children: filterNoName(newRoute.children),
      };
    }
    return newRoute;
  }

  return null;
};

/**
 * 路由权限过滤
 */
export const authRouterFilter = () => {};

/**
 * 根据当前地址栏信息匹配路由对象
 */
export const matchingRoute = () => {};

/**
 * 判断当前路由是否包含某个路由
 */
export const isRouteInclude = (pathname: string, seekRoute: string) => {
  const reg = RegExp(seekRoute);
  return reg.test(pathname);
};

/**
 * 判断当前用户是否拥有某个权限
 */
// export const isAuth: any = (authName: string) => {

// };
