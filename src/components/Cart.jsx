import React from 'react';
import "../App.css";
import Product from "./Product"; 

const Cart = ({cart, addProduct}) => {
    return (
        <div className="cart">
            <h2>Your cart</h2>
            {cart.length === 0
            ?
                <p>No elements</p>
            :cart.map(product => (
                <Product 
                    key={product.id}
                    product={product}
                    cart={cart}
                    addProduct={addProduct}
                />
            ))}
        </div>
    )
}

export default Cart;