import { ICar } from "../common/interfaces/car.interface";
import carModel from "../models/car.model";

export function findCars() {
    return carModel.find({});
}

export function findCar(id: string) {
    return carModel.findById(id);
}

export function updateCarInDb(carId: string, carData: Partial<ICar>) {
    return carModel.updateOne(
        { _id: carId },
        { $set: carData }
    );
}

export function deleteCarInDb(carId: string) {
    return carModel.deleteOne({
        _id: carId
    })  
}


export function createCarInDb(userId: string) {
    return carModel.create({
        user_id: userId,
        make: "Unknown", 
        model: "Unknown",  
        year: null, 
    });
}

