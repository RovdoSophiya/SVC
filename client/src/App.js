import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../src/assets/pages/_components/header/header";
import Main from "../src/assets/pages/mainPage/mainPage";
import Footer from "./assets/pages/_components/footer/footer";
import Login from "./assets/pages/loginPage/loginPage";
import Client from "./assets/pages/clientPage/clientPage";
// import Registration from "./assets/pages/registrationPage/registrationPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Main />} />
        {/* <Route path="/dishes" element={<Dishes />} />
        <Route path="/Reviews" element={<Reviews />} */}
        <Route path="/login" element={<Login />} />
        <Route path="/client" element={<Client />} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
