import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Cards from "./components/Cards";
import Course from "./components/Course";
import Holy from "./components/CourseSection/Holy";
import Philosophy from "./components/CourseSection/Philosophy";
import Love from "./components/CourseSection/Love";
import Emotional from "./components/CourseSection/Emotional";
import Self from "./components/CourseSection/Self";

// Import the new components
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* --- Public Routes --- */}
        <Route
          path="/"
          element={
            <div>
              <Home />
              <Cards />
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* --- Protected Routes --- */}
        <Route
          path="/course"
          element={
            <ProtectedRoute>
              <Course />
            </ProtectedRoute>
          }
        />
        <Route
          path="/holy"
          element={
            <ProtectedRoute>
              <Holy />
            </ProtectedRoute>
          }
        />
        <Route
          path="/philosophy"
          element={
            <ProtectedRoute>
              <Philosophy />
            </ProtectedRoute>
          }
        />
        <Route
          path="/love"
          element={
            <ProtectedRoute>
              <Love />
            </ProtectedRoute>
          }
        />
        <Route
          path="/emotional"
          element={
            <ProtectedRoute>
              <Emotional />
            </ProtectedRoute>
          }
        />
        <Route
          path="/self"
          element={
            <ProtectedRoute>
              <Self />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
