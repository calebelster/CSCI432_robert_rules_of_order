import ReactDOM from 'react-dom/client'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom' // Import router components

// Import all your page components
import LandingPage from './LandingPage.jsx'
import SignIn from './Login.jsx'
import SignUp from './SignUp.jsx'
import './index.css' // Global styles if any

ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        {/* 1. Wrap the entire app in BrowserRouter */}
        <BrowserRouter>
            {/* 2. Define the Routes container */}
            <Routes>
                {/* 3. Define the path for each component */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)
