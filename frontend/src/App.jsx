import { Routes, Route } from "react-router-dom";
import WebsiteRouter from "./WebsiteRouter";
import AppAdmin from "./Admin/AppAdmin";
// import SmoothScrollProvider from "./Components/SmoothScrollProvider";

function App() {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          // <SmoothScrollProvider>
            <WebsiteRouter />
          // </SmoothScrollProvider>
        }
      />
      <Route path="/admin/*" element={<AppAdmin />} />
    </Routes>
  );
}

export default App;
