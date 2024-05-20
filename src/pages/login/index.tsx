import { useState } from "react";
import { Button } from "antd";
import {useNavigate} from 'react-router-dom'
import styles from "./index.module.less";

type LoginObjType = {
  username: string;
  password: string;
  code: string;
};

const Login = () => {
    const navigate = useNavigate();
  const [loginObj, setLoginObj] = useState<LoginObjType>({
    username: "",
    password: "",
    code: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const changeValue = (key: keyof typeof loginObj, value: string) => {
    setLoginObj((v) => ({ ...v, [key]: value }));
  };

  const submit = () => {
    if(loginObj.username === 'admin' && loginObj.password === '123456' && loginObj.code === '1234'){
        navigate('/')
    }else{

    }
  }

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
          <div className={styles.title}>Sign in</div>
          <div className={styles.form_item}>
            <div className={styles.form_item_key}>username</div>
            <input
              className={styles.form_item_value}
              value={loginObj.username}
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
              value={loginObj.password}
              onChange={(e: any) => {
                changeValue("password", e.target.value);
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
              value={loginObj.code}
              onChange={(e: any) => {
                changeValue("code", e.target.value);
              }}
              placeholder="1234"
            />
          </div>
          <div className={styles.form_btn}>
            <Button className={styles.form_btn_item} loading={loading} onClick={() => navigate('/register')}>
              Sign up
            </Button>
            <Button className={styles.form_btn_item_primary} loading={loading} onClick={submit}>
              Sign in
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

export default Login;
