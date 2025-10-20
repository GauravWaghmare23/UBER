import userModel from "../models/user.model.js";
import blacklistTokenModel from "../models/blacklist.model.js";
import jwt from "jsonwebtoken";

const authUserMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token : token });
    if (isBlacklisted) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decodedToken._id);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = user;
        return next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

export { authUserMiddleware };

