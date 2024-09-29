import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../src/same_Elements/Header/header";
import Footer from "../src/same_Elements/Footer/footer";
import Main from "../src/Pages/Main/main";
import About from "../src/Pages/About/about";
import Reviews from "../src/Pages/Reviews/reviews";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/About" element={<About />} />
        <Route path="/Reviews" element={<Reviews />} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
