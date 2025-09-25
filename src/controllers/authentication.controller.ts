import { Controller, Route, Post, Body } from "tsoa";
import { authenticationService } from "../services/authentication.service";
import { AuthenticationDTO } from "../dto/authentication.dto";

@Route("auth")
export class AuthenticationController extends Controller {

    @Post("/")
    public async authenticate(@Body() requestBody: AuthenticationDTO) {
        const { grant_type, username, password } = requestBody;

        if(grant_type !== "password") {
            let error: Error = new Error("Unsupported grant_type");
            (error as any).status = 400;
            throw error;
        }

        const token = await authenticationService.authenticate(username, password);

        return { token };
    }
}