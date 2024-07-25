import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllProducts from './AllProducts';
import ProductDetail from './ProductDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllProducts />} />
        <Route path="/product/:companyname/:category/:productId" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
