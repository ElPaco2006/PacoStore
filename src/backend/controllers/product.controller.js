import { pool } from "../db.js";

export const product_get_all = async (req, res) => {
    throw Error('No implemented');
};

export const product_get_by_sku = async (req, res) => {
    const sku = req.params.id;
    if (sku === undefined) {
        return res.status(400).json({})
    } 
    
    const response = await pool.query("SELECT * FROM product WHERE sku = $1", [sku]);
    
    // TODO: Send idk
    if (response.rows.length === 0) {
        res.sentStatus(404);
    } 
    
    res.json(response.rows);
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