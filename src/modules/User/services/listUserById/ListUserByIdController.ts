import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUserByIdService } from "./ListUserByIdService";

class ListUserByIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;

            const wListUserByIdService = container.resolve(
                ListUserByIdService
            );

            const wUser = await wListUserByIdService.execute(id);

            return response.status(200).json(wUser);

        } catch (e: any) {
            return response.status(400).json({
                error: e.message
            });
        }
    }   
}

export { ListUserByIdController };