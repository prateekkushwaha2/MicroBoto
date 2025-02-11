import React from 'react';

import ReactDOM from 'react-dom/client';
import { useState, useEffect, useNavigate } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import App from './App.jsx';
import Userprofile from './Userprofile.jsx';
import PasswordChange from './PasswordChange.jsx';
import Bot from './Bot.jsx';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
  <React.StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Userprofile" element={<Userprofile />}  />
        <Route path="/PasswordChange/:token" element={<PasswordChange />}/>
        <Route path="/Bot" element={<Bot />} />
      </Routes>
  </React.StrictMode>
  </Router>
);
