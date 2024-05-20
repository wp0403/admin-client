import React, { useId } from "react";
import { Skeleton } from "antd";
import styles from "./index.module.less";

export type CardComponentProps = {
  className?: string;
  headerClassName?: string;
  footerClassName?: string;
  bodyClassName?: string;
  title?: string;
  description?: string;
  cover?: string | React.ReactNode;
  children?: React.ReactNode | string;
  loading?: boolean;
  renderHeader?: () => React.ReactNode;
  renderFooter?: () => React.ReactNode;
  bordered?: boolean;
  hoverable?: boolean;
};

const CardComponent = (props: CardComponentProps) => {
  const {
    className,
    headerClassName,
    footerClassName,
    bodyClassName,
    title,
    renderHeader,
    renderFooter,
    description,
    children,
    loading = false,
    bordered = true,
    hoverable = true,
  } = props;

  const domId = useId();

  return (
    <div
      key={domId}
      className={`${styles.card} ${
        renderFooter ? "" : styles.card_footer_padding
      } ${bordered ? styles.card_border : ""} ${
        hoverable ? styles.card_hover : ""
      } ${className || ""}`}
    >
      <Skeleton loading={loading} active paragraph={{ rows: 3 }}>
        {title || renderHeader ? (
          <div className={`${styles.card_header} ${headerClassName || ""}`}>
            {title || (renderHeader && renderHeader())}
          </div>
        ) : (
          ""
        )}
        {description || children ? (
          <div className={`${styles.card_body} ${bodyClassName || ""}`}>
            {description || children}
          </div>
        ) : (
          ""
        )}
        {renderFooter ? (
          <div className={`${styles.card_footer} ${footerClassName || ""}`}>
            {renderFooter && renderFooter()}
          </div>
        ) : (
          ""
        )}
      </Skeleton>
    </div>
  );
};

export default CardComponent;
