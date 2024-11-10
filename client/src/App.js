import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../src/assets/pages/_components/header/header";
import Main from "../src/assets/pages/mainPage/mainPage";
import Footer from "./assets/pages/_components/footer/footer";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Main />} />
        {/* <Route path="/dishes" element={<Dishes />} />
        <Route path="/Reviews" element={<Reviews />}
        <Route path="/Login" element={<Login> />} /> */}
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
