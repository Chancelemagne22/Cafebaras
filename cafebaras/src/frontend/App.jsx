import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ItemManagement from './components/ItemManagement';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/loginComponents/protectedRoute';

function App() {
    const [id, setID] = useState('');

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login setID={setID} />} />
                <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute>
                            <Dashboard id={id} />
                        </ProtectedRoute>
                    } 
                />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/items" element={<ItemManagement />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
