import { Router } from "express";
import { createCar, deleteCar, getCar, getCars, updateCar } from "../controllers/car.controller";


const carRouter = Router();


carRouter.get('/', async (req, res) => {
    const cars = await getCars();
    res.json(cars);
})

carRouter.get('/:id', async (req, res) => {
    const car = await getCar(req.params.id)
    res.send(car);
})

carRouter.post('/create', async (req, res) => {
    const {user_id} = req.body;

    const car = await createCar(user_id);

    res.json(car);
})

carRouter.put('/update/:id', async (req, res) => {
    const {make, model} = req.body;
    const updatedCar = await updateCar(req.params.id, {make, model});
    res.json(updatedCar);
})


carRouter.delete('/delete:id', async (req, res) => {
    await deleteCar(req.params.id);
    res.send("Car was deleted");
})

export default carRouter;