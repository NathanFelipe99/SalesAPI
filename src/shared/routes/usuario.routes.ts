import { Router } from "express";

import { CreateUserController } from "../../modules/User/services/createUser/CreateUserController";
import { ListAllUsersController } from "../../modules/User/services/listAllUsers/ListAllUsersController";

const usuariosRoutes = Router();

const createUserController = new CreateUserController();
const listAllUsersController = new ListAllUsersController();

usuariosRoutes.post('/', createUserController.handle);
usuariosRoutes.get('/listar', listAllUsersController.handle);

export { usuariosRoutes };