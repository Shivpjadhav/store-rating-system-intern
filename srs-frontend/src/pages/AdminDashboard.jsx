import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "./AdminDashboard.css";

function AdminDashboard() {

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalStores: 0,
        totalRatings: 0
    });

    const [users, setUsers] = useState([]);
    const [stores, setStores] = useState([]);
    const [search, setSearch] = useState("");

    const [userForm, setUserForm] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        role: "USER"
    });

    const [storeForm, setStoreForm] = useState({
        name: "",
        email: "",
        address: "",
        owner_id: ""
    });

    useEffect(() => {

        fetchDashboard();
        fetchUsers();
        fetchStores();

    }, []);

    const fetchDashboard = async () => {

        try {

            const res =
                await API.get("/admin/dashboard");

            setStats(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    const fetchUsers = async () => {

        try {

            const res =
                await API.get("/admin/users");

            setUsers(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    const fetchStores = async () => {

        try {

            const res =
                await API.get("/admin/stores");

            setStores(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    const addUser = async (e) => {

        e.preventDefault();

        try {

            await API.post(
                "/admin/users",
                userForm
            );

            alert("User Added Successfully");

            setUserForm({
                name: "",
                email: "",
                password: "",
                address: "",
                role: "USER"
            });

            fetchUsers();
            fetchDashboard();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Error"
            );

        }

    };

    const addStore = async (e) => {

        e.preventDefault();

        try {

            await API.post(
                "/admin/stores",
                storeForm
            );

            alert("Store Added Successfully");

            setStoreForm({
                name: "",
                email: "",
                address: "",
                owner_id: ""
            });

            fetchStores();
            fetchDashboard();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Error"
            );

        }

    };

    const viewUser = async (id) => {

        try {

            const res =
                await API.get(
                    `/admin/users/${id}`
                );

            const user = res.data;

            alert(
                `
Name: ${user.name}
Email: ${user.email}
Address: ${user.address}
Role: ${user.role}
Rating: ${user.rating || "N/A"}
                `
            );

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div>

            <Navbar />

            <div style={{ padding: "20px" }}>

                <h1>Admin Dashboard</h1>


                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        marginBottom: "30px"
                    }}
                >

                    <div className="card">
                        <h3>Total Users</h3>
                        <p>{stats.totalUsers}</p>
                    </div>

                    <div className="card">
                        <h3>Total Stores</h3>
                        <p>{stats.totalStores}</p>
                    </div>

                    <div className="card">
                        <h3>Total Ratings</h3>
                        <p>{stats.totalRatings}</p>
                    </div>

                </div>


                <h2>Add User</h2>

                <form
                    onSubmit={addUser}
                    style={{
                        display: "grid",
                        gap: "10px",
                        marginBottom: "30px"
                    }}
                >

                    <input
                        value={userForm.name}
                        placeholder="Name"
                        onChange={(e) =>
                            setUserForm({
                                ...userForm,
                                name: e.target.value
                            })
                        }
                    />

                    <input
                        value={userForm.email}
                        placeholder="Email"
                        onChange={(e) =>
                            setUserForm({
                                ...userForm,
                                email: e.target.value
                            })
                        }
                    />

                    <input
                        value={userForm.address}
                        placeholder="Address"
                        onChange={(e) =>
                            setUserForm({
                                ...userForm,
                                address: e.target.value
                            })
                        }
                    />

                    <input
                        type="password"
                        value={userForm.password}
                        placeholder="Password"
                        onChange={(e) =>
                            setUserForm({
                                ...userForm,
                                password: e.target.value
                            })
                        }
                    />

                    <select
                        value={userForm.role}
                        onChange={(e) =>
                            setUserForm({
                                ...userForm,
                                role: e.target.value
                            })
                        }
                    >
                        <option value="USER">
                            USER
                        </option>

                        <option value="ADMIN">
                            ADMIN
                        </option>

                        <option value="STORE_OWNER">
                            STORE_OWNER
                        </option>

                    </select>

                    <button type="submit">
                        Add User
                    </button>

                </form>


                <h2>Add Store</h2>

                <form
                    onSubmit={addStore}
                    style={{
                        display: "grid",
                        gap: "10px",
                        marginBottom: "30px"
                    }}
                >

                    <input
                        value={storeForm.name}
                        placeholder="Store Name"
                        onChange={(e) =>
                            setStoreForm({
                                ...storeForm,
                                name: e.target.value
                            })
                        }
                    />

                    <input
                        value={storeForm.email}
                        placeholder="Store Email"
                        onChange={(e) =>
                            setStoreForm({
                                ...storeForm,
                                email: e.target.value
                            })
                        }
                    />

                    <input
                        value={storeForm.address}
                        placeholder="Address"
                        onChange={(e) =>
                            setStoreForm({
                                ...storeForm,
                                address: e.target.value
                            })
                        }
                    />

                    <input
                        value={storeForm.owner_id}
                        placeholder="Owner ID"
                        onChange={(e) =>
                            setStoreForm({
                                ...storeForm,
                                owner_id: e.target.value
                            })
                        }
                    />

                    <button type="submit">
                        Add Store
                    </button>

                </form>


                <input
                    type="text"
                    placeholder="Search Users / Stores"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    style={{
                        padding: "10px",
                        width: "300px",
                        marginBottom: "20px"
                    }}
                />


                <h2>Users</h2>

                <table border="1" width="100%" cellPadding="10">

                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {users
                            .filter(user =>
                                JSON.stringify(user)
                                    .toLowerCase()
                                    .includes(
                                        search.toLowerCase()
                                    )
                            )
                            .map(user => (

                                <tr key={user.id}>

                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.address}</td>
                                    <td>{user.role}</td>

                                    <td>

                                        <button
                                            onClick={() =>
                                                viewUser(
                                                    user.id
                                                )
                                            }
                                        >
                                            View
                                        </button>

                                    </td>

                                </tr>

                            ))}

                    </tbody>

                </table>


                <h2 style={{ marginTop: "30px" }}>
                    Stores
                </h2>

                <table border="1" width="100%" cellPadding="10">

                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Rating</th>
                        </tr>
                    </thead>

                    <tbody>

                        {stores
                            .filter(store =>
                                JSON.stringify(store)
                                    .toLowerCase()
                                    .includes(
                                        search.toLowerCase()
                                    )
                            )
                            .map(store => (

                                <tr key={store.id}>

                                    <td>{store.name}</td>
                                    <td>{store.email}</td>
                                    <td>{store.address}</td>

                                    <td>
                                        {store.average_rating || 0}
                                    </td>

                                </tr>

                            ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default AdminDashboard;