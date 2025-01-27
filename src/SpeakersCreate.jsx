import { useState } from "react";
import { useNavigate } from "react-router";

function SpeakersCreate() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        review: '',
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState(null);

    // Input change handler
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });

        // Clear error message when user starts typing
        setErrors({ ...errors, [name]: '' });
    };

    // Client-side validation
    const validateForm = () => {
        let validationErrors = {};
        if (!formData.title.trim()) validationErrors.title = "Title is required.";
        if (!formData.description.trim()) validationErrors.description = "Description is required.";
        if (!formData.review.trim()) validationErrors.review = "Review is required.";

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Run validation before submitting
        if (!validateForm()) return;

        try {
            const response = await fetch("http://145.24.223.19:8001/speakers/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    review: formData.review,
                    views: 0,
                }),
            });

            if (response.status === 400) {
                setServerError("Invalid data. Please check your inputs.");
                return;
            }

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Success:', result);
            navigate('/succes'); // Redirect after successful submission
        } catch (error) {
            console.error('Error:', error);
            setServerError("An error occurred while submitting. Please try again.");
        }
    };

    return (
        <>
            <h1 className='text-2xl font-bold text-center m-3'>Create Speaker</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-gray-100 rounded shadow-md mt-10 space-y-4">

                {/* Title Input */}
                <div>
                    <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                            errors.title ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                        }`}
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                {/* Description Input */}
                <div>
                    <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="4"
                        className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 resize-y ${
                            errors.description ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                        }`}
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                {/* Review Input */}
                <div>
                    <label htmlFor="review" className="block text-gray-700 font-medium mb-2">Review:</label>
                    <textarea
                        id="review"
                        name="review"
                        value={formData.review}
                        onChange={handleInputChange}
                        rows="4"
                        className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 resize-y ${
                            errors.review ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                        }`}
                    ></textarea>
                    {errors.review && <p className="text-red-500 text-sm mt-1">{errors.review}</p>}
                </div>

                {/* Server Error Message */}
                {serverError && <p className="text-red-600 text-center mt-2">{serverError}</p>}

                {/* Submit Button */}
                <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition">
                    Create Speaker
                </button>
            </form>
        </>
    );
}

export default SpeakersCreate;
