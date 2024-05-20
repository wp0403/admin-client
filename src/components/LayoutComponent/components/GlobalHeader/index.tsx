import type { MenuProps } from "antd";
import { Drawer } from "antd";
import { useState } from "react";
import SysIcon from "@components/SysIcon";
import { SimpleContent, ActionsList } from "../TemplateRender";
import ActionsContent from "./ActionsContent";
import type { ActionsContentProps } from "./ActionsContent";
import { AppSimpleContentProps } from "../TemplateRender/types";
import TopNav from "../TopNav";
import LeftNav from "../LeftNav";
import styles from "./index.module.less";

type MenuItem = Required<MenuProps>["items"][number];

export type GlobalHeaderProps = AppSimpleContentProps &
  ActionsContentProps & {
    menuList: MenuItem[];
    layout?: "left" | "top";
    isMobile?: boolean;
  };

const GlobalHeader = (props: GlobalHeaderProps) => {
  const {
    title,
    logo,
    avatarProps,
    actionsRenderList,
    menuList,
    layout,
    isMobile,
  } = props;

  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {!isMobile && (
        <header className={styles.global_header}>
          <div className={styles.global_header_left}>
            <SimpleContent title={title} logo={logo} isMobile={isMobile} />
          </div>
          <div className={styles.global_header_center}>
            {layout === "top" && <TopNav menuList={menuList} />}
          </div>
          <div className={styles.global_header_right}>
            <ActionsContent
              isMobile={isMobile}
              avatarProps={avatarProps}
              actionsRenderList={actionsRenderList}
            />
          </div>
        </header>
      )}
      {isMobile && (
        <header className={styles.m_global_header}>
          <div className={styles.m_global_header_left}>
            {isMobile && (
              <SysIcon
                className={styles.m_global_header_router}
                type="icon-liebiao"
                onClick={() => setOpen(true)}
              />
            )}
            <SimpleContent title={title} logo={logo} isMobile={isMobile} />
          </div>
          <div className={styles.global_header_right}>
            <ActionsContent
              isMobile={isMobile}
              avatarProps={avatarProps}
              actionsRenderList={actionsRenderList}
            />
          </div>
          <Drawer
            width={248}
            open={open}
            placement="left"
            closable={false}
            onClose={() => setOpen(false)}
          >
            <div className={styles.m_drawer_body}>
              <LeftNav className={styles.m_left_nav} menuList={menuList} />
              <ActionsList
                actionsRenderList={actionsRenderList}
                isGrid={true}
              />
            </div>
          </Drawer>
        </header>
      )}
    </>
  );
};

export default GlobalHeader;
