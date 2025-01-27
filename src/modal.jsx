import { useNavigate } from "react-router";

function Modal({ children }) {
    const navigate = useNavigate();

    function closeModal() {
        navigate(-1); // ✅ Go back without reload
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl">
                    ✖
                </button>
                {children}
            </div>
        </div>
    );
}

export default Modal;