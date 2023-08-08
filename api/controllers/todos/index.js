import prisma from '../../libs/prismadb/index.js';

//GET ALL TODOS
export const getTodos = async (req, res) => {
    try {
        const todos = await prisma.todo.findMany();
        res.status(200).json(todos);
    }catch (err) {
        console.log("[GET TODOS ERROR]", err);
    }
}

// GET A TODO
export const getTodo = async (req, res) => {
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(500).json("ID is required")
        }

        const todo = await prisma.todo.findUnique({
            where: {
                id: id
            }
        })
        res.status(200).json(todo);
    }catch(err) {
        console.log("[GET TODO ERROR]", err);
    }
}

// CREATE A TODO
export const createTodo = async (req, res) =>  {

    try {
        const {description, keyword} = await req.body;

        const todos = await prisma.todo.findMany();

        const no = todos.length + 1;

        const newTodo = await prisma.todo.create({
            data: {
                description,
                keyword,
                no: no.toString()
            }
        })
        res.status(200).json(newTodo)
    }catch (err) {
        console.log("[CREATE TODO ERROR]", err);
    }
}

//DELETE A TODO
export const deleteTodo = async (req, res) =>  {
    try{
        const {ids} = await req.body;
        if(!ids) {
            return res.status(500).json("ID or IDS is required")
        }

        await prisma.todo.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        })
        res.status(200).json("Todo deleted")
    }catch(err) {
        console.log("[DELETE TODO ERROR]", err);
    }
}

//UPDATE A TODO
export const updateTodo = async (req, res) =>  {
    try {
        const {id} = req.params;

        if(!id) {
            return res.status(500).json("ID is required")
        }

        const {description, keyword} = await req.body;

        const updatedTodo = await prisma.todo.update({
            where: {
                id
            },
            data: {
                description,
                keyword
            }
        })
        res.status(200).json(updatedTodo)
    }catch(err) {
        console.log("[UPDATE TODO ERROR]", err);
    }
}

