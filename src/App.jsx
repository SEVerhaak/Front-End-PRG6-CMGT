import './App.css'
import {createBrowserRouter, Router, RouterProvider, Link, useLocation} from "react-router";
import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import About from "./About.jsx";
import Speakers from "./Speakers.jsx";
import SpeakersCreate from "./SpeakersCreate.jsx";
import CreateSucces from "./CreateSucces.jsx";
import SpeakersDelete from "./SpeakersDelete.jsx";
import AllesGaatWeg from "./AllesGaatWeg.jsx";
import SpeakerEdit from "./SpeakerEdit.jsx";
import Modal from "./modal.jsx";
import SpeakerDetails from "./SpeakerDetails.jsx";
import SpeakersDetail_OLD from "./SpeakersDetail_OLD.jsx";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white text-gray-800">
            <h1 className="text-6xl font-extrabold text-red-500">404</h1>
            <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
            <p className="text-lg mt-2 text-gray-600">Sorry, the page you are looking for does not exist.</p>

            <Link to="/"
                  className="mt-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300">
                Go Home
            </Link>
        </div>
    );
};

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/about',
                element: <About/>
            },
            {
                path: '/speakers',
                element: <Speakers/>
            },
            {
                path: '/speakers/create',
                element: <SpeakersCreate/>
            },
            {
                path: '/speakers/:id/edit',
                element: <SpeakerEdit/>
            },
            {
                path: '/speakers/:id',
                element: <ModalWrapper/>
            },
            {
                path: '/speakers/details/:id',
                element: <SpeakersDetail_OLD/>
            },
            {
                path: '/speakers/:id/delete',
                element: <SpeakersDelete/>
            },
            {
                path: '/succes',
                element: <CreateSucces/>
            },
            {
                path: '/delete-all',
                element: <AllesGaatWeg/>
            },
            {
                path: '*',
                element: <NotFound/>
            },
        ]
    }
]);

// Wrapper to render modal on top of current page
function ModalWrapper() {
    const location = useLocation();
    const speaker = location.state?.speaker; // ✅ Retrieve passed speaker data

    return (
        <>
            <Speakers /> {/* Keep speakers visible */}
            {speaker && (
                <Modal>
                    <SpeakerDetails speaker={speaker} /> {/* ✅ Pass data to modal */}
                </Modal>
            )}
        </>
    );
}


function App() {
    return <RouterProvider router={router}/>;
}

export default App
