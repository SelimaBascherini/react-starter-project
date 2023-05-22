import React from 'react';
import { useState, useEffect } from 'react';
import './App.css'


function App() {
  const [object, setObject] = useState([]); // Array degli oggetti nella home
  const [cartItems, setCartItems] = useState([]); // Array degli oggetti nel carrello

  const addToCart = (item) => { //definita la funzione addToCart(item), che aggiunge l'oggetto passato come parametro all'array cartItems utilizzando la funzione setCartItems().
    setCartItems([...cartItems, item]); // Aggiungi l'item all'array cartItems con copia dell'array
  };

  const Cart = () => {  // renderizzo un elemento <div> contenente il titolo "Carrello"
    return (
      <div>
        <h2>Carrello</h2>
        {cartItems.map((item, index) => ( // e tramite map renderizzo un elemento <div> per ogni oggetto presente nell'array cartItems
          <div key={index}>{item.title}</div>
        ))}
      </div>
    );
  };

  useEffect(() => { // faccio funzione asincrona per ottenere dati dei prodotti
    async function productsCall() {
      let res = await fetch('https://dummyjson.com/products');  // chiamata alla API utilizzando fetch()
      let json = await res.json(); // converto risposta in formato JSON con res.json(),
      setObject(json.products.splice(0, 15)); // faccio l'array dei prodotti (i primi 15) all'array object tramite setObject().
    }
    productsCall();
  }, []);

  return (
    <div className="Home">
      <div className="Shop">
        <header>
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon Logo" />
          <input></input>
          <button>Cerca</button>
        </header>
        <div className="products">
          {object.map((product) => (
            <Products
              key={product.id}
              title={product.title}
              price={product.price}
              thumbnail={product.images[0]}
              addToCart={() => addToCart(product)}
            />
          ))}
        </div>
      </div> 
      <Cart /> 
    </div>
  );// renderizzo il componente Cart() che visualizza il contenuto del carrello.
}

function Products({ title, price, thumbnail, addToCart }) { //riceve le prop corrispondenti al componente App()
  return (
    <div className="Phone">
      <h3>{title}</h3>
      <div className="phone-container">
        <img className="phone-img" src={thumbnail} alt="Product Thumbnail" />
      </div>
      <div>
        <span>{price}</span>
        <button onClick={addToCart}>Aggiungi</button>
      </div>
    </div>
  );
}














export default App;