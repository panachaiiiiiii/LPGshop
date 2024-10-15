import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./page/home";
import SettingPage from "./page/setting_page";
import AddItemPage from "./page/Additem_page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="setting" element={<SettingPage />} />
        <Route path="add-item" element={<AddItemPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
