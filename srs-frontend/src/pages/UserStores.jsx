import { useEffect, useState } from "react";
import API from "../services/api";

function UserStores() {

    const [stores, setStores] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchStores();
    }, []);

    const fetchStores = async () => {

        try {

            const res = await API.get("/stores");

            setStores(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleRating = async (
        storeId,
        rating,
        existingRating
    ) => {

        try {

            if (existingRating) {

                await API.put(
                    `/ratings/${storeId}`,
                    { rating }
                );

                alert("Rating Updated");

            } else {

                await API.post(
                    "/ratings",
                    {
                        store_id: storeId,
                        rating
                    }
                );

                alert("Rating Submitted");
            }

            fetchStores();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }

    };

    const filteredStores = stores.filter(
        (store) =>
            (store.name || "")
                .toLowerCase()
                .includes(search.toLowerCase()) ||

            (store.address || "")
                .toLowerCase()
                .includes(search.toLowerCase())
    );

    return (

        <div style={{ padding: "20px" }}>

            <h2>All Stores</h2>

            <input
                type="text"
                placeholder="Search Store..."
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

            <table
                border="1"
                width="100%"
                cellPadding="10"
            >

                <thead>

                    <tr>
                        <th>Store Name</th>
                        <th>Address</th>
                        <th>Overall Rating</th>
                        <th>Your Rating</th>
                        <th>Submit / Update</th>
                    </tr>

                </thead>

                <tbody>

                    {filteredStores.map((store) => (

                        <tr key={store.id}>

                            <td>{store.name}</td>

                            <td>{store.address}</td>

                            <td>
                                {store.average_rating || 0}
                            </td>

                            <td>
                                {store.user_rating || "-"}
                            </td>

                            <td>

                                <select
                                    value={
                                        store.user_rating || ""
                                    }
                                    onChange={(e) =>
                                        handleRating(
                                            store.id,
                                            Number(
                                                e.target.value
                                            ),
                                            store.user_rating
                                        )
                                    }
                                >

                                    <option value="">
                                        Select
                                    </option>

                                    <option value="1">
                                        1 ⭐
                                    </option>

                                    <option value="2">
                                        2 ⭐
                                    </option>

                                    <option value="3">
                                        3 ⭐
                                    </option>

                                    <option value="4">
                                        4 ⭐
                                    </option>

                                    <option value="5">
                                        5 ⭐
                                    </option>

                                </select>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default UserStores;