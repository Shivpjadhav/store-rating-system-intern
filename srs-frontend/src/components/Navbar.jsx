import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");
    };

    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px",
                background: "#f5f5f5"
            }}
        >
            <h2>Store Rating App</h2>

            <div>

                {user?.role === "ADMIN" && (
                    <Link
                        to="/admin/dashboard"
                        style={{ marginRight: "15px" }}
                    >
                        Dashboard
                    </Link>
                )}

                {user?.role === "USER" && (
                    <Link
                        to="/user/stores"
                        style={{ marginRight: "15px" }}
                    >
                        Stores
                    </Link>
                )}

                {user?.role === "STORE_OWNER" && (
                    <Link
                        to="/owner/dashboard"
                        style={{ marginRight: "15px" }}
                    >
                        Dashboard
                    </Link>
                )}

                <button onClick={logout}>
                    Logout
                </button>

            </div>
        </nav>
    );
}

export default Navbar;