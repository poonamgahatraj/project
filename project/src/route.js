import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Estimatetable from './component/estimationform';
import Newestimate from './component/newestimate';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Estimatetable />} />
      <Route path="/new-estimates" element={<Newestimate />} />
    </Routes>
  );
}
