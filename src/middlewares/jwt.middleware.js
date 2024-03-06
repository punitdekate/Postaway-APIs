import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send({ "success": false, "message": "missing token!" });
    }
    try {
        const payload = jwt.verify(token, "hq7PRRLuxnarLQS2sQ0aDKDITaSlPV5e");
        const { id, name, email } = payload;
        req.id = id;
        req.name = name;
        req.email = email;
    } catch (error) {
        return res.status(401).send({ "success": false, "message": "unauthorize!" });
    }
    next();

}

export default auth;