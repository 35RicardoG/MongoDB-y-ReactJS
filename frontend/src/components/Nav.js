import React from "react";
import { Link } from "react-router-dom";

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrarMenu: false,
        };

        this.intercambiarEstadoMenu = this.intercambiarEstadoMenu.bind(this);
        this.ocultarMenu = this.ocultarMenu.bind(this);
    }

    ocultarMenu() {
        this.setState({
            mostrarMenu: false
        });
    }

    intercambiarEstadoMenu() {
        this.setState(state => {
            return {
                mostrarMenu: !state.mostrarMenu
            }
        });
    }

    render() {
        return (
            <nav className = "navbar is-warning" role = "navigation" aria-label = "main navigation">
                <div className = "navbar-brand">
                    <button onClick = {this.intercambiarEstadoMenu} className = {`navbar-burger ${this.state.mostrarMenu ? "is-active" : ""} is-warning button`} aria-label = "menu" aria-expanded = "false" data-target = "navbarBasicExample">
                        <span aria-hidden = "true"></span>
                        <span aria-hidden = "true"></span>
                        <span aria-hidden = "true"></span>
                    </button>
                </div>
                <div className = {`navbar-menu ${this.state.mostrarMenu ? "is-active" : ""}`}>
                    <div className = "navbar-start">
                        <Link onClick = {this.ocultarMenu} className = "navbar-item" to = "/list"> Lista Productos </Link>
                        <Link onClick = {this.ocultarMenu} className = "navbar-item" to = "/create"> Crear </Link>
                    </div>
                    <div className = "navbar-end">
                        <div className = "navbar-item">
                            <div className = "buttons">
                                <a target = "_blank" rel = "noreferrer" href = "https://openai.com/blog/chatgpt" className = "button is-primary">
                                    <strong> Soporte y Ayuda </strong>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Nav;