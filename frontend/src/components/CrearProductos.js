import React from "react";
import Constancia from "./Constancia";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class CrearProducto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: {
                "marca": "",
                "producto": "",
                "precio": "",
                "descripcion": ""
            },
        };

        //Indicarle a las funciones a que nos referimos con "this".
        this.manejarCambio = this.manejarCambio.bind(this);
        this.manejarEnvioFormulario = this.manejarEnvioFormulario.bind(this);
    }

    render() {
        return (
            <div className = "column is-one-third">
                <h1 className = "is-size-3"> Crear </h1>
                <form className = "field" onSubmit = {this.manejarEnvioFormulario}>
                    <div className = "form-group">
                        <label className = "label" htmlFor = "marca"> Marca </label>
                        <input autoFocus required placeholder = "Nombre de la marca" type = "text" id = "marca" onChange = {this.manejarCambio} value = {this.state.products.marca} className = "input"></input>
                    </div>
                    <div className = "form-group">
                        <label className = "label" htmlFor = "producto"> Producto </label>
                        <input required placeholder = "Producto" type = "text" id = "producto" onChange = {this.manejarCambio} value = {this.state.products.producto} className = "input"></input>
                    </div>
                    <div className = "form-group">
                        <label className = "label" htmlFor = "precio"> Precio </label>
                        <input autoFocus required placeholder = "Precio" type = "number" id = "precio" onChange = {this.manejarCambio} value = {this.state.products.precio} className = "input"></input>
                    </div>
                    <div className = "form-group">
                        <label className = "label" htmlFor = "descripcion"> Descripcion </label>
                        <input required placeholder = "Descripcion" type = "text" id = "descripcion" onChange = {this.manejarCambio} value = {this.state.products.descripcion} className = "input"></input>
                    </div>
                    <div className = "form-group">
                        <button className = "button is-success mt-2"> Guardar </button>
                        &nbsp;
                        <Link to = {"/list"} className = "button is-primary mt-2"> Volver </Link>
                    </div>
                </form>
            </div>
        )
    }

    async manejarEnvioFormulario(evento) {
        evento.preventDefault();
        //Codificar nuestro producto como JSON

        const cargaUtil = JSON.stringify(this.state.products);
        const respuesta = await fetch(`${Constancia.RUTA_API}`, {
            method: "POST",
            body: cargaUtil,
            headers: {
                "Content-Type": "application/json",
            }
        });

        console.log(respuesta);

        const exitoso = await respuesta.json();

        if (exitoso) {
            toast('Producto guardado', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });

            this.setState({
                products: {
                    "marca": "",
                    "producto": "",
                    "precio": "",
                    "descripcion": ""
                }
            });
        } else {
            toast.error("Error al guardar. Intenta de nuevo");
        }
    }

    async manejarCambio(evento) {
        //Extraer la clave del estado que se va a actualizar, asi como el valor
        const clave = evento.target.id;
        let valor = evento.target.value;
        this.setState(state => {
            const updateProducto = state.products;
            if (clave !== "marca" && clave !== "producto" && clave !== "descripcion") {
                valor = parseFloat(valor);
            }

            updateProducto[clave] = valor;

            return {
                products: updateProducto
            }
        });
    }
}

export default CrearProducto; 