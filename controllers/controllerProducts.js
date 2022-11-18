import Container from '../controllers/container.js';

const products = new Container('./data/products.json');

//Obtener productos
const getProducts = (req, res) => {
	if (req.params.id == undefined) return res.send(products.getAll());
	const id = Number(req.params.id);
	const product = products.getById(id);
	if (!product) return res.status(404).send({ message: 'El ID no pertenece a un producto listado' });
	res.json(product);
}

//Agregar producto
const addProduct = (req, res) => {
	const { name, description, code, pic, price, stock } = req.body;
	products.save({ name, description, code, pic, price, stock });
	res.json({ message: 'Producto agregado' });
}

//Borrar producto
const deleteProduct = (req, res) => {
	const id = Number(req.params.id);
	if (isNaN(id)) return res.status(400).send({ message: 'Ingresa ID ' });
	const productDeleted = products.deleteById(id);
	if (productDeleted === -1) return res.status(404).json({ message: 'ID no encontrado' });
	res.json({ message: 'Producto eliminado' });
};

export { products, getProducts, addProduct, deleteProduct };