import ListComponent from "@components/ListComponent";
import CardComponent from "@components/CardComponent";
import SysIcon from "@components/SysIcon";
import styles from "./index.module.less";

const data = [
  {
    title: "这是标题",
    src: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    content:
      "Racing car sprays burning fuel into crowd.Racing car sprays burning fuel into crowd.Racing car sprays burning fuel into crowd.Racing car sprays burning fuel into crowd.Racing car sprays burning fuel into crowd.Racing car sprays burning fuel into crowd.Racing car sprays burning fuel into crowd.Racing car sprays burning fuel into crowd.",
    star: 100,
    collect: 7,
    like: 12,
  },
  {
    title: "这是标题",
    src: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    content:
      "Japanese princess to wed commoner.Japanese princess to wed commoner.Japanese princess to wed commoner.Japanese princess to wed commoner.Japanese princess to wed commoner.Japanese princess to wed commoner.Japanese princess to wed commoner.Japanese princess to wed commoner.Japanese princess to wed commoner.Japanese princess to wed commoner.Japanese princess to wed commoner.Japanese princess to wed commoner.Japanese princess to wed commoner.Japanese princess to wed commoner.Japanese princess to wed commoner.Japanese princess to wed commoner.Japanese princess to wed commoner.Japanese princess to wed commoner.Japanese princess to wed commoner.Japanese princess to wed commoner.Japanese princess to wed commoner.Japanese princess to wed commoner.Japanese princess to wed commoner.Japanese princess to wed commoner.",
    star: 1001,
    collect: 12,
    like: 121,
  },
  {
    title: "这是标题",
    src: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    content: "Australian walks 100km after outback crash.",
    star: 82,
    collect: 1,
    like: 1,
  },
  {
    title: "这是标题",
    src: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    content: "Man charged over missing wedding girl.",
    star: 980,
    collect: 33,
    like: 321,
  },
  {
    title: "这是标题",
    src: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    content: "Los Angeles battles huge wildfires.",
    star: 372,
    collect: 3,
    like: 91,
  },
];

const TemaplateList = () => {
  const renderListItem = (item, key) => {
    return (
      <CardComponent
        key={key}
        className={styles.card_item_complex}
        bodyClassName={styles.card_item_complex_body}
      >
        <div className={styles.card_item_left}>
          <div className={styles.card_item_title}>{item.title}</div>
          <div className={styles.card_item_desc}>{item.content}</div>
          <div className={styles.card_item_footer}>
            <div className={styles.footer_item}>
              <SysIcon type="icon-shoucang" />
              <div className={styles.footer_item_num}>{item.star}</div>
            </div>
            <div className={styles.footer_border}>|</div>
            <div className={styles.footer_item}>
              <SysIcon type="icon-dingyue" />
              <div className={styles.footer_item_num}>{item.collect}</div>
            </div>
            <div className={styles.footer_border}>|</div>
            <div className={styles.footer_item}>
              <SysIcon type="icon-ding" />
              <div className={styles.footer_item_num}>{item.like}</div>
            </div>
          </div>
        </div>
        <img className={styles.card_item_right} src={item.src} alt="" />
      </CardComponent>
    );
  };
  return (
    <div className={styles.temaplate_list}>
      <h2>TemaplateList</h2>
      <div className={styles.item}>
        <div className={styles.title}>纯文本列表</div>
        <ListComponent data={data.map(v => v.content)} />
      </div>
      <div className={styles.item}>
        <div className={styles.title}>简单的卡片列表</div>
        <ListComponent
          data={data}
          renderItem={(item, key) => (
            <CardComponent
              key={key}
              className={styles.card_item}
              bodyClassName={styles.card_item_body}
              title={item.title}
              description={item.content}
            />
          )}
        />
      </div>
      <div className={styles.item}>
        <div className={styles.title}>复杂的卡片列表</div>
        <ListComponent
          data={data}
          renderItem={(item, key) => renderListItem(item, key)}
        />
      </div>
    </div>
  );
};

export default TemaplateList;
