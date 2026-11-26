import {pool} from "../db.js";
import {Product} from "../../common/models.js";

export const product_get_all = async (req, res) => {
    const response = await pool.query("SELECT * FROM product");

    const products = response.rows.map((row) => new Product(row.product_id, row.sku, row.name, row.supplier_id, row.price));
    res.status(200).send({
        products: products,
    });
};

export const product_get_by_sku = async (req, res) => {
    const sku = req.params.id;
    if (sku === undefined) {
        return res.status(400).json({})
    }

    const response = await pool.query("SELECT * FROM product WHERE sku = $1", [sku]);

    // TODO: Send idk
    if (response.rows.length === 0) {
        res.status(404);
    }

    let product = new Product()
    Object.assign(product, response.rows[0]);

    res.json({
        product: product,
    });
};

export const product_create = async (req, res) => {
    throw Error('No implemented');
};

export const product_update = async (req, res) => {
    throw Error('No implemented');
};

export const product_delete = async (req, res) => {
    throw Error('No implemented');
};