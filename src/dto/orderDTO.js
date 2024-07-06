class OrderDTO {
    constructor({ id, userId, products, total, status, createdAt, updatedAt }) {
        this.id = id;
        this.userId = userId;
        this.products = products;
        this.total = total;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export default OrderDTO;
