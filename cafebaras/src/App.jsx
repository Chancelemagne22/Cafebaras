import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from './frontend/Signup';
import NotFound from './frontend/NotFound';
import LoginPage from './frontend/Login';
import Dashboard from './frontend/Dashboard';
import OrderManagement from './frontend/OrderManagement';
import Inventory from './frontend/Inventory';
import Settings from './frontend/Set';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import ReportAnalysis from './frontend/ReportAnalysis';


function App() {

    return (
        <PrimeReactProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage/>} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/order" element={<OrderManagement/>}/>
                    <Route path='/inventory' element = {<Inventory/>}/>
                    <Route path="/report" element={<ReportAnalysis/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </PrimeReactProvider>
        
    );
}

export default App;
