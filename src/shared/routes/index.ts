import { Router } from "express";

import { usuariosRoutes } from "./usuario.routes";

const routes = Router();

routes.use('/usuarios', usuariosRoutes);

export { routes };