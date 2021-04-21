import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//actions from redux
import { createNewProductAction } from '../actions/newProductActions';
import { showAlertAction, hideAlertAction } from '../actions/alertActions';

const NewProduct = ({history}) => {

  // state from component
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);

  // use useDispatch and create a function
  const dispatch = useDispatch();

  // Access to state from store
  const reload = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const alert = useSelector(state => state.alert.alert);

  // call the action from prooductAction
  const addProduct = (product) => dispatch(createNewProductAction(product));

  // When user do submit
  const submitNewProduct = (e) => {
    e.preventDefault();

    // Validate form
    if (name.trim === '' || price <= 0) {

      const alert = {
        msg: 'Both fields are required',
        classes: 'alert alert-danger text-center text-uppercase p3'
      }

      dispatch(showAlertAction(alert));

      return;
    }

    // If there are not errors
    dispatch(hideAlertAction());

    // create a new product
    addProduct({
      name,
      price
    });

    // Redirect
    history.push('/');
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Add New Product
            </h2>

            { alert && <p className={alert.classes}>{alert.msg}</p> }

            <form
              onSubmit={submitNewProduct}
            >
              <div className="form-group">
                <label>Name Product</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name Product"
                  name="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Price Product</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price Product"
                  name="price"
                  value={price}
                  onChange={e => setPrice(Number(e.target.value))}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >Add</button>
            </form>

            { reload && <p>Reload...</p> }
            { error && <p className="alert alert-danger p2 mt-4 text-center">There are an error</p> }
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewProduct;