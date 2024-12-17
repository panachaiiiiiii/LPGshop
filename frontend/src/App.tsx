import { ConfigProvider } from "antd";
import { Theme } from "./configs/theme.tsx";
import Router from "./router/router";

function App() {
  return (
    <ConfigProvider theme={Theme}>
      <Router />
    </ConfigProvider>
  );
}

export default App;
