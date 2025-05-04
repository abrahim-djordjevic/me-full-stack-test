import dotenv from "dotenv";
import jwt from "jsonwebtoken";

export default class authUtils {
    private token: string;

    public constructor()
    {
        dotenv.config();
        this.token = "";
    }

    public generateAccessToken(username: string) {
        this.token = jwt.sign({name: username}, process.env.SECRET_TOKEN ?? "", { expiresIn:'1h'});
        return this.token;
    }

    public validateToken(token: string) {
        return this.token === token;
    }
}