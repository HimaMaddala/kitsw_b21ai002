import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { companyname, category, productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/test/companies/${companyname}/categories/${category}/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [companyname, category, productId]);

  if (!product) {
    return <div className="text-center mt-5"><div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div></div>;
  }

  return (
    <div className="card mt-5 mx-auto" style={{ maxWidth: '600px' }}>
      <p style={{marginLeft:'10px'}}>You are viewing {product.name}</p>
      <img src={product.img_url} className="card-img-top" alt={product.name} style={{ height: '300px', objectFit: 'cover' }} />
      <div className="card-body" style={{lineHeight:'0.9rem'}}>
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text"><strong>Company:</strong> {product.company}</p>
        <p className="card-text"><strong>Category:</strong> {product.category}</p>
        <p className="card-text"><strong>Price:</strong> ${product.price}</p>
        <p className="card-text"><strong>Rating:</strong> {product.rating}</p>
        <p className="card-text"><strong>Discount:</strong> {product.discount}%</p>
        <p className="card-text"><strong>Availability:</strong> {product.availability}</p>
        <p className="card-text">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
