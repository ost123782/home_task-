import { Router } from "express";
import { createUser, loginUser, getUser, getUsers, updateUser } from "../controllers/users.controller";


const userPublicRouter = Router();


userPublicRouter.get('/', async (req, res) => {
    const users = await getUsers();
    res.json(users);
})

userPublicRouter.get('/:id', async (req, res) => {
    const user = await getUser(req.params.id)
    res.send(user);
})

userPublicRouter.post('/create', async (req, res) => {
    const {name, email, password} = req.body;

    const user = await createUser(name, email, password);

    res.json(user);
})

userPublicRouter.post('/login', async (req, res) => {
    const {email, password} = req.body;

    const user = await loginUser(email, password);

    res.json(user);
})

export default userPublicRouter;