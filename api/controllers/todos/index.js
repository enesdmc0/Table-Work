import prisma from '../../libs/prismadb/index.js';

//GET ALL TODOS
export const getTodos = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const itemsPerPage = parseInt(req.query.limit) || 5;

        const totalDatas = await prisma.todo.count();
        const totalPages = Math.ceil(totalDatas / itemsPerPage);

        const todos = await prisma.todo.findMany({
            skip: (page - 1) * itemsPerPage ,
            take: itemsPerPage,
        });

        res.status(200).json({ todos, totalPages, totalDatas });
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

        const highestNoTodo = await prisma.todo.findFirst({
            orderBy: {
                no: 'desc'
            }
        });
        let no = 1;

        if (highestNoTodo) {
            no = highestNoTodo.no + 1;
        }

        const newTodo = await prisma.todo.create({
            data: {
                description,
                keyword,
                no
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
        const {id} = await req.params;
        if(!id) {
            return res.status(500).json("ID is required")
        }

        await prisma.todo.delete({
            where: {
                id
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

        const {description, keyword, selected} = await req.body;


        const updatedTodo = await prisma.todo.update({
            where: {
                id
            },
            data: {
                description,
                keyword,
                selected: !selected
            }
        })
        res.status(200).json(updatedTodo)
    }catch(err) {
        console.log("[UPDATE TODO ERROR]", err);
    }
}

