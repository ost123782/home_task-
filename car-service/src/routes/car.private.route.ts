import { Router } from "express";
import { createCar, deleteCar, getCar, getCars, updateCar } from "../controllers/car.controller";


const carPrivateRouter = Router();


carPrivateRouter.post('/create', async (req, res) => {
    const carData = req.body;

    const createdCar = createCar(carData);

    res.json(createdCar);
})

carPrivateRouter.get('/:id', async (req, res) => {
    const car = await getCar(req.params.id)
    res.send(car);
})

carPrivateRouter.put('/update/:id', async (req, res) => {
    const {make, model} = req.body;
    const updatedCar = await updateCar(req.params.id, {make, model});
    res.json(updatedCar);
})


carPrivateRouter.delete('/delete:id', async (req, res) => {
    await deleteCar(req.params.id);
    res.send("Car was deleted");
})

export default carPrivateRouter;