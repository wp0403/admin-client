import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./index.module.less";

type MenuItem = Required<MenuProps>["items"][number];

export type LeftNavProps = {
  menuList: MenuItem[];
  className?: string;
  style?: CSSProperties | undefined;
};

const LeftNav = (props: LeftNavProps) => {
  const { menuList, className, style } = props;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const defaultMenuValue = pathname.split("/").filter(Boolean);

  const [menuValue, setMenuValue] = useState(defaultMenuValue);

  useEffect(() => {
    setMenuValue(defaultMenuValue);
  }, [pathname]);

  return (
    <div className={`${styles.simple_left} ${className || ""}`} style={style}>
      <section className={styles.simple_left_scroll}>
        <Menu
          className={styles.simple_left_menu}
          mode="inline"
          items={menuList}
          openKeys={menuValue}
          selectedKeys={menuValue}
          onSelect={({ keyPath }) => {
            setMenuValue(keyPath);
            navigate(keyPath.reverse().join("/"));
          }}
          onOpenChange={(keyPath) => {
            setMenuValue(keyPath);
          }}
          onClick={({ keyPath }) => {
            setMenuValue(keyPath);
          }}
        />
      </section>
    </div>
  );
};

export default LeftNav;
