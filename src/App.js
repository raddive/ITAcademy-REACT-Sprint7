import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './css/App.css';

import Landing from './pages/Landing';
import Main from './pages/Main';
import NoPage from './pages/NoPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/main" element={<Main />} />
        <Route path="/*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );



  // return (
  //   <Main />
  // );
}

export default App;
