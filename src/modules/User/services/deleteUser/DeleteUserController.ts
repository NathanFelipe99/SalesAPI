import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteUserService } from "./DeleteUserService";

class DeleteUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;
            
            const wDeleteUserService = container.resolve(
                DeleteUserService
            );

            await wDeleteUserService.execute(id);

            return response.status(204).json({
                message: 'Usuário deletado com sucesso!'
            });
        } catch (e: any) {
            return response.status(400).json({ error: e.message });
        }
    }
}

export { DeleteUserController };