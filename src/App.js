import MainPage from "./pages/MainPage/MainPage";
import ModelsView from "./components/ModelsView/ModelsView";
import { Routes, Route } from "react-router-dom";
import WalkThrough from "./pages/WalkThrough/WalkThrough";
import { useEffect } from "react";
import ContactUs from "./pages/ContactUs/ContactUs";

function App() {
  return (
    <div className="App">
      <div className="effect-block"></div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/walk-through" element={<WalkThrough />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
      {/* <ModelsView /> */}
      {/*  */}
    </div>
  );
}

export default App;
