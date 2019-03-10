import { IServerRoute } from "../../../util/server";
import * as Controller from "./controller";
import { allowSingleUploadMemory, validateUserAuthen } from "./validator";

let routes: IServerRoute[] = [
    {
        method: 'GET',
        url: '/:_id',
        validators: [validateUserAuthen],
        controller: Controller.getAuthenticated,
    },
    {
        method: 'POST',
        url: '/register',
        validators: [],
        controller: Controller.register,
    },
    {
        method: 'POST',
        url: '/login',
        validators: [],
        controller: Controller.login,
    },
    {
        method: 'PUT',
        url: '/update/:_id',
        validators: [validateUserAuthen],
        controller: Controller.updateAuthenticated,
    },
    {
        method: 'PUT',
        url: '/password/:_id',
        validators: [validateUserAuthen],
        controller: Controller.updatePassword,
    },
    {
        method: 'PUT',
        url: '/avatar/:_id',
        validators: [
            validateUserAuthen,
            allowSingleUploadMemory('fileUpload')
        ],
        controller: Controller.updateAvatarAuthenticated,
    },
    {
        method: 'DELETE',
        url: '/delete/:_id',
        validators: [validateUserAuthen],
        controller: Controller.deleteAuthenticated,
    }
];

export default routes;