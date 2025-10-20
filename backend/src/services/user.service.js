import userModel from "../models/user.model.js";

const createUser = async ({ firstName, lastName, email, password }) => {

    if (!firstName || !password || !email) {
        throw new Error("All required fields");
    }

    const user = await userModel.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password
    });
    return user;
}

export { createUser };
