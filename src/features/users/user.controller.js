import CustomError from "../../middlewares/custom-error.middleware.js";
import jwt from 'jsonwebtoken'
import UserRepository from "./user.repository.js";
import { comparePassword, hashPassword } from "../../utility/password.handler.js";
import '../../config/env.config.js'

export default class UserController {
    constructor() {
        this.userRepository = new UserRepository();
    }
    async loginUser(req, res, next) {
        try {
            const { email, password } = req.body;
            const response = await this.userRepository.findbyEmail(email);
            if (!response) {
                return res.status(404).send({ "success": false, "msg": "User not found" })
            } else {
                const isValidPassword = await comparePassword(password, response.password);
                if (!isValidPassword) {
                    return res.status(400).send({ "success": false, "msg": "Invalid password" });
                }
                const payload = {
                    "id": response._id,
                    "name": response.name,
                    "email": response.email
                }
                const token = jwt.sign(payload, process.env.JWT_TOKEN, {
                    expiresIn: '1h'
                });
                await this.userRepository.storeToken(response._id, token);
                return res.status(200).send({ "success": true, "msg": "User logged in successfully", "token": token });
            }
        } catch (error) {
            if (error instanceof CustomError) {
                next(error);
            } else {
                throw new CustomError("There's a problem with login. We'll fix it. Please try again later.", 400, error);
            }

        }
    }

    async registerUser(req, res, next) {
        try {
            const { name, email, mobile, gender, password } = req.body;
            const response = await this.userRepository.findbyEmail(email);
            if (response != null) {
                return res.status(400).send({ "success": false, "msg": "User with email is already present" })
            }
            const encryptedPassword = await hashPassword(password);
            const userData = { "name": name, "email": email, "mobile": mobile, "gender": gender, "password": encryptedPassword };
            const result = await this.userRepository.register(userData);
            return res.status(201).json(result);
        } catch (error) {
            if (error instanceof CustomError) {
                next(error);
            } else {
                throw new CustomError("There's a problem with registration. We'll fix it. Please try again later.", 400, error);
            }
        }
    }

    async getDetails(req, res, next) {
        let userId = req.params.userId;
        try {
            const userDetails = await this.userRepository.userDetails(userId);
            if (userDetails.success) {
                return res.status(200).json(userDetails)
            } else {
                return res.status(404).json(userDetails);
            }
        } catch (error) {
            if (error instanceof CustomError) {
                next(error);
            } else {
                throw new CustomError("There's an issue retrieving details. We're working on it. Please try again later.", 400, error);
            }
        }
    }

    async usersDetails(req, res, next) {
        try {
            const details = await this.userRepository.getAllUserDetails();
            return res.status(200).json(details);
        } catch (error) {
            if (error instanceof CustomError) {
                next(error);
            } else {
                throw new CustomError("There's an issue retrieving users details. We're working on it. Please try again later.", 400, error);
            }
        }
    }

    async updateDetails(req, res, next) {
        try {
            let userId = req.params.userId;
            if (req.id != userId) {
                return res.status(400).json({ "success": false, "msg": "Not authorize to update others users details" });
            }
            const { name, email, mobile, gender } = req.body;
            const userDetails = { "name": name, "email": email, "mobile": mobile, "gender": gender }
            const result = await this.userRepository.updateUserDetails(userId, userDetails);
            if (result.success) {
                return res.status(201).json(result);
            } else {
                return res.status(400).json(result);
            }
        } catch (error) {
            if (error instanceof CustomError) {
                next(error);
            } else {
                throw new CustomError("There's an issue updating the details. We're working on it. Please try again later.", 400, error);
            }
        }
    }

    async logoutUser(req, res, next) {
        try {
            const token = req.headers['authorization'];
            const result = await this.userRepository.logoutFromDevice(req.id, token);
            return res.status(200).json(result);
        } catch (error) {
            if (error instanceof CustomError) {
                next(error);
            } else {
                throw new CustomError("There's an issue logout. We're working on it. Please try again later.", 400, error);
            }
        }
    }

    async clearAllLoginDevices(req, res, next) {
        try {
            const result = await this.userRepository.logoutFromAllDevices(req.id);
            return res.status(200).json(result);
        } catch (error) {
            if (error instanceof CustomError) {
                next(error);
            } else {
                throw new CustomError("There's an issue logout from all devices. We're working on it. Please try again later.", 400, error);
            }
        }
    }

}