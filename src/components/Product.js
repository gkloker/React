import React from 'react';
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

// Redux
import { useDispatch } from "react-redux";
import { deleteProductAction } from "../actions/deleteProductAction";
import { getEditProductAction } from "../actions/editProductAction";

const Product = ({product}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  // Confirm delete product
  const confirmDeleteProduct = (id) => {
    // Ask user
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Action
        dispatch(deleteProductAction(id));
      }
    })
  }

  // Method to redirect edit
  const redirectEdition = (product) => {
    dispatch(getEditProductAction(product));

    history.push(`/products/edit/${product.id}`);
  }

  return (
    <tr>
      <td>{product.name}</td>
      <td><span className="font-weight-bold">$ {product.price}</span></td>
      <td className="acciones">
        <button
          type="button"
          className="btn btn-primary mr-2"
          onClick={() => redirectEdition(product)}
        >Edit</button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmDeleteProduct(product.id)}
        >Delete</button>
      </td>
    </tr>
  );
}

export default Product;