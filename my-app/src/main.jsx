import ReactDOM from 'react-dom/client'
import React from 'react'
import LandingPage from './LandingPage.jsx' // Adjust path if needed
import './index.css' // Global styles if any

ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <LandingPage /> {/* Use the component here */}
    </React.StrictMode>
)
