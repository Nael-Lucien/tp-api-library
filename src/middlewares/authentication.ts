import * as express from "express"
import * as jwt from "jsonwebtoken"
import { permission } from "../config/permission"

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
                        let state = false;

                        if(decoded.username === "admin"){
                            state = true;
                            resolve(decoded);
                        }

                        if(decoded.username === "manager"){
                            for (let route in permission.manager) {
                                for(let type of permission.manager[route as keyof typeof permission.manager]){
                                    if(scopes){
                                        if(scopes[0] === route){
                                            if(scopes.includes(type)){
                                                state = true;
                                                resolve(decoded);
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if(decoded.username === "user"){
                            for (let route in permission.user) {
                                for(let type of permission.user[route as keyof typeof permission.user]){
                                    if(scopes){
                                        if(scopes[0] === route){
                                            if(scopes.includes(type)){
                                                state = true;
                                                resolve(decoded);
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if(!state) return reject(new Error("Permssion forbidden"));
                    }
                );
            }
        });
    } else {
        throw new Error("Only support JWT authentication")
    }
}