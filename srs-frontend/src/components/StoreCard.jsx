import { useState } from "react";
import API from "../services/api";

function StoreCard({ store, refreshStores }) {

    const [rating, setRating] = useState(
        store.user_rating || ""
    );

    const submitRating = async () => {

        try {

            if (store.user_rating) {

                await API.put(
                    `/ratings/${store.id}`,
                    {
                        rating
                    }
                );

                alert("Rating Updated");

            } else {

                await API.post(
                    "/ratings",
                    {
                        store_id: store.id,
                        rating
                    }
                );

                alert("Rating Submitted");
            }

            refreshStores();

        } catch (error) {

            alert(
                error.response?.data?.message
            );
        }
    };

    return (

        <div
            style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "8px"
            }}
        >

            <h3>{store.name}</h3>

            <p>
                <strong>Address:</strong>
                {" "}
                {store.address}
            </p>

            <p>
                <strong>Average Rating:</strong>
                {" "}
                {store.average_rating || 0}
            </p>

            <p>
                <strong>Your Rating:</strong>
                {" "}
                {store.user_rating || "Not Rated"}
            </p>

            <select
                value={rating}
                onChange={(e) =>
                    setRating(e.target.value)
                }
            >
                <option value="">
                    Select Rating
                </option>

                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>

            </select>

            <button
                onClick={submitRating}
                style={{
                    marginLeft: "10px"
                }}
            >
                {store.user_rating
                    ? "Update Rating"
                    : "Submit Rating"}
            </button>

        </div>
    );
}

export default StoreCard;