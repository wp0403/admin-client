import React, { useMemo } from "react";
import type { AvatarProps } from "antd";
import { Avatar } from "antd";
import SysIcon from "@components/SysIcon";
import {ActionsList} from '../TemplateRender'
import styles from "./rightContent.module.less";

export type ActionsContentProps = {
  avatarProps: AvatarProps & {
    title: string;
    hideHover?: boolean;
    render: (dom: React.ReactNode) => React.ReactNode;
  };
  actionsRenderList?: {
    key: string;
    icon: string;
    onClick?: (key: string) => void;
    render?: (dom: React.ReactNode) => React.ReactNode;
  }[];
  isMobile: boolean;
};

const ActionsContent = (props: ActionsContentProps) => {
  const { avatarProps, actionsRenderList = [],isMobile } = props;

  const avatarDom = useMemo(() => {
    const { title, hideHover, render, ...rect } = avatarProps;
    return render(
      <div
        className={`${styles.avatar} ${styles.actions_item} ${styles.actions_item_hover}`}
      >
        <Avatar icon={<SysIcon type="icon-yonghu" />} {...rect} />
        <span className={styles.avatar_title}>{title}</span>
      </div>
    );
  }, [avatarProps]);

  return (
    <div className={styles.actions_content}>
      {!isMobile && <ActionsList actionsRenderList={actionsRenderList} />}
      <div className={styles.avatar_box}>{avatarDom}</div>
    </div>
  );
};

export default ActionsContent;
