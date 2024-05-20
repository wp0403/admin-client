import DynamicForm from "@components/DynamicForm";
import styles from "./index.module.less";

const formConfig = [
  {
    name: "username",
    label: "用户名",
    placeholder: "请输入用户名",
    type: "input",
    required: true,
  },
  {
    name: "password",
    label: "用户密码",
    placeholder: "请输入用户密码",
    type: "input",
    required: true,
  },
  {
    name: "comment",
    label: "评论",
    placeholder: "请输入评论",
    type: "textarea",
    fullRow: true,
    required: false,
    otherConfig: {
      showCount: true,
      autoSize: {
        minRows: 2,
        maxRows: 6,
      },
      maxLength: 100,
    },
  },
  {
    name: "gender",
    label: "性别",
    placeholder: "请选择你的性别",
    type: "select",
    required: true,
    options: [
      { label: "男", value: "1" },
      { label: "女", value: "2" },
      { label: "保密", value: "0" },
    ],
  },
  // {
  //   name: "birthdate",
  //   label: "出生日期",
  //   placeholder: "请选择出生日期",
  //   type: "datePicker",
  //   required: true,
  // },
  // {
  //   name: "dateRange",
  //   label: "日期范围",
  //   placeholder: ["start", "end"],
  //   type: "rangePicker",
  //   required: true,
  // },
  {
    name: "preference",
    label: "偏好",
    placeholder: "请选择你的偏好",
    type: "radioGroup",
    required: true,
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
    ],
  },
  {
    name: "avatar",
    label: "头像",
    placeholder: "上传图片",
    type: "uploadAvatar",
    required: true,
  },
  {
    name: "file",
    label: "文件",
    placeholder: "上传文件",
    type: "uploadFile",
    required: true,
  },
];

const TemaplateForm = () => {
  return (
    <div className={styles.temaplate_form}>
      <h2>TemaplateForm</h2>
      <ol className={styles.desc}>
        <li>支持自定义每行展示多少项，并且支持单个占据一行配置</li>
        <li>支持只读和编辑切换</li>
        <li>支持自定义按钮事件</li>
        <li>通过配置项设置整个表单</li>
        <li>......</li>
      </ol>
      <div className={styles.item}>
        <div className={styles.title}>基础表单</div>
        <DynamicForm className={styles.card_item} formConfig={formConfig} />
      </div>
      <div className={styles.item}>
        <div className={styles.title}>多配置表单表单</div>
        <DynamicForm
          className={styles.card_item}
          formConfig={formConfig}
          itemsPerRow={2}
          layout={"horizontal"}
          initialValues={{ username: "shimmer" }}
          readOnly={false}
          watchForm={(values) => console.log(values)}
          showButtons={false}
        />
      </div>
    </div>
  );
};

export default TemaplateForm;
