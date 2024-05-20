import { BrowserRouter } from "react-router-dom";
import RenderRoutes from './RenderRoutes'

const Router = () => {
  return (
    <BrowserRouter>
      <RenderRoutes />
    </BrowserRouter>
  )
}

export default Router