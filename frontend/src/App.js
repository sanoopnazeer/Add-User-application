import { Route, Routes } from "react-router-dom";
import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import ViewPage from "./pages/ViewPage";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import ListPage from "./pages/ListPage";
import EditPage from "./pages/EditPage";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/view/:userId" element={<ViewPage />} />
        <Route path="/edit/:userId" element={<EditPage />} />
      </Routes>
    </div>
  );
}

export default App;
