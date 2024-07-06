class ProductDTO {
    constructor({ id, name, price, category, description, stock }) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.description = description;
        this.stock = stock;
    }
}

export default ProductDTO;
