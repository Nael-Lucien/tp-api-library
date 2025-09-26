import * as express from "express"
import * as jwt from "jsonwebtoken"

let adminRights = ["read", "write", "update", "delete"];
let managerRights = ["read", "write", "update"];
let userRights = ["read"];

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
                        console.log(decoded.username);
                        console.log(scopes);
                        if(decoded.username !== scopes) {
                            return reject(new Error("Permssion forbidden"));
                        }
                        resolve(decoded);
                    }
                );
            }
        });
    } else {
        throw new Error("Only support JWT authentication")
    }
}