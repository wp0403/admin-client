import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../Layout";
import Login from '@pages/login'
import Register from '@pages/login/register'
import Home from "@pages/home";
import TemaplateTable from "@pages/temaplate-table";
import TemaplateForm from "@pages/temaplate-form";
import TemaplateCard from "@pages/temaplate-card";
import TemaplateList from "@pages/temaplate-list";
import TemaplateArticle from "@pages/temaplate-article";
import NotificationCarousel from '@pages/notification-carousel'

export type RouterListItem = {
  title?: string;
  path: string;
  icon?: string;
  element?: ReactNode;
  auth?: string;
  children?: RouterListItem[];
};

const routerList: RouterListItem[] = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Navigate to="home" /> },
      {
        title: "首页",
        path: "home",
        element: <Home />,
      },
      {
        title: "模版",
        path: "temaplate",
        children: [
          { path: "", element: <Navigate to="temaplate-table" /> },
          {
            title: "表格模版",
            path: "temaplate-table",
            element: <TemaplateTable />,
          },
          {
            title: "表单模版",
            path: "temaplate-form",
            element: <TemaplateForm />,
          },
          {
            title: "卡片模版",
            path: "temaplate-card",
            element: <TemaplateCard />,
          },
          {
            title: "列表模版",
            path: "temaplate-list",
            element: <TemaplateList />,
          },
          {
            title: "富文本/markdown编辑器",
            path: "temaplate-article",
            element: <TemaplateArticle />,
          },
          {
            title: "通知轮播",
            path: "notification-carousel",
            element: <NotificationCarousel />,
          },
        ],
      },
    ],
  },
];

export default routerList;
