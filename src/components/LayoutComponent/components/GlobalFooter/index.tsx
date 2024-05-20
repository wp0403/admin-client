import React from "react";
import styles from "./index.module.less";

const GlobalFooter = ({ render }: { render?: () => React.ReactNode }) => {
  return (
    <footer className={styles.global_footer}>
      {render ? (
        render?.()
      ) : (
        <>
          <div className={styles.footer_item}>© 2024 Shimmer Made</div>
          <div className={styles.footer_border}>|</div>
          <div className={styles.footer_item}>by Shimmer</div>
        </>
      )}
    </footer>
  );
};

export default GlobalFooter;
