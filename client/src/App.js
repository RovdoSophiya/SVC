import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../src/assets/pages/_components/header/header";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        {/* <Route path="/" element={<Main />} /> */}
        {/* <Route path="/About" element={<About />} />
        <Route path="/Reviews" element={<Reviews />} /> */}
      </Routes>
      {/* <Footer></Footer> */}
    </BrowserRouter>
  );
}

export default App;
