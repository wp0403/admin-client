import CardComponent from "@components/CardComponent";
import SysIcon from "@components/SysIcon";
import styles from "./index.module.less";

const data = {
  title: "这是标题",
  src: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  content:
    "这是一段文字，卡片的内容。这是一段文字，卡片的内容。这是一段文字，卡片的内容。这是一段文字，卡片的内容。这是一段文字，卡片的内容。这是一段文字，卡片的内容。这是一段文字，卡片的内容。",
  star: 372,
  collect: 3,
  like: 91,
};

const TemaplateCard = () => {
  return (
    <div className={styles.temaplate_card}>
      <h2>TemaplateCard</h2>
      <div className={styles.item}>
        <div className={styles.title}>简单的卡片</div>
        <CardComponent
          className={styles.card_item}
          description={data.content}
        />
      </div>
      <div className={styles.item}>
        <div className={styles.title}>包含头部和尾部的卡片</div>
        <CardComponent
          className={styles.card_item}
          title={data.title}
          description={data.content}
          renderFooter={() => "卡片尾部"}
        />
      </div>
      <div className={styles.item}>
        <div className={styles.title}>自定义渲染卡片</div>
        <CardComponent
          className={styles.card_item_complex}
          bodyClassName={styles.card_item_complex_body}
        >
          <div className={styles.card_item_left}>
            <div className={styles.card_item_title}>{data.title}</div>
            <div className={styles.card_item_desc}>{data.content}</div>
            <div className={styles.card_item_footer}>
              <div className={styles.footer_item}>
                <SysIcon type="icon-shoucang" />
                <div className={styles.footer_item_num}>{data.star}</div>
              </div>
              <div className={styles.footer_border}>|</div>
              <div className={styles.footer_item}>
                <SysIcon type="icon-dingyue" />
                <div className={styles.footer_item_num}>{data.collect}</div>
              </div>
              <div className={styles.footer_border}>|</div>
              <div className={styles.footer_item}>
                <SysIcon type="icon-ding" />
                <div className={styles.footer_item_num}>{data.like}</div>
              </div>
            </div>
          </div>
          <img className={styles.card_item_right} src={data.src} alt="" />
        </CardComponent>
      </div>
    </div>
  );
};

export default TemaplateCard;
