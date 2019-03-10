import * as path from 'path';
import schema from './schema';

import { UserUpdate } from './.bin/UserUpdate';
import { IUserCreate } from './.bin/interface/IUserCreate';
import { IUserUpdate } from './.bin/interface/IUserUpdate';
import { SimpleCache } from './.bin/SimeCache';
import { UserRegister } from './.bin/UserRegister';
import { UserAuthentication } from './.bin/UserAuthentication';
import { GoogleStorage, IStorageConfig } from '../../../util/storage';
import { MongoDb, IDbConfig, MongooseFunction } from '../../../util/mongodb';

let dbconfig: IDbConfig = {
    username: "",
    password: "",
    hostname: "",
    dbname: "",
    modelname: "user",
    schema,
};
let gsConfig: IStorageConfig = {
    serviceAccountPath: path.join(__dirname, 'ServiceAccount.json'),
    directory: 'avatar',
};
let userDb = MongoDb.connect(dbconfig);
let userCache = new SimpleCache();
let avatarStorage = new GoogleStorage(gsConfig)

export async function getById(_id: string) {
    let user = userCache.get(_id);
    if (!user) {
        user = await userDb.get(_id);
        if (user && user._id)
            userCache.cache(user)
    }
    return user;
}

export async function findByToken(accessToken: string) {
    let params = {
        query: {
            accessToken
        }
    };
    let user = await userDb.findOne(params);
    if (!user)
        throw new Error('User does not exist!');
    return UserAuthentication.from(user);
}

export async function login(email: string, password: string) {
    let params = {
        query: {
            email,
            password
        }
    }
    let user = await userDb.findOne(params);
    if (!user)
        return null;
    userCache.cache(user);
    return UserAuthentication.from(user);
}

export async function register(data: IUserCreate) {
    let userRegister = UserRegister.from(data);
    return await userDb.create(userRegister);
}

export async function updateById(_id: string, data: IUserUpdate) {
    let result = await userDb.update(_id, UserUpdate.from(data));
    if (result)
        userCache.cache(await userDb.get(_id));
    return result;
}

export async function updatePassword(_id: string, password: string) {
    let params: any = {
        query: {
            password,
            _id: MongooseFunction.toObjectId(_id),
        }
    };
    let user = await userDb.findOne(params);
    if (!user)
        return false;
    let result = await userDb.update(_id, { password });
    if (result)
        userCache.cache(await userDb.get(_id));
    return result;
}

export async function updateAvatar(_id: string, buffer: Buffer, mimetype: string = 'image/png') {
    let user = await getById(_id);
    if (!user)
        throw new Error(`User with ${_id} does not exist!`);
    let fileName = `${user.firstName.toLowerCase()}-${user.lastName.toLowerCase()}-avatar.${mimetype.split('/')[1]}`;
    let url = await avatarStorage.uploadBuffer(fileName, buffer, true, 'no-cache, no-store, max-age=0', user.email, mimetype);
    if (!url)
        throw new Error(`Cannot upload image at the moment. Please try again shortly.`);
    url = await avatarStorage.getDownloadUrl(fileName, user.email);
    if (!url)
        throw new Error(`Cannot get download url of avatar. Please try again shortly.`);
    await updateById(_id, { avatar: url });
    return url;
}

export async function deleteById(_id: string) {
    userCache.expire(_id);
    return await userDb.delete(_id);
}