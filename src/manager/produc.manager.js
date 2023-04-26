import fs from 'fs';

 export default class ProductManager{
  constructor(path){
    this.path = path;
  }  

  async #getMaxId(){
let maxId = 0;
const products = await this.getALLProducts();
products.map((prod) => {
  if (prod.id > maxId) maxId = prod.id;
});
return maxId;
  }

  async getALLProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, 'utf8');
        const productsJS = JSON.parse(products);
        return productsJS;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }


async getProductByid(id){
  try {
    const products = await this.getALLProducts();
    const product  = products.find((prod) => prod.id === id);
    if(product) {
      return product
    }
    return false;
  } catch (error) {
    console.log(error);
  }
}


async createProduct(obj){
  try {
    const product = {
      id: await this.#getMaxId() + 1,
      ...obj
    };
    const productsFile = await this.getALLProducts();
    productsFile.push(product);
    await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
    return product;
  } catch (error) {
    console.log(error);
  }
}


}