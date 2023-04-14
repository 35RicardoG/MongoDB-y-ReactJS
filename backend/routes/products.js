const { Router } = require('express');
const router = Router();

const { getProductos, createProductos, getProducto, deleteProducto, updateProducto } = require('../controllers/productsController');

router.route('/')
    .get(getProductos)
    .post(createProductos);

router.route('/:id')
    .get(getProducto)
    .put(updateProducto)
    .delete(deleteProducto);

module.exports = router;