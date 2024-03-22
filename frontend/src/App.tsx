import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRoutes from "./routes/userRoutes";
import AdminRoutes from "./routes/adminRoutes";
import { Toaster } from "sonner";

function App() {
  return (
    <Router>
      <Toaster richColors position="top-right"/>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/admin*" element={<AdminRoutes />} />

      </Routes>
    </Router>
  );
}

export default App;
