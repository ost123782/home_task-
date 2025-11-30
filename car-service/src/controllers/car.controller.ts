import { ICar } from "../common/interfaces/car.interface";
import { createCarInDb, createEmptyCarInDb, deleteAllCarsByUserIdInDb, deleteCarInDb, findCar, findCars, updateCarInDb } from "../repositories/car.repository";

export async function createEmptyCar(userId: string) {

    const car = createEmptyCarInDb(userId);

    return car;
}

export async function createCar(car: ICar) {

    const createdCar = createCarInDb(car);

    return createdCar;
}

export async function getCars() {
    return await findCars();
}

export async function getCar(id: string) {
    return await findCar(id);
}

export async function updateCar(id: string, carData: Partial<ICar>) {
    const updatedCar = await updateCarInDb(id, carData);

    return updatedCar;
}

export function deleteCar(id: string) {
    return deleteCarInDb(id);
}

export function deleteAllCarsByUserId(user_id: string) {
    return deleteAllCarsByUserIdInDb(user_id);
}