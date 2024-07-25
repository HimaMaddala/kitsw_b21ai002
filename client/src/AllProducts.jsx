import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button, Pagination, Dropdown } from 'react-bootstrap';
import './AllProducts.css';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('default');
  const productsPerPage = 4;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/test/companies/AMZ/categories/Laptop/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  const sortProducts = (products) => {
    switch (sortOption) {
      case 'priceAsc':
        return products.sort((a, b) => a.price - b.price);
      case 'priceDesc':
        return products.sort((a, b) => b.price - a.price);
      case 'rating':
        return products.sort((a, b) => b.rating - a.rating);
      default:
        return products;
    }
  };

  const sortedProducts = sortProducts([...products]);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2 style={{marginLeft:'50px'}}>Swift Products</h2>
      <br/>
      <div className="sort-options">
        <Dropdown onSelect={(eventKey) => setSortOption(eventKey)}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Sort By
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="default">Default</Dropdown.Item>
            <Dropdown.Item eventKey="priceAsc">Price: Low to High</Dropdown.Item>
            <Dropdown.Item eventKey="priceDesc">Price: High to Low</Dropdown.Item>
            <Dropdown.Item eventKey="rating">Rating</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="product-grid">
        {currentProducts.map(product => (
          <div key={product._id} className="product-card-container">
            <Card className="product-card h-100">
              <Card.Img variant="top" src={product.img_url} alt={product.name} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Company: {product.company}</Card.Text>
                <Card.Text>Category: {product.category}</Card.Text>
                <Card.Text>Price: ${product.price}</Card.Text>
                <Card.Text>Rating: {product.rating}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button className="custom-button" as={Link} to={`/product/AMZ/Laptop/${product._id}`}>
                  View Details
                </Button>
              </Card.Footer>
            </Card>
          </div>
        ))}
      </div>
      <div className="pagination-container">
        <Pagination>
          <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
          {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, i) => (
            <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(products.length / productsPerPage)} />
        </Pagination>
      </div>
    </div>
  );
};

export default AllProducts;
