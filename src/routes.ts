import { Router } from 'express';
import { createUserController } from './useCases/User/CreateUser';
import { readUserController } from './useCases/User/ReadUser';
import { updateUserController } from './useCases/User/UpdateUser';
import { readUserByHashController } from './useCases/User/ReadUserByHash';
import { loginUserController } from './useCases/User/LoginUser';
import { deleteUserController } from './useCases/User/DeleteUser';
import { forgotPasswordUserController } from './useCases/User/ForgotPasswordUser';
import { resetPasswordUserController } from './useCases/User/ResetPasswordUser';
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

routes.post('/user/login', (request, response) => {
    return loginUserController.handle(request, response);
});

routes.post('/user/forgot', (request, response) => {
    return forgotPasswordUserController.handle(request, response);
});

routes.post('/auth/user/resetpassword/:token', (request, response) => {
    return resetPasswordUserController.handle(request, response);
});


export { routes };