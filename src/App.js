import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Pages/Main/main.jsx";
import Menu from "./Pages/Menu/Menu.jsx";
import About from "./Pages/About/about.jsx";
import Login from "./Pages/Welcome/Login/login.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/About" element={<About />} />  
        <Route path="/Log in" element={<Login />} />  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
