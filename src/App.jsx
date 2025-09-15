import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Auth from "./pages/Auth";
import Users from "./pages/Users";
import { useState } from "react";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import PrivateRoute from "./components/routes/privateRoute";
import AppLayout from "./pages/appLayout";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("Add new user");
  const [isEditing, setIsEditing] = useState();
  function onClose() {
    setIsOpen(false);
  }
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/users" element={<Users />} />
          </Route>
        </Route>

        <Route path="/auth" element={<Auth />} />

        <Route path="*" element={<Navigate to={"/"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
