import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserService } from "./UpdateUserService";

class UpdateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            
            const { id } = request.params;
            const { caUsuario, anEmail, caCPF, anTelefone } = request.body;

            const wUpdateUserService = container.resolve(
                UpdateUserService
            );

            const wUser = await wUpdateUserService.execute(id, {
                caUsuario,
                anEmail,
                caCPF,
                anTelefone
            });

            return response.status(200).json(wUser);
        } catch (e: any) {
            return response.status(400).json({
                error: e.message
            });
        }
    }
}

export { UpdateUserController };