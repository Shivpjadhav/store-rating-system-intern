import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Signup";

import AdminDashboard from "./pages/AdminDashboard";
import UserStores from "./pages/UserStores";
import OwnerDashboard from "./pages/OwnerDashboard";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public Routes */}
                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* Admin Routes */}
                <Route
                    path="/admin/dashboard"
                    element={<AdminDashboard />}
                />

                {/* User Routes */}
                <Route
                    path="/user/stores"
                    element={<UserStores />}
                />

                {/* Store Owner Routes */}
                <Route
                    path="/owner/dashboard"
                    element={<OwnerDashboard />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;