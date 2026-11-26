import express, {Router} from "express";
import morgan from "morgan";
import {API_PREFIX, PORT} from "./config.js";
import customer_routes from "./routes/customer.routes.js";

const app = express();

app.use(morgan("dev"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(API_PREFIX, customer_routes);

const router = Router();
router.get(API_PREFIX, (req, res) => {
    res.json({message: "Hello, Frontend!"})
});

app.use(router);

app.listen(PORT);
console.log("Server on port", PORT);