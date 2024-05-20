import { useEffect, useState } from "react";
import { isMobileDevice } from "@utils/utils";
import PcDynamicForm from "./components/PcDynamicForm";
import MobileDynamicForm from "./components/MobileDynamicForm";

const DynamicForm = (props) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const windowSizeFunc = () => {
    setIsMobile(isMobileDevice());
  };

  useEffect(() => {
    windowSizeFunc();
    window.addEventListener("resize", windowSizeFunc);

    return () => {
      window.removeEventListener("resize", windowSizeFunc);
    };
  }, []);

  return isMobile ? (
    <MobileDynamicForm {...props} />
  ) : (
    <PcDynamicForm {...props} />
  );
};

export default DynamicForm;
