import type { ReactNode } from "react";
import { useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import ErrorBoundary from "../ErrorBoundary";
import GlobalHeader from "./components/GlobalHeader";
import GlobalFooter from "./components/GlobalFooter";
import type { GlobalHeaderProps } from "./components/GlobalHeader";
import LeftNav from "./components/LeftNav";
import type { LeftNavProps } from "./components/LeftNav";
import styles from "./index.module.less";

/**
 * @interface LayoutProps
 * @property {string | ReactNode}   title               - layout 的左上角的 title
 * @property {string | ReactNode}   logo                - layout 的左上角 logo 的 url
 * @property {boolean}              isChangePageTransition    - 路由切换动画
 * @property {'left' | 'top'}       [layout = 'left']   - layout 的菜单模式
 */
export type LayoutProps = LeftNavProps &
  GlobalHeaderProps & {
    isMobile: boolean;
    title: string | ReactNode;
    logo: string | ReactNode;
    layout?: "left" | "top";
    isChangePageTransition?: boolean;
  };

const Layout = (props: LayoutProps) => {
  const {
    isMobile,
    title,
    logo,
    layout = "left",
    avatarProps,
    actionsRenderList,
    menuList,
    isChangePageTransition = true,
  } = props;

  const mainRef = useRef(null);
  const location = useLocation();

  return (
    <div className={styles.layout}>
      <GlobalHeader
        avatarProps={avatarProps}
        actionsRenderList={actionsRenderList}
        title={title}
        logo={logo}
        menuList={menuList}
        layout={layout}
        isMobile={isMobile}
      />
      <main className={styles.main}>
        {layout === "left" && !isMobile && <LeftNav menuList={menuList} style={{marginTop: "40px"}} />}
        <ErrorBoundary>
          <div className={styles.content}>
            {isChangePageTransition ? (
              <SwitchTransition mode="out-in">
                <CSSTransition
                  key={location.key}
                  timeout={300}
                  classNames="fade"
                  nodeRef={mainRef}
                >
                  <main className={styles.page_box} ref={mainRef}>
                    <Outlet />
                  </main>
                </CSSTransition>
              </SwitchTransition>
            ) : (
              <main className={styles.page_box}>
                <Outlet />
              </main>
            )}
            <GlobalFooter />
          </div>
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default Layout;
