import { Router } from "express";
import { deleteUser, getUser, updateUser } from "../controllers/users.controller";


const userPrivateRouter = Router();

userPrivateRouter.get('/:id', async (req, res) => {
    const user = await getUser(req.params.id)
    res.send(user);
})

userPrivateRouter.put('/update', async (req, res) => {
    const userId = req.headers['x-user-id'];
    const { name, email } = req.body;

    const updatedUser = await updateUser(userId as string, { name, email });
    res.json(updatedUser);
});



userPrivateRouter.delete('/delete/', async (req, res) => {
    const userId = req.headers['x-user-id'];

    await deleteUser(userId as string);
        res.json({
        message: "Car was deleted"
    });
})

export default userPrivateRouter;