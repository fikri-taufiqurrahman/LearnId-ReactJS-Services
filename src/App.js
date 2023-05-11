import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Quiz from "./pages/Quiz";
import Translate from "./pages/Translate";
import ScanToTranslate from "./pages/ScanToTranslate";
import Question from "./pages/Question";
// import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz/:quizid/:questionid" element={<Question />} />
          <Route path="/translate" element={<Translate />} />
          <Route path="/scantotranslate" element={<ScanToTranslate />} />
          {/* <Route path="/products/edit/:id" element={<EditProduct />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
