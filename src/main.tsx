import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import type { ConfigProviderProps } from "antd";
import App from "./App.tsx";
import "./index.css";

const antdConfig: ConfigProviderProps = {
  direction: "ltr",
  theme: {
    token: {
      colorPrimary: '#1890ff',
    },
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider {...antdConfig}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ConfigProvider>
);
