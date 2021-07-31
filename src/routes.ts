import { Router } from 'express';
import { createUserController } from './useCases/User/CreateUser';
import { readUserController } from './useCases/User/ReadUser';
import { updateUserController } from './useCases/User/UpdateUser';
import { readUserByHashController } from './useCases/User/ReadUserByHash';
import { deleteUserController } from './useCases/User/DeleteUser';
import { loginUserController } from './useCases/User/LoginUser';
const routes = Router();

// routes.post('/v1/car', (request, response) => {
//     return createMovieController.handle(request, response);
// });

// User ----------

routes.post('/user', (request, response) => {
    return createUserController.handle(request, response);
});

routes.get('/v1/user', (request, response) => {
    return readUserController.handle(request, response);
});

routes.get('/v1/user/:hash', (request, response) => {
    return readUserByHashController.handle(request, response);
});

routes.patch('/v1/user/:hash', (request, response) => {
    return updateUserController.handle(request, response);
});

routes.delete('/v1/user/:hash', (request, response) => {
    return deleteUserController.handle(request, response);
});

routes.post('/v1/user/login', (request, response) => {
    return loginUserController.handle(request, response);
});

export { routes };