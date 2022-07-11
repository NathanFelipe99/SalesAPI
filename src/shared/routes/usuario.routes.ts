import { Router } from "express";

import { CreateUserController } from "../../modules/User/services/createUser/CreateUserController";

const usuariosRoutes = Router();

const createUserController = new CreateUserController();

usuariosRoutes.post('/', createUserController.handle);

export { usuariosRoutes };