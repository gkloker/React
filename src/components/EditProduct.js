import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { editProductAction } from "../actions/editProductAction";
import { useHistory } from "react-router-dom";

const EditProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [product, setProduct] = useState({
    name: '',
    price: ''
  });

  // Edit product
  const productEdit = useSelector(state => state.products.productEdit);

  // Load state automatic
  useEffect(() => {
    setProduct(productEdit)
  }, [productEdit])

  // Read data from form
  const onChangeForm = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    })
  }

  const submitEditProduct = (e) => {
    e.preventDefault();

    dispatch(editProductAction(product));

    history.push("/");
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Edit Product
            </h2>

            <form
              onSubmit={submitEditProduct}
            >
              <div className="form-group">
                <label>Name Product</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name Product"
                  name="name"
                  value={product.name}
                  onChange={onChangeForm}
                />
              </div>

              <div className="form-group">
                <label>Price Product</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price Product"
                  name="price"
                  value={product.price}
                  onChange={onChangeForm}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;