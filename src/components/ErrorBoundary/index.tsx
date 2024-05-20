import React, { useEffect, useState } from "react";

const ErrorBoundary = ({ children }: any) => {
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const errorHandler = (error: any) => {
      // 处理错误，可以记录错误信息、发送错误报告等
      console.error("Error caught by boundary:", error);
      setHasError(true);
    };

    window.addEventListener("error", errorHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
    };
  }, [window.location.pathname]); // 空数组表示仅在组件挂载和卸载时运行

  if (hasError) {
    // 渲染备用 UI
    return <div>Oops! Something went wrong.</div>;
  }

  return children;
};

export default ErrorBoundary;
