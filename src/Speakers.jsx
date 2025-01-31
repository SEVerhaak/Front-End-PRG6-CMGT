import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router";

function Speakers() {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [speakers, setSpeakers] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(true);

    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;

    const pageSizeOptions = [5, 10, 20, 50];

    useEffect(() => {
        async function fetchSpeakers() {
            try {
                const response = await fetch(`http://145.24.223.19:8001/speakers/?page=${page}&limit=${limit}`, {
                    headers: {
                        'Accept': 'application/json',
                    }
                });
                const data = await response.json();
                setSpeakers(data.items);
                setPagination(data.pagination);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching speakers:', error);
                setLoading(false);
            }
        }

        fetchSpeakers();
    }, [page, limit]);

    async function handleDelete(id) {
        try {
            const response = await fetch(`http://145.24.223.19:8001/speakers/${id}`, {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                }
            });

            if (response.ok) {
                setSpeakers(prevSpeakers => prevSpeakers.filter(speaker => speaker.id !== id));
            } else {
                console.error("Failed to delete the speaker.");
            }
        } catch (error) {
            console.error("Error deleting speaker:", error);
        }
    }

    const handlePageSizeChange = (event) => {
        const newLimit = event.target.value;
        setSearchParams({ page: 1, limit: newLimit });
    };

    return (
        <>
            <h1 className='text-2xl font-bold text-center m-3'>Speaker Overview</h1>

            <div className="flex justify-end mb-4">
                <label className="mr-2 text-lg">Items per page:</label>
                <select
                    value={limit}
                    onChange={handlePageSizeChange}
                    className="px-4 py-2 bg-white text-gray-700 rounded-md border border-gray-300"
                >
                    {pageSizeOptions.map(size => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>

            {loading ? (
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="loader border-t-4 border-green-500 rounded-full w-16 h-16 animate-spin"></div>
                </div>
            ) : (
                <div>
                    <div className="products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                        {speakers.map((product) => (
                            <div
                                key={product.id}
                                className="product-card bg-green-500 text-white p-4 rounded shadow-md"
                            >
                                <h2 className="font-bold text-2xl">{product.title}</h2>

                                <Link
                                    to={`/speakers/${product.id}`}
                                    state={{ background: location, speaker: product }}
                                    className="inline-block mt-2 px-4 py-2 bg-white text-green-500 font-semibold rounded hover:bg-gray-100 transition"
                                >
                                    Details
                                </Link>

                                <Link
                                    to={`/speakers/${product.id}/edit`}
                                    className="inline-block mt-2 ml-2 mr-2 px-4 py-2 bg-white text-green-500 font-semibold rounded hover:bg-gray-100 transition"
                                >
                                    Edit
                                </Link>

                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="inline-block mt-2 px-4 py-2 bg-red-500 ml-2 text-white font-semibold rounded hover:bg-red-700 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center space-x-2 mt-4">
                        {pagination._links?.first && (
                            <Link
                                to={`?page=1&limit=${limit}`}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                First
                            </Link>
                        )}

                        {pagination._links?.previous && (
                            <Link
                                to={`?page=${pagination._links.previous.page}&limit=${limit}`}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Previous
                            </Link>
                        )}

                        {pagination._links?.next && (
                            <Link
                                to={`?page=${pagination._links.next.page}&limit=${limit}`}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Next
                            </Link>
                        )}

                        {pagination._links?.last && (
                            <Link
                                to={`?page=${pagination._links.last.page}&limit=${limit}`}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Last
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Speakers;
