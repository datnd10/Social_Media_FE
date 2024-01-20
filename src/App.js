import "./App.css";
import Authentication from "./pages/Authentication/Authentication";
import Message from "./pages/Message/Message";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/message" element={<Message />} />
        <Route path="/*" element={<HomePage />} />
        <Route path="/*" element={<Authentication />} />
      </Routes>
    </div>
  );
}

export default App;
