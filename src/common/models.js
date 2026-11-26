
export class Customer {
    constructor (customer_id, first_name, last_name, phone_number, rfc) {
        this.customer_id = customer_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone_number = phone_number;
        this.rfc = rfc;
    }
}

export class Product {
    constructor(product_id, sku, name, supplier_id, price) {
        this.product_id = product_id;
        this.sku = sku;
        this.name = name;
        this.supplier_id = supplier_id;
        this.price = Number(price);
    }
}

export class Supplier {
    constructor(supplier_id, name, phone_number, email) {
        this.supplier_id = supplier_id;
        this.name = name;
        this.phone_number = phone_number;
        this.email = email;
    }
}