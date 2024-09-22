import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../src/same_Elements/Header/header";
import Footer from "../src/same_Elements/Footer/footer";
import Main from "";
import About from "";
import Reviews from "";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/Main" element={<Main />} />
        <Route path="/About" element={<About />} />
        <Route path="/Reviews" element={<Reviews />} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
