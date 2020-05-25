import React from 'react';

const Product = ({product, cart, addProduct, products}) => {

    const { id, name, price} = product

    // add products in the cart
    const selectProduct = (id) => {
        const product = products.filter(product => product.id === id);
        addProduct([
            ...cart,
            ...product
        ]);
    }

    // remove products in the cart
    const removeProduct = id => {
        const products = cart.filter(product => product.id !== id);
        
        addProduct(products)
    }

    return (
        <div>
            <p>
                {name}, {price}
            </p>
            
            {
                products
                ?
                (
                    <button 
                        type="button"
                        onClick={() => selectProduct(id)}
                    >Buy</button>
                )
            :
                (
                    <button 
                        type="button"
                        onClick={() => removeProduct(id)}
                    >Remove</button>
                )
            }
        </div>
    )
}

export default Product;