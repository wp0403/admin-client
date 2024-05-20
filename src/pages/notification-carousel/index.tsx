import NotificationCarouselCom from "@components/NotificationCarousel";
import SysIcon from "@components/SysIcon";
import styles from "./index.module.less";

const NotificationCarousel = () => {
  return (
    <div className={styles.notification_carousel}>
      <h2>通知轮播组件</h2>
      <div className={styles.item}>
        <div className={styles.title}>简单的文字轮播</div>
        <div className={styles.item_content}>
          <NotificationCarouselCom
            data={["这是第一段文字", "这是第二段文字", "这是第三段文字"]}
            animationConfig={{
              notificationHeight: 36,
              autoplaySpeed: 2000,
              speed: 1000,
            }}
            prefix={<SysIcon type="icon-RectangleCopy42" />}
          />
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.title}>自定义内容轮播</div>
        <div className={styles.item_content}>
          <NotificationCarouselCom
            prefix={<SysIcon type="icon-RectangleCopy3" />}
            data={[
              {
                id: 1,
                content: "这是通知一",
                number: 12,
              },
              {
                id: 2,
                content: "这是通知二",
                number: 2,
              },
              {
                id: 3,
                content: "这是通知三",
                number: 121,
              },
            ]}
            animationConfig={{
              notificationHeight: 36,
              autoplaySpeed: 2000,
              speed: 1000,
            }}
            renderItem={(item: any) => (
              <div className={styles.nc_item}>
                <div className={styles.nc_item_text}>{item.content}</div>
                <div className={styles.nc_item_number}>{item.number}</div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationCarousel;
