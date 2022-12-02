import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './css/App.css';

import Landing from './pages/Landing';
import Presupuesto from './pages/Presupuesto';
import NoPage from './pages/NoPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/presupuesto" element={<Presupuesto />} />
        <Route path="/*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );



  // return (
  //   <Presupuesto />
  // );
}

export default App;
