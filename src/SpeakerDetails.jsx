import {redirect, useNavigate, useParams} from "react-router";

function SpeakerDetails({ speaker }) {
    const navigate = useNavigate();

    if (!speaker) return <p>Loading...</p>;


    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <h2 className="text-2xl font-bold">{speaker.title}</h2>
            <p className="mt-2 text-gray-700">{speaker.description}</p>

            <button
                onClick={() => navigate(`/speakers/details/${speaker.id}`)}
                className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
            >
                More Details
            </button>

            <button
                onClick={() => window.history.back()}
                className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
            >
                Close
            </button>
        </div>
    );
}

export default SpeakerDetails;
