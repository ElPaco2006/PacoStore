import express from "express";
import morgan from "morgan";
import usersRoutes from "./routes/store.routes.js";
import { PORT } from "./config.js";

const app = express();

app.use(morgan("dev"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(usersRoutes);

app.listen(PORT);
console.log("Server on port", PORT);