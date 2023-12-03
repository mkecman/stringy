import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './features/login/Login';
import Signup from './features/login/Signup';
import { theme } from './app/styles';
import Editor from './features/editor/Editor';


function App()
{
  return (
    <div style={{ minHeight: "100vh"}}>
        <Router>
              <Routes>
                  <Route path="/" element={<Editor />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
