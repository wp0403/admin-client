import { useState } from "react";
import MdxEditorComponent from "@components/MdxEditorComponent";
import MdxComponent from "@components/MdxComponent";
import styles from "./index.module.less";

const TemaplateArticle = () => {
  const [data, setData] = useState<string>('');
  const [flag, setFlag] = useState<boolean>(false);
  return (
    <div className={styles.temaplate_article}>
      <div className={styles.temaplate_header}>
        <h2>TemaplateArticle</h2>
        <button onClick={() => setFlag(!flag)}>编辑/预览</button>
      </div>
      <div className={styles.content}>
        {flag ? (
          <MdxComponent content={data} />
        ) : (
          <MdxEditorComponent onChange={setData} defaultValue={"### 标题\n\n这是一段文字"} />
        )}
      </div>
    </div>
  );
};

export default TemaplateArticle;
