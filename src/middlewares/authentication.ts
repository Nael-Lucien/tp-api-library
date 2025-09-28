import * as express from "express"
import * as jwt from "jsonwebtoken"
import { permission } from "../config/permission"

const managerRights = permission.manager;
const userRights = permission.user;


export function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]): Promise<any> {
    if (securityName === "jwt") {
        const token = request.headers["authorization"];

        return new Promise((resolve, reject) => {
            if (!token) {
                reject(new Error("No token provided"));
            } else {
                jwt.verify(token, "your_secret_key",
                    function (error, decoded: any) {
                        if(decoded.username === "admin") resolve(decoded);
                        else if(decoded.username === "manager"){
                            for (let permissionKey in permission.manager) {
                                for(let type in permission.manager[permissionKey as keyof typeof permission.manager]){
                                    if(scopes?.includes(type)){

                                    }
                                }
                                console.log(permission.manager[permissionKey as keyof typeof permission.manager])
                            }

                        }

                        else if(decoded.username === "user") {
                            if(scopes?.includes("update") || scopes?.includes("delete"))
                                return reject(new Error("Permssion forbidden"));
                        }
                    }
                );
            }
        });
    } else {
        throw new Error("Only support JWT authentication")
    }
}