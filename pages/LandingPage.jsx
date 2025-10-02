import React, { useState } from "react";

export default function LandingPage() {
    const [data, setData] = useState({
        infoBoxes: [
            { id: 1, text: "Box 1" },
            { id: 2, text: "Box 2" },
            { id: 3, text: "Box 3" },
            { id: 4, text: "Box 4" },
            { id: 5, text: "Box 5" },
            { id: 6, text: "Box 6" },
        ],
    });

    // 3️⃣ Example of updating data when user interacts (adds a box)
    const addBox = () => {
        const newId = data.infoBoxes.length + 1;
        setData({
            ...data,
            infoBoxes: [
                ...data.infoBoxes,
                { id: newId, text: `Box ${newId}` },
            ],
        });
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="flex justify-between items-center p-4 bg-gray-100">
                <div className="flex items-center space-x-2">
                    <img src="/assets/gavel_logo.png" alt="Logo" className="w-8 h-8" />
                    <span className="text-lg font-bold">Robert Rules of Order</span>
                </div>
                <div className="space-x-4">
                    <a href="/signin" className="text-blue-500">
                        Log In
                    </a>
                    <a href="/signup" className="text-blue-500">
                        Sign Up
                    </a>
                </div>
            </nav>

            {/* Main content */}
            <main className="flex-1 text-center py-12">
                <h1 className="text-3xl font-bold">Welcome to MySite</h1>
                <p className="text-gray-600 mt-2">
                    Your gateway to awesome features. Join us or log in to get started!
                </p>
                <div className="mt-4 space-x-4">
                    <a href="/signin" className="px-4 py-2 bg-blue-500 text-white rounded">
                        Log In
                    </a>
                    <a href="/signup" className="px-4 py-2 bg-green-500 text-white rounded">
                        Sign Up
                    </a>
                </div>
            </main>

            {/* Info grid */}
            <div className="grid grid-cols-3 gap-4 p-6">
                {data.infoBoxes.map((box) => (
                    <div
                        key={box.id}
                        className="border p-4 text-center bg-gray-50 rounded"
                    >
                        {box.text}
                    </div>
                ))}
            </div>

            {/* Add a box button */}
            <div className="text-center my-4">
                <button
                    onClick={addBox}
                    className="px-4 py-2 bg-indigo-500 text-white rounded"
                >
                    Add Box
                </button>
            </div>

            {/* Footer */}
            <footer className="bg-gray-100 text-center p-4">
                <p>&copy; 2024 MySite. All rights reserved.</p>
            </footer>
        </div>
    );
}