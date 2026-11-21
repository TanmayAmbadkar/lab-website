import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6 text-center">
            <h1 className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
                404
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Page Not Found</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-md">
                Oops! The page you are looking for has vanished into the void (or never existed).
            </p>
            <Link
                to="/"
                className="px-8 py-3 bg-blue-600 rounded-full text-white font-semibold hover:bg-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
            >
                Back to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
