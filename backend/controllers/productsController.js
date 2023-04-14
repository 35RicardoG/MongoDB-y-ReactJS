const ProductoEsquema = require('../models/producto');
const productCtrl = {};

productCtrl.getProductos = async (req, res) => {
	const products = await ProductoEsquema.find();
	res.json(products);
};

productCtrl.createProductos = async (req, res) => {
	const { marca, producto, precio, descripcion } = req.body;
	const newProduct = new ProductoEsquema({
		marca: marca, 
		producto: producto, 
		precio: precio, 
		descripcion: descripcion
	});
	await newProduct.save();
	res.json({message: 'Producto guardado'});
};

productCtrl.getProducto = async (req, res) => {
	const product = await ProductoEsquema.findById(req.params.id);

	if (!product) {
		return res.status(400).json({message: 'Producto no encontrado'})
	}

	res.json(product);
};

productCtrl.deleteProducto = async (req, res) => {
	const deletedProduct = await ProductoEsquema.findByIdAndDelete(req.params.id);

	if(!deletedProduct) {
		return res.status(400).json({message: 'Producto no encontrado'})
	}

	res.json({message: 'Producto eliminado'});
};

productCtrl.updateProducto = async (req, res, next) => {
	const { marca, producto, precio, descripcion } = req.body;
	await ProductoEsquema.findByIdAndUpdate(req.params.id, {
		marca: marca, 
		producto: producto, 
		precio: precio, 
		descripcion: descripcion
	});

	res.json({message: 'Producto actualizado'});
};

module.exports = productCtrl;