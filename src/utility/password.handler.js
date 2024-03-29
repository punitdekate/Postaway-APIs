import bcrypt from 'bcrypt';

export async function hashPassword(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
}

export async function comparePassword(password, encryptedPassword) {
    try {
        return await bcrypt.compare(password, encryptedPassword);
    } catch (error) {
        console.log(error);
    }
}