import React from "react";
import Constancia from "../components/Constancia";
import Fila from "../components/Fila";

class ListarProducto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        };
    }

    async componentDidMount() {
        const respuesta = await fetch(`${Constancia.RUTA_API}`);
        const products = await respuesta.json();
        this.setState({
            products: products
        });
    }

    render() {
        return (
            <div>
                <div className = "column" style = {{margin: "auto", display: "flex"}}>
                    <h1 className = "is-size-3"> Productos </h1>
                </div>
                <div className = "table-container">
                    <table className = "table is-fullwidth is-bordered">
                        <thead>
                            <tr>
                                <th> Marca </th>
                                <th> Producto </th>
                                <th> Precio </th>
                                <th> Descripcion </th>
                                <th> Editar </th>
                                <th> Eliminar </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.products.map(products => {
                                return <Fila key = {products._id} products = {products}></Fila>;
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListarProducto;