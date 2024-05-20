import { useEffect, useState } from "react";
import { Dropdown } from "antd";
import LayoutComponent from "@components/LayoutComponent";
import { isMobileDevice } from "@utils/utils";
import { menuList } from "../router/routerViews";
import "../styles/global.less";

const Layout = () => {
  const items = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/personal-center">
          个人中心
        </a>
      ),
    },
    {
      key: "4",
      danger: true,
      label: (
        <a target="_blank" href="/login">
          退出登陆
        </a>
      ),
    },
  ];

  const [isMobile, setIsMobile] = useState<boolean>(false);

  const windowSizeFunc = () => {
    setIsMobile(isMobileDevice());
  };

  useEffect(() => {
    windowSizeFunc();
    window.addEventListener("resize", windowSizeFunc);

    return () => {
      window.removeEventListener("resize", windowSizeFunc);
    };
  }, []);

  return (
    <LayoutComponent
      layout="left"
      isMobile={isMobile}
      title={"后台管理"}
      logo={"/vite.svg"}
      avatarProps={{
        title: "shimmer",
        size: "small",
        render: (dom) => <Dropdown menu={{ items }}>{dom}</Dropdown>,
      }}
      actionsRenderList={[
        { key: "1", icon: "icon-diandeng" },
        { key: "2", icon: "icon-yun" },
        { key: "3", icon: "icon-shu" },
      ]}
      menuList={menuList}
    />
  );
};

export default Layout;
