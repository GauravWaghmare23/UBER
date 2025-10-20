import captainModel from "../models/captain.model.js";

const createCaptain = async ({firstName,lastName,email,password,color,plate,capacity,vehicleType})=>{
    
    if (!firstName || !password || !email || !color || !plate || !capacity || !vehicleType) {
        throw new error("All fields are required");
    }

    const captain = await captainModel.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    });

    return captain;

}

export { createCaptain };