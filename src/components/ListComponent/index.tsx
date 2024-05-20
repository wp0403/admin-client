import { useId, useRef } from "react";
import styles from "./index.module.less";

export type ListComponentProps = {
  className?: string;
  height?: number | "auto" | string;
  data: any[];
  renderItem?: (item: any, key: string) => React.ReactNode;
};

const ListComponent = (props: ListComponentProps) => {
  const { className, height = "auto", data, renderItem } = props;

  const listDom = useRef<any>();
  const domId = useId();

  return (
    <div
      className={`${styles.list} ${className || ""}`}
      style={{
        maxHeight: `${typeof height === "number" ? `${height}px` : height}`,
      }}
      ref={listDom}
    >
      {data?.map((item, index) => {
        const renderDom = renderItem ? (
          renderItem(item, `${domId}-${index}`)
        ) : (
          <div key={`${domId}-${index}`} className={styles.list_item}>
            {item}
          </div>
        );
        return renderDom;
      })}
    </div>
  );
};

export default ListComponent;
