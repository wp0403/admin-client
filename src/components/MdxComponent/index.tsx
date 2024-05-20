import { useMemo } from "react";
import { Image, message } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { evaluateSync } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import * as runtime_ from "react/jsx-runtime";
import CodeBlock from "@components/CodeBlock";

/** @type {{Fragment: Fragment, jsx: Jsx, jsxs: Jsx}} */
const runtime = runtime_;

const MdxComponent = ({ content }: { content: string }) => {
  const { default: MdxContent } = evaluateSync(content, {
    ...runtime,
    Fragment: "div",
    remarkPlugins: [remarkGfm,remarkMath],
    rehypePlugins: [rehypeKatex],
  });

  const handleCopy = () => {
    message.success("复制成功");
  };

  // 将标题内容转换成id时可以用的字符串
  const generateUniqueId = (text = "") => {
    if (typeof text !== "string") {
      return "";
    }
    // 将文本转换为小写，去除空格，并使用一种哈希函数生成数字
    const hash = text
      .trim()
      .toLowerCase()
      .replace(/\s/g, "")
      .split("")
      .reduce(function (acc, char) {
        return acc + char.charCodeAt(0);
      }, 0);

    // 使用前缀加上哈希值，以确保唯一性
    const uniqueId = "anchor_" + hash;

    return uniqueId;
  };

  // 生成唯一id
  const generateHeadingId = (string, level) => {
    return generateUniqueId(string) + "-" + level;
  };

  const renderTitle = (node, type) => {
    const newChlidren = Array.isArray(node.children)
      ? node.children[0]
      : node.children;
    const id = generateHeadingId(newChlidren, type);
    switch (type) {
      case 1:
        return (
          <h1 className="markdown-toc-item" id={id}>
            {newChlidren}
          </h1>
        );
      case 2:
        return (
          <h2 className="markdown-toc-item" id={id}>
            {newChlidren}
          </h2>
        );
      case 3:
        return (
          <h3 className="markdown-toc-item" id={id}>
            {newChlidren}
          </h3>
        );
      case 4:
        return (
          <h4 className="markdown-toc-item" id={id}>
            {newChlidren}
          </h4>
        );
      case 5:
        return (
          <h5 className="markdown-toc-item" id={id}>
            {newChlidren}
          </h5>
        );
      case 6:
        return (
          <h6 className="markdown-toc-item" id={id}>
            {newChlidren}
          </h6>
        );
    }
  };

  const components = {
    h1: (node: any) => renderTitle(node, 1),
    h2: (node: any) => renderTitle(node, 2),
    h3: (node: any) => renderTitle(node, 3),
    h4: (node: any) => renderTitle(node, 4),
    h5: (node: any) => renderTitle(node, 5),
    h6: (node: any) => renderTitle(node, 6),
    p: (properties) => {
      return <div className="tagName-p" {...properties} />;
    },
    code({ className, children }) {
      const match = /language-(\w+)/.exec(className || "");

      return (
        <>
          {match && match[1] && (
            <div className="code_copy">
              <div className="code_language">{match[1]}</div>
              <CopyToClipboard
                text={String(children).replace(/\n$/, "")}
                onCopy={handleCopy}
              >
                <div className="code_btn">复制代码</div>
              </CopyToClipboard>
            </div>
          )}
          <CodeBlock language={match && match[1] ? match[1] : ""}>
            {String(children || "").replace(/\n$/, "")}
          </CodeBlock>
        </>
      );
    },
    img({ src, alt }) {
      return (
        <Image
          className={"blog_img"}
          src={src}
          alt={alt}
          rootClassName={"blog_img"}
        />
      );
    },
    a({ href, children }) {
      if (RegExp("#").test(href || "")) {
        return <a href={href}>{children}</a>;
      }
      return (
        <a
          href={href as any}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          {children}
        </a>
      );
    },
  };

  const htmlContent = useMemo(() => {
    return (
      <div className="markdown_body">
        <Image.PreviewGroup>
          <MdxContent components={components as any} />
        </Image.PreviewGroup>
      </div>
    );
  }, [content]);

  return htmlContent;
};

export default MdxComponent;
