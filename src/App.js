import Nevbar from "./Components/Nevbar";
import Home from "./Components/Home";
import About from "./Components/About";
import Gallary from "./Components/Gallary";
import Contact from "./Components/Contact";
import { Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
export default function App() {
  return (
    <>
      <Nevbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallary" element={<Gallary />} />
      </Routes>
      <Footer />
    </>
  );
}
