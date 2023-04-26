import express from 'express';
import ProductManager from './manager/produc.manager.js';

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const productManager = new ProductManager('./products.json');

app.get('/products', async(req, res) =>{
   try {
      const products = await productManager.getALLProducts()
      res.status(200).json(products);
   } catch (error) {
    res.status(404).json({ message: error.message});
    console.log(error);
   } 
})


app.get('/products/:id', async(req, res) =>{
    try {
        const {  id } = req.params;
       const product = await productManager.getProductByid(Number(id));
       if(product){
        res.status(200).json({message: 'Product found', product });
       }else {
        res.status(400).send('product not found')
       }
    } catch (error) {
     res.status(484).json({ message: error.message});
    } 
 })


 app.post('/products', async (req, res) =>{
    try {
        console.log(req.body);
        const product = req.body;
       const newProduct = await productManager.createProduct(product);
       res.json(newProduct);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
 })




const PORT = 9049;

app.listen(PORT , ()=>{
    console.log('Server ok en puerto: ${PORT}');
});