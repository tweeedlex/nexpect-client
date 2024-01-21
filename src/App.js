import MainPage from "./pages/MainPage/MainPage";
import ModelsView from "./components/ModelsView/ModelsView";
import { Routes, Route } from "react-router-dom";
import WalkThrough from "./pages/WalkThrough/WalkThrough";

function App() {
  return (
    <div className="App">
      <div className="effect-block"></div>
      {/* routing here */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/walk-through" element={<WalkThrough />} />
      </Routes>
      {/* <ModelsView /> */}
      {/*  */}
    </div>
  );
}

export default App;
