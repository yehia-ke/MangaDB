import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SessionProvider, useSession } from './context/SessionContext';
import Home from "./pages";
import About from "./pages/about";
import SignUp from "./pages/signup/signup";
import Login from "./pages/login/LoginPage";
import AdminPage from "./pages/admin/AdminPage";
import AdminPage2 from "./pages/admin/AdminPage2";
import AdminRoute from "./components/AdminRoute";
import TestPage from "./pages/TestPage/TestPage";
import CustomerPage from "./pages/customer/CustomerPage";
import CustomerRoute from "./components/CustomerRoute";

const PrivateRoute = ({ children }) => {
    const { user } = useSession();

    if (!user) {
        return <Navigate to="/" />;
    }

    return children;
};
const LoginRoute = ({ children }) => {
    const { user } = useSession();

    if (user && user.role==="admin") {
        return <Navigate to="/admin" />;
    }
    if (user && user.role==="user") {
        return <Navigate to="/customer" />;
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
                    <Route path="/login" element={
                        <LoginRoute>
                            <Login /> 
                            </LoginRoute>
                            } 
                            />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/test" element={<TestPage />} />
                    {/* Private Route for About */}
                    <Route
                        path="/about"
                        element={<About />}/>

                    {/* Admin Route */}
                    <Route
                        path="/admin"
                        element={
                            <AdminRoute>
                                <AdminPage />
                            </AdminRoute>
                        }
                    />

                    {/* New AdminPage2 Route */}
                    <Route
                        path="/admin2"
                        element={
                            <AdminRoute>
                                <AdminPage2 />
                            </AdminRoute>
                        }
                    />

                    {/* Customer Route */}
                    <Route
                        path="/customer"
                        element={
                            <CustomerRoute>
                                <CustomerPage />
                            </CustomerRoute>
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
