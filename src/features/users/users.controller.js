import CustomError from "../../middlewares/custom-error.middleware.js";
import UserModel from "./users.model.js";
import jwt from 'jsonwebtoken'
export default class UserController {
    loginUser(req, res) {
        try {
            if (!req.body) {
                return res.status(404).send("Body parameter are not present!");
            }
            const { email, password } = req.body;
            const result = UserModel.login(email, password);
            if (result.success) {
                const payload = {
                    "id": result.user.id,
                    "name": result.user.name,
                    "email": result.user.email
                }
                const token = jwt.sign(payload, "hq7PRRLuxnarLQS2sQ0aDKDITaSlPV5e", {
                    expiresIn: 1 * 24 * 60 * 60 * 1000
                });
                return res.status(200).send({ "success": true, "message": "user validated!", "token": token });
            } else {
                return res.status(404).send(result);
            }
        } catch (error) {
            throw new CustomError("There is some issue in login will fix it please try later", 400);
        }
    }

    registerUser(req, res) {
        try {
            if (!req.body) {
                return res.status(404).send("Body parameter are not present!");
            }
            const { name, email, password } = req.body;
            const result = UserModel.register(name, email, password);
            if (result.success) {
                return res.status(201).send(result);
            }
            return res.status(404).send(result);
        } catch (error) {
            throw new CustomError("There is some issue in registration will fix it please try later", 400)
        }
    }
}