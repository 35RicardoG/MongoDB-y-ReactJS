import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; //Instalar npm i react-toastify
import Swal from "sweetalert2"; //Instalar npm i sweetalert2
import Constancia from "../components/Constancia";

class Fila extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //Si se ha eliminado este producto, no necesitamos mostrarlo
            eliminado: false,
        };
         //Instalar npm i bind
        this.eliminar = this.eliminar.bind(this);
    };

    async eliminar() {
        const resultado = await Swal.fire({
            title: 'Confirmación',
            text: `¿Eliminar "${this.props.products.marca}"?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3298dc',
            cancelButtonColor: '#f14668',
            cancelButtonText: 'No',
            confirmButtonText: 'Si, eliminar'
        });
        //Si no confirma, detenemos la función
        if (!resultado.value) {
            return;
        }

        const respuesta = await fetch(`${Constancia.RUTA_API}/${this.props.products._id}`, {
            method: "DELETE",
        });
        
        console.log(respuesta);

        const exitoso = await respuesta.json();

        if (exitoso) {
            toast('Producto eliminado ', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
            this.setState({
                eliminado: true
            });
        } else {
            toast.error("Error al eliminar. Intenta de nuevo");
        }
    };

    render() {
        if (this.state.eliminado) {
            return null;
        }

        return (
            <tr>
                <td>{this.props.products.marca}</td>
                <td>{this.props.products.producto}</td>
                <td>{this.props.products.precio}</td>
                <td>{this.props.products.descripcion}</td>
                <td>
                    <Link to = {`/edit/${this.props.products._id}`} className = "button is-info"> Editar </Link>
                </td>
                <td>
                    <button onClick = {this.eliminar} className = "button is-danger"> Eliminar </button>
                </td>
            </tr>
            /*
            <div className="row">
                <div className = "col-md-7 p-2">
                    <div className = "card" style={{width: "18cm"}}>
                        <div className = "card-header">
                            <h5> {this.props.products.marca} </h5>
                        </div>
                        <div className = "card-body">
                            <p> {this.props.products.producto} </p>
                            <p> {this.props.products.precio} </p>
                            <p> {this.props.products.descripcion} </p>
                        </div>
                        <div className = "card-footer">
                            <button onClick = {this.eliminar} className = "button is-danger"> Eliminar </button>
                        </div>
                    </div>
                </div>
            </div>
            */
        );
    }
};

export default Fila;
