import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from './frontend/Signup';
import NotFound from './frontend/NotFound';
import LoginPage from './frontend/Login';
import Dashboard from './frontend/Dashboard';
import SalesManagement from './frontend/SalesManagement';
import Inventory from './frontend/Inventory';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';

function App() {

    return (
        <PrimeReactProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage/>} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/sales" element={<SalesManagement/>}/>
                    <Route path='/inventory' element = {<Inventory/>}/>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </PrimeReactProvider>
        
    );
}

export default App;
