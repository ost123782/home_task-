import { Router } from "express";
import { deleteUser, getUser, updateUser } from "../controllers/users.controller";


const userPrivateRouter = Router();

userPrivateRouter.get('/:id', async (req, res) => {
    const user = await getUser(req.params.id)
    res.send(user);
})

userPrivateRouter.put('/update/:id', async (req, res) => {
    const {name, email} = req.body;
    const updatedUser = await updateUser(req.params.id, {name, email});
    res.json(updatedUser);
})


userPrivateRouter.delete('/delete/:id', async (req, res) => {
    await deleteUser(req.params.id);
    res.send("User was deleted");
})

export default userPrivateRouter;