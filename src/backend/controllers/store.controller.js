import { pool } from "../db.js";
// NOTE: BROKEN AF, is unrelated code
export const getStores = async (req, res) => {
    //const response = await pool.query("SELECT * FROM Stores ORDER BY id ASC");
    //res.send("Hello, Frontend");
    res.json({message: "Hello, Frontend!"})
    //res.status(200).json(response.rows);
};

export const getStoreById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query("SELECT * FROM Stores WHERE id = $1", [id]);
    res.json(response.rows);
};

export const createStore = async (req, res) => {
    try {
        const { name, email } = req.body;

        const { rows } = await pool.query(
            "INSERT INTO Stores (name, email) VALUES ($1, $2) RETURNING *",
            [name, email]
        );

        res.status(201).json(rows[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateStore = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    const { rows } = await pool.query(
        "UPDATE Stores SET name = $1, email = $2 WHERE id = $3 RETURNING *",
        [name, email, id]
    );

    return res.json(rows[0]);
};

export const deleteStore = async (req, res) => {
    const id = parseInt(req.params.id);
    const { rowCount } = await pool.query("DELETE FROM Stores where id = $1", [
        id,
    ]);

    if (rowCount === 0) {
        return res.status(404).json({ message: "Store not found" });
    }

    return res.sendStatus(204);
};