import { container } from "tsyringe";

// User Repository
import { IUserRepository } from "../../modules/User/repositories/IUserRepository";
import { UserRepositoryInMemory } from "../../modules/User/repositories/in-memory/UserRepositoryInMemory";

container.registerSingleton<IUserRepository>(
    "UserRepository",
    UserRepositoryInMemory
);