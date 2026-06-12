import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function OwnerDashboard() {

    const [averageRating, setAverageRating] =
        useState(0);

    const [ratings, setRatings] =
        useState([]);

    useEffect(() => {

        fetchDashboard();
        fetchRatings();

    }, []);

    const fetchDashboard = async () => {

        try {

            const res =
                await API.get("/owner/dashboard");

            setAverageRating(
                res.data.average_rating || 0
            );

        } catch (error) {

            console.log(error);

        }

    };

    const fetchRatings = async () => {

        try {

            const res =
                await API.get("/owner/ratings");

            setRatings(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div>

            <Navbar />

            <h2>Store Owner Dashboard</h2>

            <h3>
                Average Rating:
                {averageRating}
            </h3>

            <table border="1" cellPadding="10">

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Rating</th>
                    </tr>
                </thead>

                <tbody>

                    {ratings.map((item, index) => (

                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.rating}</td>
                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default OwnerDashboard;