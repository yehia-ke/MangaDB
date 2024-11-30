import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SessionProvider, useSession } from './context/SessionContext';
import Home from "./pages";
import About from "./pages/about";
import SignUp from "./pages/signup/signup";
import Login from "./pages/login/LoginPage";
import AdminPage from "./pages/admin/AdminPage";
import AdminRoute from "./components/AdminRoute";

const PrivateRoute = ({ children }) => {
  const { user } = useSession();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <SessionProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Private Route for About */}
          <Route
            path="/about"
            element={
              <PrivateRoute>
                <About />
              </PrivateRoute>
            }
          />

          {/* Admin Route */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />

          {/* Catch-All Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </SessionProvider>
  );
}

export default App;
