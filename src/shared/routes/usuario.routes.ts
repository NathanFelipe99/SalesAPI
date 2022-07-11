import { Router } from "express";

import { CreateUserController } from "../../modules/User/services/createUser/CreateUserController";
import { ListAllUsersController } from "../../modules/User/services/listAllUsers/ListAllUsersController";
import { ListUserByIdController } from "../../modules/User/services/listUserById/ListUserByIdController";

const usuariosRoutes = Router();

const createUserController = new CreateUserController();
const listAllUsersController = new ListAllUsersController();
const listUserByIdController = new ListUserByIdController();

usuariosRoutes.post('/', createUserController.handle);
usuariosRoutes.get('/listar', listAllUsersController.handle);
usuariosRoutes.get('/listar/:id', listUserByIdController.handle);

export { usuariosRoutes };