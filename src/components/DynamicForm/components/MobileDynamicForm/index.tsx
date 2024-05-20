import React from "react";
import {
  Form,
  Input,
  TextArea,
  DatePicker,
  Radio,
  Space,
  Button,
} from "antd-mobile";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { imgFileTypes } from "@components/DynamicForm/contant";
import styles from './index.module.less';

// 表单项类型
interface FormItem {
  name: string;
  label: string;
  placeholder: string | string[];
  type: string;
  required: boolean;
  disabled?: boolean;
  options?: { label: string; value: string }[];
  rules?: { type: "string"; [key: string]: any }[];
  otherConfig?: any;
}

// 组件映射类型
interface ComponentMap {
  [key: string]: React.ComponentType<any>;
}

const componentMap: ComponentMap = {
  input: Input,
  textarea: TextArea,
  //   select: Select,
  datePicker: DatePicker,
  //   rangePicker: RangePicker,
  radioGroup: Radio.Group,
  uploadAvatar: Upload,
  uploadFile: Upload,
};

interface MobileDynamicFormProps {
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

const MobileDynamicForm = (props: MobileDynamicFormProps) => {
  console.log(props.formConfig);
  const { layout = "vertical", formConfig, readOnly, initialValues } = props;
  const [form] = Form.useForm();

  return (
    <Form className={styles['form-mobile']} form={form} layout={layout}>
      {formConfig.map((field, index) => {
        const Component = componentMap[field.type]; // 根据类型获取对应组件
        if (!Component) return null; // 如果类型无效，则返回空
        return (
          <Form.Item
            key={index}
            label={field.label}
            name={field.name}
            required={field.required}
            rules={[{ required: field.required }, ...(field.rules || [])]}
          >
            {!!readOnly && <span>{initialValues[field.name]}</span>}
            {!readOnly &&
              (field.type === "input" || field.type === "textarea") && (
                <Component
                  placeholder={field.placeholder}
                  disabled={field.disabled}
                  {...(field.otherConfig || {})}
                />
              )}
            {!readOnly && field.type === "radioGroup" && (
              <Component
                placeholder={field.placeholder}
                disabled={field.disabled}
                {...(field.otherConfig || {})}
              >
                <Space direction="vertical">
                  {field.options?.map((option) => (
                    <Radio key={option.value} value={option.value}>
                      {option.label}
                    </Radio>
                  ))}
                </Space>
              </Component>
            )}
            {!readOnly && field.type === "uploadAvatar" && (
              <Component
                disabled={field.disabled}
                listType="picture-card"
                accept={imgFileTypes}
                maxCount={1}
                {...(field.otherConfig || {})}
              >
                <button style={{ border: 0, background: "none" }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              </Component>
            )}
            {!readOnly && field.type === "uploadFile" && (
              <Component
                disabled={field.disabled}
                accept="*"
                maxCount={1}
                {...(field.otherConfig || {})}
              >
                <Button>Upload</Button>
              </Component>
            )}
          </Form.Item>
        );
      })}
    </Form>
  );
};

export default MobileDynamicForm;
