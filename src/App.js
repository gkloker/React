import React, { Fragment, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Product from "./components/Product";
import Cart from "./components/Cart";

function App() {
  //crear listado de productos

  const [products, setProducts] = useState([
    { id: 1, name: "Camisa", price: 150 },
    { id: 2, name: "Remera", price: 50 },
    { id: 3, name: "Jean", price: 270 },
  ]);

  const [cart, addProduct] = useState([]);

  return (
    <Fragment>
      <Header />

      <h1>Products List</h1>
      {products.map((product) => (
        <Product
          key={product.id}
          product={product}
          products={products}
          cart={cart}
          addProduct={addProduct}
        />
      ))}
      <Cart cart={cart} addProduct={addProduct} />
    </Fragment>
  );
}

export default App;
