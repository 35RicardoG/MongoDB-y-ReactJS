const mongoose = require("mongoose");

const ProductoEsquema = new mongoose.Schema({
    marca: {
        type: String,
        required: true,
    },
    producto: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Producto", ProductoEsquema);