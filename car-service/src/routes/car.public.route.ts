import { Router } from "express";
import { getCar, getCars } from "../controllers/car.controller";


const carPublicRouter = Router();


carPublicRouter.get('/', async (req, res) => {
    const cars = await getCars();
    res.json(cars);
})

carPublicRouter.get('/:id', async (req, res) => {
    const car = await getCar(req.params.id)
    res.send(car);
})

export default carPublicRouter;