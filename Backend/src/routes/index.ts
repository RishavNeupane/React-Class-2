import { Router } from "express";
import { TodoController } from "../controller/todo.controller";

const app = Router();
app.post("/create", TodoController.createTodo);
export default app;