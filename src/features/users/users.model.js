import jwt from 'jsonwebtoken';
import CustomError from '../../middlewares/custom-error.middleware.js';


const users = [{
        "id": 1,
        "name": "punit",
        "email": "punitdekate.1999@gmail.com",
        "password": "punitdekate"
    },
    {
        "id": 2,
        "name": "rupesh",
        "email": "rupeshrambhad@gmail.com",
        "password": "punitdekate"
    },
    {
        "id": 3,
        "name": "jayesh",
        "email": "jayeshchavhan@gmail.com",
        "password": "punitdekate"
    }
];
export default class UserModel {
    constructor(name, email, password) {
        this.id = users.length + 1;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static login(email, password) {
        try {
            const userFound = users.find(user => user.email == email && user.password == password);
            if (userFound) {
                return { "success": true, "message": "User Validated", "user": userFound };
            } else {
                return { "success": false, "message": "Invalid Credentials" };
            }
        } catch (err) {
            throw new CustomError("There is some issue in login we are looking into it please try later!", 400);
        }
    }
    static register(name, email, password) {
        try {
            const userFound = users.find(user => user.email == email);
            if (userFound) {
                return { "success": false, "message": "User with email already present!" }
            }
            const newUser = new UserModel(name, email, password);
            users.push(newUser);
            return { "success": true, "message": "User registered successfully!" }
        } catch (error) {
            throw new CustomError("There is some issue in registration we are looking into it please try later!", 400)
        }
    }

    static getUsers() {
        try {
            return users;
        } catch (error) {
            throw new CustomError("There is some issue in retrieving users", 400);
        }
    }
}