import {Router} from 'express';
import {getTodos, getTodo, createTodo, deleteTodo, updateTodo} from "../../controllers/todos/index.js";

const router = Router();

// GET ALL TODOS
router.get("/", getTodos);
// GET A TODO
router.get("/:id", getTodo);
// CREATE A TODO
router.post("/", createTodo);
// DELETE A TODO
router.delete("/:id", deleteTodo);
// UPDATE A TODO
router.put("/:id", updateTodo);

export default router;