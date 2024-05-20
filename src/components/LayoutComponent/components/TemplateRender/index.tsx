import { useMemo } from "react";
import { AppSimpleContentProps, AppLogoProps } from "./types";
import SysIcon from "@components/SysIcon";
import styles from "./styles/header.module.less";

export const renderLogo = (props: AppLogoProps): React.ReactNode => {
  const { logo, title } = props;
  const classStr = styles.simple_header_simple_logo;
  if (logo && typeof logo === "string") {
    return <img className={classStr} src={logo} alt="logo" />;
  }

  if (typeof logo === "function") {
    return logo();
  }

  if (logo && typeof logo === "string") {
    return <div className={classStr}>{logo}</div>;
  }

  if (!logo && title && typeof title === "string") {
    const symbol = title.substring(0, 1);
    return <div className={classStr}>{symbol}</div>;
  }
  return logo;
};

export const SimpleContent = (props: AppSimpleContentProps) => {
  const { title, logo, itemClick, url, isMobile } = props;
  return (
    <div className={styles.simple_header_simple}>
      <a
        className={styles.simple_header_simple_link}
        href={itemClick ? "javascript:;" : url}
        onClick={(e) => {
          e.stopPropagation();
          itemClick?.({ title, logo, url });
        }}
      >
        {renderLogo(props)}
        {!isMobile && (
          <div className={styles.simple_header_simple_title}>{title}</div>
        )}
      </a>
    </div>
  );
};

export const ActionsList = (props: {
  actionsRenderList?: {
    key: string;
    icon: string;
    onClick?: (key: string) => void;
    render?: (dom: React.ReactNode) => React.ReactNode;
  }[];
  isGrid?: boolean;
}) => {
  const { actionsRenderList, isGrid = false } = props;

  const actionsDom = useMemo(() => {
    return actionsRenderList?.filter(Boolean)?.map((item) => {
      const dom = (
        <div
          key={item.key}
          className={`${styles.simple_actions_item} ${styles.simple_actions_item_hover}`}
          onClick={() => item?.onClick?.(item.key)}
        >
          <SysIcon type={item.icon} />
        </div>
      );
      return item.render?.(dom) || dom;
    });
  }, [actionsRenderList]);

  return (
    <div
      className={
        isGrid ? styles.simple_actions_box_grid : styles.simple_actions_box
      }
    >
      {actionsDom}
    </div>
  );
};
