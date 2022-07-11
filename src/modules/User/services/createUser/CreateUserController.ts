import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserService } from "./CreateUserService";

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { caUsuario, anSenha, anEmail, caCPF, anTelefone } = request.body;

            const wCreateUserService = container.resolve(
                CreateUserService
            );

            const wUser = await wCreateUserService.execute({
                caUsuario,
                anSenha,
                anEmail,
                caCPF,
                anTelefone
            });

            return response.status(201).json(wUser);
        } catch (e: any) {
            return response.status(400).json({
                error: e.message
            });
        }
    }
}

export { CreateUserController };