import * as userBusiness from './business';
import { Request } from 'express';
import { IUserAuthentication } from './.bin/interface/IUserAuthentication';

interface ISandraCoreRequest extends Request {
    isAuthenticated: boolean,
    userAuthen: IUserAuthentication,
}

export async function getAuthenticated(req: ISandraCoreRequest) {
    return await userBusiness.getById(req.userAuthen._id);
}

export async function register(req: ISandraCoreRequest) {
    return await userBusiness.register(req.body);
}

export async function login(req: ISandraCoreRequest) {
    let userAuthen = await userBusiness.login(req.body.email, req.body.password);
    if (!userAuthen) {
        throw new Error('Login failed! Account cannot be found.');
    }
    return userAuthen;
}

export async function updateAuthenticated(req: ISandraCoreRequest) {
    return await userBusiness.updateById(req.userAuthen._id, req.body);
}

export async function updatePassword(req: ISandraCoreRequest) {
    return await userBusiness.updatePassword(req.userAuthen._id, req.body.password);
}

export async function updateAvatarAuthenticated(req: ISandraCoreRequest) {
    if (!req.file || !req.file.buffer || !req.file.mimetype) {
        throw new Error(`Request must attach with file!`);
    }
    return await userBusiness.updateAvatar(req.userAuthen._id, req.file.buffer, req.file.mimetype);
}

export async function deleteAuthenticated(req: ISandraCoreRequest) {
    let _id = req.userAuthen._id;
    let user = await userBusiness.getById(_id);
    if (!user) {
        return false;
    }
    return await userBusiness.deleteById(_id);
}