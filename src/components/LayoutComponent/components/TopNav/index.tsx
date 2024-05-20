import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./index.module.less";

type MenuItem = Required<MenuProps>["items"][number];

export type TopNavProps = {
  siderWidth?: number;
  menuList: MenuItem[];
};

const TopNav = (props: TopNavProps) => {
  const { menuList } = props;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const defaultMenuValue = pathname.split("/").filter(Boolean) || [];

  const randerRoute = (route) => {
    if (!route) return;
    return (
      <div
        key={route.key}
        className={`${styles.route_item} ${
          defaultMenuValue.some((v) => v === route.key)
            ? styles.route_item_active
            : ""
        }`}
      >
        {route.children && (
          <Dropdown
            menu={{
              items: route.children,
              selectable: true,
              selectedKeys: defaultMenuValue,
              onSelect: ({ keyPath }) => {
                navigate([route.key, ...keyPath.reverse()].join("/"));
              },
            }}
          >
            <div
              className={styles.route_item_btn}
              onClick={() => {
                navigate(route.key);
              }}
            >
              {route.label}
            </div>
          </Dropdown>
        )}
        {!route.children && (
          <div
            className={styles.route_item_btn}
            onClick={() => {
              navigate(route.key);
            }}
          >
            {route.label}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.simple_top}>
      {menuList?.map((item) => randerRoute(item))}
    </div>
  );
};

export default TopNav;
