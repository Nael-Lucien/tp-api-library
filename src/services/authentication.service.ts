import {User} from "../models/user.model";
import * as jwt from "jsonwebtoken"

export class AuthenticationService{
    public async authenticate(username: string, password: string): Promise<string>{
        const user = await User.findOne({ where: {username, password}, raw: true})

        if(!user){
            let error: Error = new Error("Invalid username or password");
            (error as any).status = 400;
            throw error;
        }

        const token = jwt.sign(
            {username: user.username},
            "your_secret_key",
            { expiresIn: '1h' });
        return token;
    }
}

export const authenticationService = new AuthenticationService();
