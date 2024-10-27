import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ItemManagement from './components/ItemManagement'
import NotFound from './components/NotFound'; // Create this component for unmatched routes

function App() {
    const [id, setID] = useState('');
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login setID={setID}/>} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard id={id} />} />
                <Route path="/items" element={<ItemManagement />} />
                <Route path="*" element={<NotFound />} /> {/* Fallback route */}
            </Routes>
        </Router>
    );
}

export default App;
