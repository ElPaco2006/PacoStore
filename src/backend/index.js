import express, {Router} from "express";
import morgan from "morgan";
import usersRoutes from "./routes/store.routes.js";
import { PORT } from "./config.js";

const app = express();

app.use(morgan("dev"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(usersRoutes);

const router = Router();
router.get("/", (req, res) => {
    res.json({message: "Hello, Frontend!"})
});

app.use(router);

app.listen(PORT);
console.log("Server on port", PORT);