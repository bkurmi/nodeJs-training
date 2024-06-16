module.exports = class Product {
  constructor(id, productName, description) {
    this.id = id;
    this.productName = productName;
    this.description = description;
  }

  save(){
    console.log("Assume that product has been saved");
  }

  static findById(id){
        console.log("Assume that findById is working fine for given id = "+id);
  }

  static deleteById(id){
    console.log("Assume that deleteById is working fine for given id = " + id);
  }

  static updateById(id, product){
    console.log("Assume that deleteById is working fine for given id = " + id);
  }
};
