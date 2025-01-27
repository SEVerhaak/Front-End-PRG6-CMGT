import {useNavigate, useParams} from "react-router";
import { useEffect } from "react";

function SpeakersDelete() {
    const navigate = useNavigate();

    const params= useParams();
    const id = params.id;

    useEffect(() => {
        async function deleteSpots() {
            try {
                const response = await fetch(`http://145.24.223.19:8001/speakers/${id}`, {
                    method: 'DELETE', // Specify DELETE method
                    headers: {
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                navigate('/speakers');
            } catch (error) {
                console.error('Error:', error);
            }
        }

        deleteSpots();
    }, [id, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <h1 className="text-2xl font-bold text-red-500">Deleting Spot...</h1>
        </div>
    );
}

export default SpeakersDelete;