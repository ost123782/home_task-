import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/users.controller";


const userRouter = Router();


userRouter.get('/', async (req, res) => {
    const users = await getUsers();
    res.json(users);
})

userRouter.get('/:id', async (req, res) => {
    const user = await getUser(req.params.id)
    res.send(user);
})

userRouter.post('/create', async (req, res) => {
    const {name, email, password} = req.body;

    const user = await createUser(name, email, password);

    res.json(user);
})

userRouter.put('/update/:id', async (req, res) => {
    const {name, email} = req.body;
    const updatedUser = await updateUser(req.params.id, {name, email});
    res.json(updatedUser);
})


userRouter.delete('/delete:id', async (req, res) => {
    await deleteUser(req.params.id);
    res.send("User was deleted");
})

export default userRouter;