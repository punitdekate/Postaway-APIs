import jwt from 'jsonwebtoken'
import UserRepository from '../features/users/user.repository.js';
const userRepository = new UserRepository();
const auth = async(req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send({ "success": false, "message": "missing token!" });
    }
    try {
        //Before verify check is the token present in user Tokens;
        const payload = jwt.verify(token, "hq7PRRLuxnarLQS2sQ0aDKDITaSlPV5e");
        const { id, name, email } = payload;
        req.id = id;
        req.name = name;
        req.email = email;

        let tokenPresent = await userRepository.isTokenPresent(token, id);
        if (!tokenPresent) {
            return res.status(401).send({ "success": false, "message": "unauthorize!" });
        }
    } catch (error) {
        return res.status(401).send({ "success": false, "message": "unauthorize!" });
    }
    next();

}

export default auth;