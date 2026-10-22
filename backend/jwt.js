import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET = process.env.JWT_SECRET;
export default class JWTService{
    static SECRET = SECRET;
    static EXPIRATION = '2h';


generateJWT(searchUser){
    return jwt.sign({ id: searchUser._id, mail: searchUser.mail, rol: searchUser.rol, name:searchUser.name, firstTime:searchUser.firstTime },JWTService.SECRET,{expiresIn: JWTService.EXPIRATION});
}
decodeJWT(token){
    return jwt.verify(token,JWTService.SECRET);
}}