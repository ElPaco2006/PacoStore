import pg from "pg";
import {
    DB_DATABASE,
    DB_HOST,
    DB_PASSWORD,
    DB_PORT,
    DB_USER,
} from "./config.js";

export const pool = new pg.Pool({
    user: 'paco',
    host: 'database',
    password: 'elpapu31',
    database: 'paco-store',
    port: 5432,
});

pool.query("SELECT NOW()").then((result) => {
    console.log(result);
});