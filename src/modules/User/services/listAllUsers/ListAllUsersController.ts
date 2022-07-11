import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllUsersService } from "./ListAllUsersService";

class ListAllUsersController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            
            const wListAllUsersService = container.resolve(
                ListAllUsersService
            );

            const wUsers = await wListAllUsersService.execute();

            return response.status(200).json(wUsers);
            
        } catch (e: any) {
            return response.status(400).json({
                message: e.message
            });
        }
    }
}

export { ListAllUsersController };