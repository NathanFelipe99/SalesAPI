import { Router } from "express";

import { CreateUserController } from "../../modules/User/services/createUser/CreateUserController";
import { ListAllUsersController } from "../../modules/User/services/listAllUsers/ListAllUsersController";
import { ListUserByIdController } from "../../modules/User/services/listUserById/ListUserByIdController";
import { UpdateUserController } from "../../modules/User/services/updateUser/UpdateUserController";
import { DeleteUserController } from "../../modules/User/services/deleteUser/DeleteUserController";

const usuariosRoutes = Router();

const wCreateUserController = new CreateUserController();
const wListAllUsersController = new ListAllUsersController();
const wListUserByIdController = new ListUserByIdController();
const wUpdateUserController = new UpdateUserController();
const wDeleteUserController = new DeleteUserController();

usuariosRoutes.post('/', wCreateUserController.handle);
usuariosRoutes.get('/listar', wListAllUsersController.handle);
usuariosRoutes.get('/listar/:id', wListUserByIdController.handle);
usuariosRoutes.put('/:id', wUpdateUserController.handle);
usuariosRoutes.delete('/:id', wDeleteUserController.handle);

export { usuariosRoutes };