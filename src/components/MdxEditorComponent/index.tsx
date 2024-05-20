import {
  MDXEditor,
  headingsPlugin,
  quotePlugin,
  listsPlugin,
  tablePlugin,
  diffSourcePlugin,
  imagePlugin,
  linkPlugin,
  linkDialogPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CodeToggle,
  InsertImage,
  InsertTable,
  ListsToggle,
  Separator,
  DiffSourceToggleWrapper,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  InsertCodeBlock,
  CreateLink,
  InsertThematicBreak,
} from "@mdxeditor/editor";
import type { ViewMode } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useMemo, useState } from "react";

type Props = {
  defaultValue?: string;
  onChange?: (val: string) => void;
  viewList?: ViewMode[] | undefined;
};

const codeBlockLanguages = [
  "javascript",
  "html",
  "css",
  "xml",
  "json",
  "markdown",
  "sql",
  "python",
  "java",
  "ruby",
  "bash",
  "shell",
  "text",
  "txt",
];

// 图片插件处理
async function imageUploadHandler(image: File) {
  const formData = new FormData();
  formData.append("image", image);
  // send the file to your server and return
  // the URL of the uploaded image in the response
  const response = await fetch("/uploads/new", {
    method: "POST",
    body: formData,
  });
  const json = (await response.json()) as { url: string };
  return json.url;
}

const MdxComponent = (props: Props) => {
  const {
    defaultValue = "",
    onChange,
    viewList = ["rich-text", "source", "diff"],
  } = props;
  const [content, setContent] = useState<string>(defaultValue);

  const changeMdx = (val) => {
    setContent(val);
    onChange && onChange(val);
  };

  const mdxEditor = useMemo(
    () => (
      <MDXEditor
        markdown={content}
        plugins={[
          headingsPlugin(),
          quotePlugin(),
          listsPlugin(),
          diffSourcePlugin({
            diffMarkdown: defaultValue,
            viewMode: "rich-text", // "rich-text"| "source" | "diff"
            readOnlyDiff: true,
          }),
          tablePlugin(),
          imagePlugin({ imageUploadHandler }),
          linkPlugin(),
          linkDialogPlugin(),
          thematicBreakPlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: "javascript" }),
          codeMirrorPlugin({
            codeBlockLanguages: codeBlockLanguages.reduce((acc, value) => {
              acc[value] = value;
              return acc;
            }, {}),
          }),
          toolbarPlugin({
            toolbarContents: () => (
              <DiffSourceToggleWrapper options={viewList}>
                <ConditionalContents
                  options={[
                    {
                      when: (editor) => editor?.editorType === "codeblock",
                      contents: () => <ChangeCodeMirrorLanguage />,
                    },
                    {
                      fallback: () => (
                        <>
                          <UndoRedo />
                          <Separator />
                          <BoldItalicUnderlineToggles />
                          <CodeToggle />
                          <Separator />
                          <ListsToggle />
                          <Separator />
                          <ConditionalContents
                            options={[{ fallback: () => <BlockTypeSelect /> }]}
                          />
                          <Separator />
                          <CreateLink />
                          <InsertImage />
                          <Separator />
                          <InsertTable />
                          <InsertThematicBreak />
                          <Separator />
                          <InsertCodeBlock />
                        </>
                      ),
                    },
                  ]}
                />
              </DiffSourceToggleWrapper>
            ),
          }),
        ]}
        onChange={changeMdx}
      />
    ),
    [defaultValue]
  );

  return mdxEditor;
};

export default MdxComponent;
