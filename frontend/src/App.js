import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Constancia from './components/Constancia';
import ListarProducto from './components/ListarProducto';
import CrearProducto from './components/CrearProductos';
import EditarProducto from './components/EditarProducto';
import Nav from './components/Nav';

import { Route, Routes } from 'react-router-dom';

function App() {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    fetch(`${Constancia.RUTA_API}`) 
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setProducts(data);
    })
    .catch((err) => {
      console.log(err.message);
    }); //URL de listado de productos
  }, []);

  return (
    <div className = "App">
      <div>
        <Nav></Nav>
        <div className = 'section'>
          <h1> Cantidad de productos: {products.length} </h1>
          <div className = 'columns'> 
            <Routes>
              <Route index element = {<ListarProducto/>}/>
              <Route path = '/create' element = {<CrearProducto/>}/>
              <Route path = '/list' element = {<ListarProducto/>}/>
              <Route path = '/edit/:id' element = {<EditarProducto/>}/>
              <Route path = '*' element = {<p> Ruta no encontrada </p>}/>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
