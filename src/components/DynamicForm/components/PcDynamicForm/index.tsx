import React from "react";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Radio,
  Row,
  Col,
  Tag,
  Space,
  Upload,
} from "antd";
import type { FormRule } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { imgFileTypes } from "../../contant";
import styles from "./index.module.less";

const { Option } = Select;
const { RangePicker } = DatePicker;

// 表单项类型
interface FormItem {
  name: string;
  label: string;
  placeholder: string | string[];
  type: string;
  required: boolean;
  disabled?: boolean;
  fullRow?: boolean; // 新增字段，用于判断是否独占一行
  options?: { label: string; value: string }[];
  rules?: FormRule[];
  otherConfig?: any;
}

// 组件映射类型
interface ComponentMap {
  [key: string]: React.ComponentType<any>;
}

const componentMap: ComponentMap = {
  input: Input,
  textarea: Input.TextArea,
  select: Select,
  datePicker: DatePicker,
  rangePicker: RangePicker,
  radioGroup: Radio.Group,
  uploadAvatar: Upload,
  uploadFile: Upload,
};

interface PcDynamicFormProps {
  className?: string;
  formConfig: FormItem[];
  itemsPerRow?: number;
  initialValues?: any;
  readOnly?: boolean;
  watchForm?: (v: any) => void;
  onSubmit?: (v: any) => void; // 自定义提交回调
  onReset?: () => void; // 自定义重置回调
  showButtons?: boolean; // 展示表单按钮
  layout?: "horizontal" | "vertical";
}

const normFile = (e: any) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const PcDynamicForm: React.FC<PcDynamicFormProps> = ({
  className,
  formConfig,
  itemsPerRow = 1,
  initialValues = {},
  readOnly = false,
  watchForm = () => {},
  onSubmit = () => {}, // 默认空函数
  onReset = () => {}, // 默认空函数
  showButtons = true, // 默认展示表单按钮
  layout = "vertical",
}) => {
  const [form] = Form.useForm();

  // 开始监听表单值的变化
  // Form.useWatch((values) => watchForm(values), form);

  // useEffect(() => {
  //   form.setFieldsValue(initialValues)
  // },[initialValues])

  const customizeRequiredMark = (
    label: React.ReactNode,
    { required }: { required: boolean }
  ) => (
    <>
      {required ? (
        <Tag color="error">Required</Tag>
      ) : (
        <Tag color="warning">optional</Tag>
      )}
      {label}
    </>
  );

  const onFinish = (values: any) => {
    console.log("Form values:", values);
    onSubmit(values); // 调用自定义提交回调
  };

  const handleReset = () => {
    form.resetFields();
    onReset(); // 调用自定义重置回调
  };

  const renderReadOnlyComponent = (field) => {
    switch (field.type) {
      case "input":
      case "textarea":
        return <span>{}</span>;
    }
  };

  const renderComponent = (field, Component) => {
    switch (field.type) {
      case "input":
      case "textarea":
        return (
          <Component
            placeholder={field.placeholder}
            disabled={field.disabled}
            {...(field.otherConfig || {})}
          />
        );
      case "select":
      case "radioGroup":
        const ComItem = field.type === "select" ? Option : Radio;
        return (
          <Component
            placeholder={field.placeholder}
            disabled={field.disabled}
            {...(field.otherConfig || {})}
          >
            {field.options?.map((option) => (
              <ComItem key={option.value} value={option.value}>
                {option.label}
              </ComItem>
            ))}
          </Component>
        );
      case "uploadAvatar":
      case "uploadFile":
        return (
          <Component
            disabled={field.disabled}
            listType={field.type === "uploadAvatar" ? "picture-card" : "text"}
            accept={imgFileTypes}
            maxCount={1}
            {...(field.otherConfig || {})}
          >
            {field.type === "uploadAvatar" ? (
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            ) : (
              <Button icon={<UploadOutlined />}>Upload</Button>
            )}
          </Component>
        );
    }
  };

  return (
    <Form
      className={`${styles.form} ${className}`}
      form={form}
      layout={layout}
      requiredMark={showButtons ? customizeRequiredMark : false}
      onFinish={onFinish}
      onValuesChange={(_changedValues, allValues) => watchForm(allValues)}
      initialValues={initialValues}
    >
      <Row gutter={16}>
        {formConfig.map((field, index) => {
          const Component = componentMap[field.type]; // 根据类型获取对应组件
          if (!Component) return null; // 如果类型无效，则返回空

          return (
            <Col
              span={
                field.fullRow && field.fullRow === true ? 24 : 24 / itemsPerRow
              }
              key={index}
            >
              <Form.Item
                label={field.label}
                name={field.name}
                required={field.required}
                rules={[{ required: field.required }, ...(field.rules || [])]}
                {...(field.type === "uploadAvatar" ||
                field.type === "uploadFile"
                  ? {
                      valuePropName: "fileList",
                      getValueProps: normFile,
                    }
                  : {})}
              >
                {!!readOnly && renderReadOnlyComponent(field)}
                {!readOnly && renderComponent(field, Component)}
              </Form.Item>
            </Col>
          );
        })}
        {!readOnly && showButtons && (
          <Col>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button htmlType="button" onClick={handleReset}>
                  Reset
                </Button>
              </Space>
            </Form.Item>
          </Col>
        )}
      </Row>
    </Form>
  );
};

export default PcDynamicForm;
