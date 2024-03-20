import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRoutes from "./routes/userRoutes";
import { Toaster } from "sonner";

function App() {
  return (
    <Router>
      <Toaster richColors position="top-right"/>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
