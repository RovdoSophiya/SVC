import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Pages/Main/main.jsx";
import Menu from "./Pages/Menu/Menu.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Menu" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
