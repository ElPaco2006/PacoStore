import { pool } from "../db.js";
import Customer from "../../common/customer.js";

export const customer_get_all = async (req, res) => {
    const response = await pool.query("SELECT * FROM customer ORDER BY customer_id ASC");
    res.status(200).json(response.rows);
};

export const customer_get_by_id = async (req, res) => {
    const customer_id = req.params.id;
    const response = await pool.query("SELECT * FROM customer WHERE customer_id = $1", [customer_id]);
    
    // TODO: Send idk
    if (response.rows.length === 0) {
        res.status(404).send({})
    } 
    
    res.json(response.rows);
};

export const customer_create = async (req, res) => {
    try {
        const customer = new Customer();
        Object.assign(customer, req.body.customer);

        const { rows } = await pool.query(
            "INSERT INTO customer (first_name, last_name, phone_number, rfc) VALUES ($1, $2, $3, $4) RETURNING *",
            [customer.first_name, customer.last_name, customer.phone_number, customer.rfc]
        );
        
        res.status(201).json(rows[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const customer_update = async (req, res) => {
    const customer_id = req.params.id;
    const { first_name, last_name, phone_number, rfc} = req.body;

    const { rows } = await pool.query(
        "UPDATE customer SET first_name = $1, last_name = $2, phone_number = $3, rfc = $4 WHERE customer_id = $5 RETURNING *",
        [first_name, last_name, phone_number, rfc, customer_id]
    );

    return res.json(rows[0]);
};

export const customer_delete = async (req, res) => {
    const customer_id = req.params.id;
    const { rowCount } = await pool.query("DELETE FROM customer where customer_id = $1", [
        customer_id,
    ]);

    if (rowCount === 0) {
        return res.status(404).json({ message: "Customer not found" });
    }

    return res.sendStatus(204);
};