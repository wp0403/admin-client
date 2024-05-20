import Slider from "react-slick";
import styles from "./index.module.less";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface DataItem {
  content: string;
  [key: string]: any;
}

export type NotificationCarouselProps = {
  className?: string;
  textClassName?: string;
  data: Array<DataItem | string>;
  prefix?: React.ReactNode;
  renderItem?: (item: DataItem | string) => React.ReactNode;
  animationConfig: {
    notificationHeight: number; // 每次滚动高度
    speed?: number; // 每次动画时间(ms)
    autoplaySpeed?: number; // 每次轮播的间隙时间(ms)
    autoplay?: boolean; // 自动轮播
    vertical?: boolean; // 垂直滚动
    adaptiveHeight?: boolean; // 自适应高度
    dots?: boolean; // 分页点
    arrows?: boolean; // 左右箭头
    infinite?: boolean; // 无限循环
    slidesToShow?: 1; // 显示的轮播项数量
    slidesToScroll?: 1; // 每次切换的轮播项数量
    swipe?: boolean; // 允许滑动切换
    draggable?: boolean; // 允许拖拽切换
    pauseOnHover?: boolean; // 当鼠标悬停时暂停播放
  };
};

const NotificationCarousel = (props: NotificationCarouselProps) => {
  const {
    className,
    textClassName,
    data,
    renderItem,
    prefix,
    animationConfig,
  } = props;
  const {
    notificationHeight = 36,
    adaptiveHeight = true,
    autoplay = true,
    autoplaySpeed = 2000,
    vertical = true,
    dots = false,
    arrows = false,
    infinite = true,
    speed = 500,
    slidesToShow = 1,
    slidesToScroll = 1,
    swipe = false,
    draggable = false,
    pauseOnHover = false,
  } = animationConfig;

  var settings = {
    adaptiveHeight,
    autoplay,
    autoplaySpeed,
    vertical,
    dots,
    arrows,
    infinite,
    speed,
    slidesToShow,
    slidesToScroll,
    swipe,
    draggable,
    pauseOnHover,
  };

  return (
    <div
      className={`${styles.notification_carousel} ${className || ""}`}
      style={{ height: `${notificationHeight}px` }}
    >
      {prefix && (
        <div className={styles.notification_carousel_prefix}>{prefix}</div>
      )}
      <Slider className={styles.slider} {...settings}>
        {data.map((item, index) => (
          <div className={styles.notification_carousel_item} key={index}>
            <div
              className={`${styles.notification_carousel_item_text} ${
                textClassName || ""
              }`}
              style={{ height: `${notificationHeight}px` }}
            >
              {renderItem
                ? renderItem(item)
                : typeof item === "string"
                ? item
                : item.content}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NotificationCarousel;
