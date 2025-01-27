import { useParams, useNavigate } from "react-router"; // useNavigate added
import { useEffect, useState } from "react";

function SpeakersDetail_OLD() {
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate(); // Hook for redirection

    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteError, setDeleteError] = useState(null); // State for delete errors

    useEffect(() => {
        async function fetchDetails() {
            try {
                const incrementView = await fetch(`http://145.24.223.19:8001/speakers/${id}`, {
                    headers: { 'Accept': 'application/json' },
                    method: 'PATCH'
                })

                const response = await fetch(`http://145.24.223.19:8001/speakers/${id}`, {
                    headers: { 'Accept': 'application/json' }
                });
                const data = await response.json();
                setDetails(data);


            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchDetails();
    }, [id]);

    async function handleDelete() {
        try {
            const response = await fetch(`http://145.24.223.19:8001/speakers/${id}`, {
                method: "DELETE",
                headers: { 'Accept': 'application/json' }
            });

            if (!response.ok) {
                throw new Error("Failed to delete the speaker.");
            }

            // Redirect to the speakers list after successful deletion
            navigate("/speakers");
        } catch (error) {
            setDeleteError(error.message);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="loader border-t-4 border-green-500 rounded-full w-16 h-16 animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-red-100">
                <p className="text-red-500 font-semibold">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 flex justify-center items-center">
            <div className="max-w-3xl bg-white rounded-lg shadow-md overflow-hidden">
                <img
                    src="https://plein8.com/wp-content/uploads/2024/09/placeholder-2-1.png"
                    alt={details.title}
                    className="w-full h-64 object-cover"
                />
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-green-600 mb-2">{details.title}</h1>
                    <p className="text-gray-700 mb-4">{details.description}</p>
                    <p className="text-sm text-gray-500 mb-2"><strong>Review:</strong> {details.review}</p>
                    <p className="text-sm text-gray-500 mb-4"><strong>Views:</strong> {details.views}</p>

                    {/* Error message if deletion fails */}
                    {deleteError && <p className="text-red-500 font-semibold">{deleteError}</p>}

                    {/* Go Back Button */}
                    <button
                        onClick={() => window.history.back()}
                        className="mt-6 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                    >
                        Go Back
                    </button>

                    {/* Delete Button */}
                    <button
                        onClick={handleDelete}
                        className="mt-6 ml-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition"
                    >
                        Delete Speaker
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SpeakersDetail_OLD;
