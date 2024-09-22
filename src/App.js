import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../src/same_Elements/Header/header";
import Footer from "../src/same_Elements/Footer/footer";
import Main from "../src/Pages/Main/main";
/*import About from "";
import Reviews from "";
       <Route path="/About" element={<About />} />
        <Route path="/Reviews" element={<Reviews />} />*/

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
      <Route path="/" element={<Main />}/>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
