import { useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./register.module.less";

type RegisterObjType = {
  username: string;
  password: string;
  repeat_password: string;
  code: string;
};

const Register = () => {
  const navigate = useNavigate();
  const [registerObj, setRegisterObj] = useState<RegisterObjType>({
    username: "",
    password: "",
    repeat_password: "",
    code: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const changeValue = (key: keyof typeof registerObj, value: string) => {
    setRegisterObj((v) => ({ ...v, [key]: value }));
  };

  const submit = () => {
    if (
      registerObj.username === "admin" &&
      registerObj.password === "123456" &&
      registerObj.code === "1234" && registerObj.password === registerObj.repeat_password
    ) {
      navigate("/login");
    } else {
    }
  };

  return (
    <div className={styles.login}>
      <img
        className={styles.bg}
        src="https://api-render.wp-boke.work/picture/daily-bing?is_redirect=true"
        alt="bg"
      />
      <div className={styles.login_form}>
        <img
          className={styles.login_form_bg}
          src="https://api-render.wp-boke.work/picture/daily-bing?is_redirect=true"
          alt="bg"
        />

        <div className={styles.login_form_content}>
          <div className={styles.title}>Sign up</div>
          <div className={styles.form_item}>
            <div className={styles.form_item_key}>username</div>
            <input
              className={styles.form_item_value}
              value={registerObj.username}
              onChange={(e: any) => {
                changeValue("username", e.target.value);
              }}
              placeholder="admin"
            />
          </div>
          <div className={styles.form_item}>
            <div className={styles.form_item_key}>password</div>
            <input
              className={styles.form_item_value}
              type="password"
              value={registerObj.password}
              onChange={(e: any) => {
                changeValue("password", e.target.value);
              }}
              placeholder="123456"
            />
          </div>
          <div className={styles.form_item}>
            <div className={styles.form_item_key}>repeat</div>
            <input
              className={styles.form_item_value}
              type="password"
              value={registerObj.password}
              onChange={(e: any) => {
                changeValue("repeat_password", e.target.value);
              }}
              placeholder="123456"
            />
          </div>
          <div className={styles.code_box}>
            <div className={styles.code_img}></div>
            <Button className={styles.code_btn} type="text" loading={loading}>
              换一张
            </Button>
          </div>
          <div className={styles.form_item}>
            <div className={styles.form_item_key}>code</div>
            <input
              className={styles.form_item_value}
              value={registerObj.code}
              onChange={(e: any) => {
                changeValue("code", e.target.value);
              }}
              placeholder="1234"
            />
          </div>
          <div className={styles.form_btn}>
            <Button
              className={styles.form_btn_item}
              loading={loading}
              onClick={() => navigate("/login")}
            >
              Sign in
            </Button>
            <Button
              className={styles.form_btn_item_primary}
              loading={loading}
              onClick={submit}
            >
              Sign up
            </Button>
          </div>
          <div className={styles.agreement_box}>
            <div className={styles.agreement_text}>
              继续下一步，即表示你同意 Shimmer 的 服务条款;
              <br />
              并且确认你已阅读我们的 隐私政策。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
