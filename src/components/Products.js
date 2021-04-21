import React, { Fragment, useEffect } from 'react';
import Product from "./Product";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getProductAction } from "../actions/getProductAction";

const Products = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Consult database
    const getProducts = () => dispatch(getProductAction());
    getProducts();
    // eslint-disable-next-line
  }, []);

  // Get state
  const products = useSelector((state) => state.products.products);
  const error = useSelector((state) => state.products.error);
  const loading = useSelector((state) => state.products.loading);

  return (
    <Fragment>
      <h2 className="text-center my-5">Products List</h2>

      { error && <p className="font-weight-bold alert alert-danger text-center">There are an error</p> }
      { loading && <p className="text-center">Loading...</p> }
      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          { products.length === 0 ? 'No products' : (
            products.map(product => (
              <Product key={product.id} product={product}/>
            ))
          )}
        </tbody>
      </table>
    </Fragment>
  );
}

export default Products;