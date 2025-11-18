import { ICar } from "../common/interfaces/car.interface";
import { createCarInDb, deleteCarInDb, findCar, findCars, updateCarInDb } from "../repositories/car.repository";

export async function createCar(userId: string) {

    const car = createCarInDb(userId);

    return car;
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
